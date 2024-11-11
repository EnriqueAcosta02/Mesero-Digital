import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Header = ({ user, toggleMenu, menuVisible, handleLogout, cart, goToCart, toggleProfileModal, toggleNosotrosModal, toggleHorarioModal, toggleUbicacionModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const goToCategory = (category) => {
        navigate(`/productos/${category}`);
    };

    return (
        <header className="header">
            {/* Contenedor principal de la parte superior: Logo, Menú, Usuario, Carrito */}
            <div className="top-header">
                <div className="logo-and-menu">
                    <div className="logoheader">
                        <img src="/logo.png" alt="Logo" className="logoheader-img" />
                    </div>
                    <div className="menu">
                        <button onClick={toggleDropdown} className="menu-btn">
                            ☰
                        </button>
                        {isMenuOpen && (
                            <div className="dropdown-menuheader">
                                <ul>
                                    <li><button><a href="/catalogo">Productos</a></button></li>
                                    <li><button onClick={toggleNosotrosModal}>Nosotros</button></li>
                                    <li><button onClick={toggleHorarioModal}>Horario</button></li>
                                    <li><button onClick={toggleUbicacionModal}>Ubicacion</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="user-and-cart">
                    {user ? (
                        <div className="user-info">
                            <button onClick={toggleProfileModal} className="profile-btn">
                                👤 {user.username}
                            </button>
                            {menuVisible && (
                                <div className="user-menu">
                                    <ul>
                                        <li onClick={toggleProfileModal}>Perfil</li>
                                        <li onClick={handleLogout}>Cerrar Sesión</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <span>No estás autenticado</span>
                    )}
                    <div className="cart-info">
                        <button onClick={goToCart} className="cart-btn">
                            🛒
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Secciones de categorías debajo del contenedor principal */}
            <div className="category-sections">
                <div className="category-section category-hamburgers" onClick={() => goToCategory('hamburguesas')}>
                    Hamburguesas
                </div>
                <div className="category-section category-pizzas" onClick={() => goToCategory('pizzas')}>
                    Pizzas
                </div>
                <div className="category-section category-lomitos" onClick={() => goToCategory('lomitos')}>
                    Lomitos
                </div>
                <div className="category-section category-bebidas" onClick={() => goToCategory('bebidas')}>
                    Bebidas
                </div>
            </div>
        </header>
    );
};

export default Header;
