import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

// Configuración de la conexión con la base de datos usando MONGODB_URI desde .env
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos');
        createAdminUser(); // Llamada a la función para crear el usuario administrador
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    });

async function createAdminUser() {
    try {
        const existingAdmin = await User.findOne({ username: 'admin' });

        if (existingAdmin) {
            console.log('El usuario administrador ya existe.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('adminpassword', 10);

        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Usuario administrador creado exitosamente');
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        mongoose.connection.close(); // Cierra la conexión después de completar
    }
}
