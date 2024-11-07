import React, { useState } from 'react';

const AddProductForm = () => {
    const [product, setProduct] = useState({
        nombre: '',
        precio: '',
        ingredientes: [{ nombre: '', cantidad: '' }],
        tamaño: '', // Solo para pizzas
    });
    const [category, setCategory] = useState('hamburguesa');

    // Manejador de cambio para actualizar el estado de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Manejador para cambiar la categoría
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setProduct({
            nombre: '',
            precio: '',
            ingredientes: [{ nombre: '', cantidad: '' }],
            tamaño: '', // Solo para pizzas
        });
    };

    // Manejador para actualizar los ingredientes
    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...product.ingredientes];
        updatedIngredients[index][field] = value;
        setProduct({ ...product, ingredientes: updatedIngredients });
    };

    // Agregar un nuevo ingrediente
    const addIngredient = () => {
        setProduct({
            ...product,
            ingredientes: [...product.ingredientes, { nombre: '', cantidad: '' }],
        });
    };

    // Manejador de envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Producto a agregar en la categoría ${category}:`, product);
        // Aquí enviaremos los datos al backend
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <label style={styles.label}>
                Categoría:
                <select value={category} onChange={handleCategoryChange} style={styles.input}>
                    <option value="hamburguesa">Hamburguesa</option>
                    <option value="lomito">Lomito</option>
                    <option value="pizza">Pizza</option>
                    <option value="bebida">Bebida</option>
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

            {category === 'pizza' && (
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

            {(category === 'hamburguesa' || category === 'lomito' || category === 'pizza') && (
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

            <button type="submit" style={styles.button}>Agregar Producto</button>
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
