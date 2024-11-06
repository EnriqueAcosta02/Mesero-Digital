import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Productos = () => {
    const { categoria } = useParams(); // Obtener la categoría de la URL
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: decodedToken.username });
        }

        // Función para obtener los productos según la categoría
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:9999/productos/${categoria}`); // Solicitar productos de la categoría seleccionada
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error(`Error al obtener productos de la categoría ${categoria}:`, error);
            }
        };

        fetchProductos();
    }, [categoria]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const goBackToCatalogo = () => {
        navigate('/catalogo'); // Volver al catálogo
    };

    return (
        <div>
            <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                {user ? (
                    <div>
                        <span>Bienvenido, {user.username}</span>
                        <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <div>
                        <span>No estás autenticado</span>
                    </div>
                )}
            </div>

            <h1>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h1> {/* Título dinámico */}
            
            <section>
                <h2>Productos de {categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>
                <ul>
                    {productos.map((producto) => (
                        <li key={producto._id}>
                            <h3>{producto.nombre} - ${producto.precio}</h3>
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
                        </li>
                    ))}
                </ul>
            </section>

            {/* Botón para volver al catálogo */}
            <button onClick={goBackToCatalogo} style={styles.backButton}>Volver al Catálogo</button>
        </div>
    );
};

const styles = {
    backButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    }
};

export default Productos;
