import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../App.css'; // Importar el archivo CSS

const AddProductForm = () => {
    const [product, setProduct] = useState({
        nombre: '',
        precio: '',
        ingredientes: [{ nombre: '', cantidad: '' }],
        tamano: '', // Solo para pizzas
        foto: null, // Para almacenar la imagen
    });
    const [category, setCategory] = useState('hamburguesas');
    const navigate = useNavigate(); // Inicializar navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setProduct({
            nombre: '',
            precio: '',
            ingredientes: [{ nombre: '', cantidad: '' }],
            tamano: '',
            foto: null, // Resetear foto al cambiar la categoría
        });
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...product.ingredientes];
        updatedIngredients[index][field] = value;
        setProduct({ ...product, ingredientes: updatedIngredients });
    };

    const addIngredient = () => {
        setProduct({
            ...product,
            ingredientes: [...product.ingredientes, { nombre: '', cantidad: '' }],
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, foto: file });
        }
    };

    // Función para enviar el producto al backend para agregar
    const submitProduct = async () => {
        const url = `http://localhost:9999/productos/${category}`;

        const formData = new FormData();
        formData.append('nombre', product.nombre);
        formData.append('precio', product.precio);
        formData.append('ingredientes', JSON.stringify(product.ingredientes));
        // Solo agrega `tamano` si la categoría es pizzas
    if (category === 'pizzas' && product.tamano) {
        formData.append('tamano', product.tamano);
    }

        if (product.foto) formData.append('foto', product.foto);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            const data = await response.json();
            console.log('Producto agregado con éxito:', data);

            // Resetear el formulario después de agregar
            setProduct({
                nombre: '',
                precio: '',
                ingredientes: [{ nombre: '', cantidad: '' }],
                tamano: '',
                foto: null,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitProduct();
    };

    // Función para volver al catálogo
    const goBackToCatalog = () => {
        navigate('/catalogo'); // Redirige a la ruta /productos
    };

    return (
        <div className="form-card">
            <form onSubmit={handleSubmit} className="form-container">
                <label className="label">
                    Categoría:
                    <select value={category} onChange={handleCategoryChange} className="input">
                        <option value="hamburguesas">Hamburguesa</option>
                        <option value="lomitos">Lomito</option>
                        <option value="pizzas">Pizza</option>
                        <option value="bebidas">Bebida</option>
                    </select>
                </label>

                <label className="label">
                    Nombre del Producto:
                    <input 
                        type="text" 
                        name="nombre" 
                        value={product.nombre} 
                        onChange={handleChange} 
                        required 
                        className="input"
                    />
                </label>

                {category === 'pizzas' && (
                    <label className="label">
                        Tamano:
                        <input 
                            type="text" 
                            name="tamano" 
                            value={product.tamano} 
                            onChange={handleChange} 
                            required 
                            className="input"
                        />
                    </label>
                )}

                <label className="label">
                    Precio:
                    <input 
                        type="number" 
                        name="precio" 
                        value={product.precio} 
                        onChange={handleChange} 
                        required 
                        className="input"
                    />
                </label>

                {(category === 'hamburguesas' || category === 'lomitos' || category === 'pizzas') && (
                    <>
                        <label className="label">Ingredientes:</label>
                        {product.ingredientes.map((ingrediente, index) => (
                            <div key={index} className="ingredient-container">
                                <input
                                    type="text"
                                    placeholder="Nombre del ingrediente"
                                    value={ingrediente.nombre}
                                    onChange={(e) =>
                                        handleIngredientChange(index, 'nombre', e.target.value)
                                    }
                                    required
                                    className="input"
                                />
                                <input
                                    type="text"
                                    placeholder="Cantidad"
                                    value={ingrediente.cantidad}
                                    onChange={(e) =>
                                        handleIngredientChange(index, 'cantidad', e.target.value)
                                    }
                                    required
                                    className="input"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className="add-button">
                            Agregar Ingrediente
                        </button>
                    </>
                )}

                {/* Campo para subir foto */}
                <label className="label">
                    Foto del Producto:
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className="input"
                    />
                </label>

                <button type="submit" className="button">
                    Agregar Producto
                </button>

                {/* Botón para volver al catálogo */}
                <button 
                    type="button" 
                    onClick={goBackToCatalog} 
                    className="button">
                    Volver al Catálogo
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
