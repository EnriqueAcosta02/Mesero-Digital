import React, { useState } from 'react';

const AddProductForm = () => {
    // Estado para manejar los campos del formulario
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: ''
    });

    // Manejador de cambio para actualizar el estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Manejador de envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Producto a agregar:', product);
        // Aquí enviaremos los datos al backend
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre del Producto:
                <input type="text" name="name" value={product.name} onChange={handleChange} required />
            </label>
            <label>
                Precio:
                <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </label>
            <label>
                Descripción:
                <textarea name="description" value={product.description} onChange={handleChange} required />
            </label>
            <label>
                Categoría:
                <input type="text" name="category" value={product.category} onChange={handleChange} required />
            </label>
            <label>
                Stock:
                <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
            </label>
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default AddProductForm;
