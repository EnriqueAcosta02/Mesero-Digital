import Producto from '../models/productmodel.js';
// productcontroller.js

export const obtenerProductos = async (req, res) => {
    const categoria = req.params.categoria;

    try {
        let productos;
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

        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const crearProducto = async (req, res) => {
    const categoria = req.params.categoria;
    const nuevoProducto = req.body;

    try {
        let productoGuardado;
        switch (categoria) {
            case 'hamburguesas':
                productoGuardado = new Producto.hamburguesa(nuevoProducto);
                await productoGuardado.save();
                break;
            case 'lomitos':
                productoGuardado = new Producto.lomito(nuevoProducto);
                await productoGuardado.save();
                break;
            case 'pizzas':
                productoGuardado = new Producto.pizza(nuevoProducto);
                await productoGuardado.save();
                break;
            case 'bebidas':
                productoGuardado = new Producto.bebida(nuevoProducto);
                await productoGuardado.save();
                break;
            default:
                return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};