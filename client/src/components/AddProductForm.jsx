import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const AddProductForm = () => {
    const [product, setProduct] = useState({
        nombre: '',
        precio: '',
        ingredientes: [{ nombre: '', cantidad: '' }],
        tamaño: '', // Solo para pizzas
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
            tamaño: '',
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
        formData.append('tamaño', product.tamaño);
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
                tamaño: '',
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
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <label style={styles.label}>
                Categoría:
                <select value={category} onChange={handleCategoryChange} style={styles.input}>
                    <option value="hamburguesas">Hamburguesa</option>
                    <option value="lomitos">Lomito</option>
                    <option value="pizzas">Pizza</option>
                    <option value="bebidas">Bebida</option>
                </select>
            </label>

            <label style={styles.label}>
                Nombre del Producto:
                <input 
                    type="text" 
                    name="nombre" 
                    value={product.nombre} 
                    onChange={handleChange} 
                    required 
                    style={styles.input}
                />
            </label>

            {category === 'pizzas' && (
                <label style={styles.label}>
                    Tamaño:
                    <input 
                        type="text" 
                        name="tamaño" 
                        value={product.tamaño} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                </label>
            )}

            <label style={styles.label}>
                Precio:
                <input 
                    type="number" 
                    name="precio" 
                    value={product.precio} 
                    onChange={handleChange} 
                    required 
                    style={styles.input}
                />
            </label>

            {(category === 'hamburguesas' || category === 'lomitos' || category === 'pizzas') && (
                <>
                    <label style={styles.label}>Ingredientes:</label>
                    {product.ingredientes.map((ingrediente, index) => (
                        <div key={index} style={styles.ingredientContainer}>
                            <input
                                type="text"
                                placeholder="Nombre del ingrediente"
                                value={ingrediente.nombre}
                                onChange={(e) =>
                                    handleIngredientChange(index, 'nombre', e.target.value)
                                }
                                required
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Cantidad"
                                value={ingrediente.cantidad}
                                onChange={(e) =>
                                    handleIngredientChange(index, 'cantidad', e.target.value)
                                }
                                required
                                style={styles.input}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} style={styles.addButton}>
                        Agregar Ingrediente
                    </button>
                </>
            )}

            {/* Campo para subir foto */}
            <label style={styles.label}>
                Foto del Producto:
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    style={styles.input}
                />
            </label>

            <button type="submit" style={styles.button}>
                Agregar Producto
            </button>

            {/* Botón para volver al catálogo */}
            <button 
                type="button" 
                onClick={goBackToCatalog} 
                style={styles.button}>
                Volver al Catálogo
            </button>
        </form>
    );
};

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        width: '300px',
        margin: 'auto',
        marginTop: '50px',
        fontFamily: 'Arial, sans-serif'
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#333',
        fontSize: '14px'
    },
    input: {
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        width: '100%',
        fontSize: '14px'
    },
    ingredientContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        width: '100%'
    },
    addButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        fontSize: '14px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        marginTop: '20px'
    }
};

export default AddProductForm;
