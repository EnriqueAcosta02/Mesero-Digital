import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productroutes.js';

const app = express();
const PORT = 9999;
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/productos')
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('No se pudo conectar a la base de datos', err));

// Usa las rutas de productos
app.use('/productos', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
