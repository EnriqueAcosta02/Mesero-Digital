import jwt from 'jsonwebtoken';

// Middleware para proteger las rutas
const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }

    try {
        const decoded = jwt.verify(token, 'secreto_jwt'); // El secreto para verificar el JWT
        req.user = decoded; // Guardamos la información decodificada en req.user
        next(); // Pasamos al siguiente middleware o ruta
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export default protect; // Aquí estamos exportando correctamente
