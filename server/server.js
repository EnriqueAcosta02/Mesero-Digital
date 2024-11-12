import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRoutes from './routes/productroutes.js';
import authRoutes from './routes/auth.js';
import conectarDB from './config/productconfig.js';  // Importar la función para conectar a la base de datos

// Obtener el directorio actual utilizando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9999;  // Usar el puerto configurado en el .env o por defecto el 9999

app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Middleware para parsear JSON

// Conectar a la base de datos
conectarDB().then(() => {
    // Solo si la conexión es exitosa, iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("No se pudo iniciar el servidor debido a un error en la conexión a la base de datos", error);
});
  
// Usar las rutas de autenticación primero para evitar conflictos con otras rutas
app.use('/api', authRoutes);  // Las rutas de autenticación empiezan con /api

// Usar las rutas de productos después de las de autenticación
app.use('/productos', productRoutes);  // Las rutas de productos empiezan con /productos

// Configuración para servir imágenes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Middleware para manejo de errores (opcional, pero útil)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});
