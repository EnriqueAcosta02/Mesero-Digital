import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Profile from './Profile';  
import NosotrosModal from './Nosotros';  
import HorarioAtencion from './HorarioAtencion';  
import UbicacionModal from './UbicacionModal';  
import Header from './Header';  
import '../App.css'; 

const Productos = () => {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [user, setUser] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false); 
    const [profileVisible, setProfileVisible] = useState(false); 
    const [isNosotrosModalOpen, setIsNosotrosModalOpen] = useState(false); 
    const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false); 
    const [isUbicacionModalOpen, setIsUbicacionModalOpen] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
    const [quantity, setQuantity] = useState(1); // Contador para la cantidad de productos
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
        setCart([...cart, { ...producto, quantity }]);
        setQuantity(1); // Reset quantity after adding
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
        setMenuVisible(!menuVisible); 
    };

    const toggleProfileModal = () => {
        setProfileVisible(!profileVisible); 
    };

    const toggleNosotrosModal = () => {
        setIsNosotrosModalOpen(!isNosotrosModalOpen);
    };

    const toggleHorarioModal = () => {
        setIsHorarioModalOpen(!isHorarioModalOpen);
    };

    const toggleUbicacionModal = () => {
        setIsUbicacionModalOpen(!isUbicacionModalOpen);
    };

    const handleProductClick = (producto) => {
        setSelectedProduct(producto);
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, e.target.value); // Evitar que la cantidad sea menor que 1
        setQuantity(value);
    };

    return (
        <div>
            <Header 
                user={user} 
                toggleMenu={toggleMenu} 
                menuVisible={menuVisible} 
                handleLogout={handleLogout} 
                cart={cart} 
                goToCart={goToCart} 
                toggleProfileModal={toggleProfileModal}
                toggleNosotrosModal={toggleNosotrosModal} 
                toggleHorarioModal={toggleHorarioModal} 
                toggleUbicacionModal={toggleUbicacionModal} 
            />

            <h1>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h1>

            <section className="catalog-container">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto._id} className="product-card" onClick={() => handleProductClick(producto)}>
                            <img
                                src={producto.imagenUrl && !producto.imagenUrl.startsWith('http') 
                                    ? `http://localhost:9999${producto.imagenUrl}` 
                                    : producto.imagenUrl || '/path/to/default-image.jpg'}
                                alt={producto.nombre}
                                className="product-image"
                            />
                            <h3 className="modaltitulo">{producto.nombre}</h3>
                            <p className="product-price">Gs {producto.precio}</p>
                            {producto.ingredientes && (
                                <>
                                    <h4 className="modaltitulo">Ingredientes:</h4>
                                    <ul>
                                        {producto.ingredientes.slice(0, 3).map((ingrediente) => (
                                            <li key={ingrediente._id}>
                                                {ingrediente.nombre} - {ingrediente.cantidad}
                                            </li>
                                        ))}
                                        {producto.ingredientes.length > 3 && <li>Ver más...</li>}
                                    </ul>
                                </>
                            )}
                            
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

            {/* Modal de detalles del producto */}
            {selectedProduct && (
                <div className="new-modal">
                    <div className="new-modal-content">
                        <button onClick={() => setSelectedProduct(null)} className="new-modal-close">X</button>
                        <div className="new-modal-product-card">
                            <img 
                                src={selectedProduct.imagenUrl && !selectedProduct.imagenUrl.startsWith('http') 
                                    ? `http://localhost:9999${selectedProduct.imagenUrl}` 
                                    : selectedProduct.imagenUrl || '/path/to/default-image.jpg'} 
                                alt={selectedProduct.nombre} 
                                className="new-modal-product-image" 
                            />
                            <h3 className="modaltitulo">{selectedProduct.nombre}</h3>
                            <p className="new-modal-price">Gs {selectedProduct.precio}</p>
                            
                            <ul>
                            {selectedProduct.ingredientes && (
    <>
        <h4 className="modaltitulo">Ingredientes:</h4>
        <ul>
            {selectedProduct.ingredientes.map((ingrediente) => (
                <li key={ingrediente._id}>
                    {ingrediente.nombre} - {ingrediente.cantidad}
                </li>
            ))}
        </ul>
    </>
)}
                            </ul>

                            {/* Contador de cantidad de productos */}
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={handleQuantityChange} 
                                    min="1" 
                                    className="quantity-input" 
                                />
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>

                            <button onClick={() => handleAddToCart(selectedProduct)} className="new-modal-cart-button">
                                Agregar al carrito 🛒
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productos;
