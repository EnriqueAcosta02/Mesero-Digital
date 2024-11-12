import Producto from '../models/productmodel.js';
import multer from 'multer';
import path from 'path';

// Configuración de multer para manejar la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');  // Especifica la carpeta donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre único para la imagen
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Validar que el archivo sea una imagen
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
        }
    }
});

// Exportar la configuración de multer para que sea usada en las rutas
export const uploadMiddleware = upload.single('foto'); // 'foto' es el nombre del campo del formulario

// Obtener productos por categoría
export const obtenerProductos = async (req, res) => {
    const categoria = req.params.categoria;

    try {
        let productos;
        // Consultar productos según la categoría
        switch (categoria) {
            case 'hamburguesas':
                productos = await Producto.hamburguesa.find();
                break;
            case 'lomitos':
                productos = await Producto.lomito.find();
                break;
            case 'pizzas':
                productos = await Producto.pizza.find();
                break;
            case 'bebidas':
                productos = await Producto.bebida.find();
                break;
            default:
                return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Si no se encuentran productos
        if (!productos || productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en esta categoría' });
        }

        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    const categoria = req.params.categoria;
    const { nombre, precio, ingredientes, tamano } = req.body;

    let imagenUrl = '';
    if (req.file) {
        imagenUrl = `/images/${req.file.filename}`;  // Aquí se genera la URL de la imagen
    }

    const nuevoProducto = {
        nombre,
        precio,
        ingredientes: JSON.parse(ingredientes),  // Asegúrate de que los ingredientes estén correctamente formateados
        tamano,
        imagenUrl,  // Guarda la URL de la imagen en la base de datos
    };

    try {
        let productoGuardado;
        // Crear producto según la categoría
        switch (categoria) {
            case 'hamburguesas':
                productoGuardado = new Producto.hamburguesa(nuevoProducto);
                break;
            case 'lomitos':
                productoGuardado = new Producto.lomito(nuevoProducto);
                break;
            case 'pizzas':
                productoGuardado = new Producto.pizza(nuevoProducto);
                break;
            case 'bebidas':
                productoGuardado = new Producto.bebida(nuevoProducto);
                break;
            default:
                return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await productoGuardado.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

// Editar un producto existente
export const editarProducto = async (req, res) => {
    const { categoria, id } = req.params;
    const productoActualizado = req.body;

    if (req.file) {
        productoActualizado.imagenUrl = `/images/${req.file.filename}`;  // Si se sube una nueva imagen, se actualiza la URL
    }

    try {
        let productoModificado;
        // Editar producto según la categoría
        switch (categoria) {
            case 'hamburguesas':
                productoModificado = await Producto.hamburguesa.findByIdAndUpdate(id, productoActualizado, { new: true });
                break;
            case 'lomitos':
                productoModificado = await Producto.lomito.findByIdAndUpdate(id, productoActualizado, { new: true });
                break;
            case 'pizzas':
                productoModificado = await Producto.pizza.findByIdAndUpdate(id, productoActualizado, { new: true });
                break;
            case 'bebidas':
                productoModificado = await Producto.bebida.findByIdAndUpdate(id, productoActualizado, { new: true });
                break;
            default:
                return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        if (!productoModificado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(productoModificado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar el producto' });
    }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
    const { categoria, id } = req.params;

    try {
        let productoEliminado;
        // Eliminar producto según la categoría
        switch (categoria) {
            case 'hamburguesas':
                productoEliminado = await Producto.hamburguesa.findByIdAndDelete(id);
                break;
            case 'lomitos':
                productoEliminado = await Producto.lomito.findByIdAndDelete(id);
                break;
            case 'pizzas':
                productoEliminado = await Producto.pizza.findByIdAndDelete(id);
                break;
            case 'bebidas':
                productoEliminado = await Producto.bebida.findByIdAndDelete(id);
                break;
            default:
                return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        if (!productoEliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};
