import express from 'express';
import { obtenerProductos, crearProducto } from '../controllers/productcontroller.js';


const router = express.Router();

// Ruta para obtener productos por tipo
router.get('/:categoria', obtenerProductos);

// Ruta para crear un nuevo producto por tipo
router.post('/:categoria', crearProducto);

export default router;