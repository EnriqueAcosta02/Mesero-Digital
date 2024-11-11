import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Profile from './Profile';  // Importa el componente Profile
import NosotrosModal from './Nosotros';  // Importa el modal de Nosotros
import HorarioAtencion from './HorarioAtencion';  // Importa el modal de Horario de Atención
import UbicacionModal from './UbicacionModal';  // Importa el modal de Ubicación
import Header from './Header';  // Importa el componente Header
import '../App.css'; // Asegúrate de que la ruta sea correcta

const Productos = () => {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [user, setUser] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar/ocultar el menú
    const [profileVisible, setProfileVisible] = useState(false); // Estado para controlar la visibilidad del perfil
    const [isNosotrosModalOpen, setIsNosotrosModalOpen] = useState(false);  // Estado para controlar la visibilidad del modal "Nosotros"
    const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false);  // Estado para controlar la visibilidad del modal "Horario de Atención"
    const [isUbicacionModalOpen, setIsUbicacionModalOpen] = useState(false); // Estado para controlar la visibilidad del modal "Ubicación"
    const navigate = useNavigate();

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

    const toggleMenu = () => {
        setMenuVisible(!menuVisible); // Alternar visibilidad del menú
    };

    const toggleProfileModal = () => {
        setProfileVisible(!profileVisible); // Alternar la visibilidad del modal de perfil
    };

    // Función para mostrar/ocultar el modal "Nosotros"
    const toggleNosotrosModal = () => {
        setIsNosotrosModalOpen(!isNosotrosModalOpen);
    };

    // Función para mostrar/ocultar el modal "Horario de Atención"
    const toggleHorarioModal = () => {
        setIsHorarioModalOpen(!isHorarioModalOpen);
    };

    // Función para mostrar/ocultar el modal "Ubicación"
    const toggleUbicacionModal = () => {
        setIsUbicacionModalOpen(!isUbicacionModalOpen);
    };

    return (
        <div>
            {/* Integrando el Header en la página de productos */}
            <Header 
                user={user} 
                toggleMenu={toggleMenu} 
                menuVisible={menuVisible} 
                handleLogout={handleLogout} 
                cart={cart} 
                goToCart={goToCart} 
                toggleProfileModal={toggleProfileModal}
                toggleNosotrosModal={toggleNosotrosModal} // Pasamos la función al Header
                toggleHorarioModal={toggleHorarioModal} // Pasamos la función al Header
                toggleUbicacionModal={toggleUbicacionModal} // Pasamos la función al Header
            />

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
                                className="product1-image"
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

            {/* Mostrar el componente Profile solo si profileVisible es true */}
            {profileVisible && <Profile user={user} closeModal={toggleProfileModal} />}

            {/* Mostrar el modal de Nosotros si isNosotrosModalOpen es true */}
            {isNosotrosModalOpen && <NosotrosModal isOpen={isNosotrosModalOpen} closeModal={toggleNosotrosModal} />}

            {/* Mostrar el modal de Horario de Atención si isHorarioModalOpen es true */}
            {isHorarioModalOpen && <HorarioAtencion isOpen={isHorarioModalOpen} closeModal={toggleHorarioModal} />}

            {/* Mostrar el modal de Ubicación si isUbicacionModalOpen es true */}
            {isUbicacionModalOpen && <UbicacionModal isOpen={isUbicacionModalOpen} closeModal={toggleUbicacionModal} />}
        </div>
    );
};

export default Productos;
