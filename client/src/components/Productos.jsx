import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Productos = () => {
    const { categoria } = useParams(); 
    const [productos, setProductos] = useState([]);
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
        navigate('/catalogo');
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


            <button onClick={() => navigate('/agregar-producto')} style={styles.addButton}>Agregar Nuevo Producto</button>


            <h1>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h1> 
            
            <section style={styles.catalogContainer}>
                {productos.map((producto) => (
                    <div key={producto._id} style={styles.productCard}>
                        <img src={producto.imagenUrl} alt={producto.nombre} style={styles.productImage} />
                        <h3>{producto.nombre}</h3>
                        <p>Precio: ${producto.precio}</p>
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
                    </div>
                ))}
            </section>

            <button onClick={goBackToCatalogo} style={styles.backButton}>Volver al Catálogo</button>
        </div>
    );
};

const styles = {
    catalogContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    productCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
    },
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
