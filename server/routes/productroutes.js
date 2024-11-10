import express from 'express';
import { obtenerProductos, crearProducto, editarProducto, eliminarProducto, uploadMiddleware } from '../controllers/productcontroller.js';

const router = express.Router();

// Obtener productos por categoría
router.get('/:categoria', obtenerProductos);

// Crear un nuevo producto
router.post('/:categoria', uploadMiddleware, crearProducto);

// Editar un producto existente
router.put('/:categoria/:id', uploadMiddleware, editarProducto);

// Eliminar un producto
router.delete('/:categoria/:id', eliminarProducto);

export default router;
