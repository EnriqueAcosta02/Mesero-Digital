import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [pedidoExitoso, setPedidoExitoso] = useState(false); // Estado para el mensaje de éxito
    const navigate = useNavigate();
    

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleOrder = () => {
        // Aquí puedes agregar la lógica para hacer el pedido (guardar en la base de datos, etc.)
        setPedidoExitoso(true); // Mostrar el mensaje de éxito
        localStorage.removeItem('cart'); // Limpiar el carrito
        setCart([]); // Vaciar el carrito en la UI
    };

    const goToProductos = () => {
        navigate('/catalogo');
    };

    // Calcular el precio total
    const totalPrecio = cart.reduce((total, producto) => total + producto.precio, 0);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Carrito de Compras</h2>
            <div style={styles.cartContent}>
                {cart.length > 0 ? (
                    cart.map((producto, index) => (
                        <div key={index} style={styles.productCard}>
                            <img
                                src={producto.imagenUrl && !producto.imagenUrl.startsWith('http')
                                    ? `http://localhost:9999${producto.imagenUrl}`
                                    : producto.imagenUrl || '/path/to/default-image.jpg'
                                }
                                alt={producto.nombre}
                                style={styles.productImage}
                            />
                            <div style={styles.productDetails}>
                                <h3 style={styles.productName}>{producto.nombre}</h3>
                                <p style={styles.productPrice}>Gs{producto.precio}</p>
                                {producto.ingredientes && (
                                    <div style={styles.ingredientList}>
                                        <h4>Ingredientes:</h4>
                                        <ul>
                                            {producto.ingredientes.map((ingrediente, i) => (
                                                <li key={i} style={styles.ingredientItem}>
                                                    {ingrediente.nombre} - {ingrediente.cantidad}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => removeFromCart(index)} style={styles.removeButton}>
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={styles.emptyCartMessage}>Tu carrito está vacío.</p>
                )}
            </div>
            <div style={styles.totalContainer}>
                <h3 style={styles.totalPrice}>Total: Gs{totalPrecio}</h3>
            </div>
            <div>
                
                {pedidoExitoso ? (
                    <p style={styles.successMessage}>¡Pedido realizado con éxito!</p>
                ) : (
                    <button onClick={handleOrder} style={styles.orderButton}>
                        Hacer Pedido
                    </button>
                    
                )}
            </div>
            <button onClick={goToProductos} style={styles.backButton}>Volver a Productos</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f4', // Fondo gris claro para darle un toque moderno
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#333',
    },
    cartContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '20px',
    },
    productCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '20px',
    },
    productDetails: {
        flexGrow: 1,
        textAlign: 'left',
    },
    productName: {
        fontSize: '1.2rem',
        fontWeight: '500',
        color: '#444',
    },
    productPrice: {
        fontSize: '1rem',
        color: '#333',
    },
    ingredientList: {
        marginTop: '10px',
    },
    ingredientItem: {
        fontSize: '0.9rem',
        color: '#555',
    },
    removeButton: {
        backgroundColor: '#FF0000',
        color: 'white',
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    emptyCartMessage: {
        fontSize: '1.2rem',
        fontWeight: '300',
        color: '#888',
        textAlign: 'center',
        marginTop: '50px',
    },
    totalContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
    },
    totalPrice: {
        fontSize: '1.2rem',
        color: '#333',
    },
    orderButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '30px',
    },
    successMessage: {
        color: 'green',
        fontSize: '1.2rem',
        fontWeight: '500',
        marginTop: '20px',
    },
    backButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default Carrito;
