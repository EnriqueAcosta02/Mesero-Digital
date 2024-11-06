import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productroutes.js';
import authRoutes from './routes/auth.js'; // Importa las rutas de autenticación

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/productos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('No se pudo conectar a la base de datos', err));

// Usar las rutas de productos y autenticación
app.use('/productos', productRoutes);
app.use('/api', authRoutes); // Las rutas de autenticación empiezan con /api

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
