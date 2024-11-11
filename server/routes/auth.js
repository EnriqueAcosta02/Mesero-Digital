import express from 'express';
import bcrypt from 'bcryptjs';  // Para encriptar las contraseñas
import jwt from 'jsonwebtoken'; // Para generar el JWT
import User from '../models/User.js';  // Asegúrate de que el modelo User está bien definido
import protect from '../middleware/authMiddleware.js'; // Importa el middleware

const router = express.Router();
// Ruta protegida (solo accesible si el usuario está autenticado)
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Obtén el usuario usando el ID decodificado en el token
        res.status(200).json(user); // Retorna los datos del usuario (incluyendo email)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
});

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Lógica para validar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Crear un JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username }, // Información a guardar en el token
            'secreto_jwt', // El secreto para firmar el JWT (debería ser más complejo y guardado de forma segura)
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token, // Enviar el token al cliente
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});

// Ruta para obtener todos los usuarios (opcional, para pruebas)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

export default router;
