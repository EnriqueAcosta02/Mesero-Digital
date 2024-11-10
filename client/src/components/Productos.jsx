import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // Asegúrate de que la ruta sea correcta


const Productos = () => {
    const { categoria } = useParams(); 
    const [productos, setProductos] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: decodedToken.username });
        }

        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:9999/productos/${categoria}`);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                const data = await response.json();
                setProductos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(`Error al obtener productos de la categoría ${categoria}:`, error);
            }
        };

        fetchProductos();
    }, [categoria]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (producto) => {
        setCart([...cart, producto]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const goBackToCatalogo = () => {
        navigate('/catalogo');
    };

    const goToCart = () => {
        navigate('/carrito');
    };

    return (
        <div>
            <div className="header">
                {user ? (
                    <div className="user-info">
                        <span>Bienvenido, {user.username}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <span>No estás autenticado</span>
                )}
                <div className="cart-info">
                    🛒 Carrito: {cart.length} artículos
                    <button onClick={goToCart} className="view-cart-btn">
                        Ver carrito
                    </button>
                </div>
            </div>

            <h1>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h1>

            <section className="catalog-container">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto._id} className="product-card">
                            <img
                                src={producto.imagenUrl && !producto.imagenUrl.startsWith('http') 
                                    ? `http://localhost:9999${producto.imagenUrl}` 
                                    : producto.imagenUrl || '/path/to/default-image.jpg'}
                                alt={producto.nombre}
                                className="product-image"
                            />

                            <h3>{producto.nombre}</h3>
                            <p>Precio: Gs{producto.precio}</p>
                            {producto.ingredientes && (
                                <>
                                    <h4>Ingredientes:</h4>
                                    <ul>
                                        {producto.ingredientes.map((ingrediente) => (
                                            <li key={ingrediente._id}>
                                                {ingrediente.nombre} - {ingrediente.cantidad}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <button onClick={() => handleAddToCart(producto)} className="cart-button">
                                Agregar al carrito 🛒
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles en esta categoría.</p>
                )}
            </section>

            <button onClick={goBackToCatalogo} className="back-button">Volver al Catálogo</button>
        </div>
    );
};

export default Productos;
