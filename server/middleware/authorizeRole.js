// middleware/authorizeRole.js
import jwt from 'jsonwebtoken';

const authorizeRole = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

        jwt.verify(token, 'secreto_jwt', (err, decoded) => {
            if (err || decoded.role !== role) {
                return res.status(403).json({ message: 'Acceso denegado: No tienes permisos' });
            }
            req.user = decoded;
            next();
        });
    };
};

export default authorizeRole;
