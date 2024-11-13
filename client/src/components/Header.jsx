import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faPizzaSlice,faDrumstickBite, faMartiniGlass, faUser, faCartShopping, faBars} from '@fortawesome/free-solid-svg-icons';

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
                            <FontAwesomeIcon icon={faBars} style={{fontSize:"30px"}} />
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
                                <FontAwesomeIcon icon={faUser} style={{fontSize:"24px"}} />{user.username}
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
                            <FontAwesomeIcon icon={faCartShopping} style={{fontSize:"24px"}} />
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Secciones de categorías debajo del contenedor principal */}
            <div className="category-sections">
                <div className="category-section category-hamburgers" onClick={() => goToCategory('hamburguesas')}>
                <FontAwesomeIcon icon={faHamburger} style={{fontSize: '24px' }} />
                    Hamburguesas
                </div>
                <div className="category-section category-pizzas" onClick={() => goToCategory('pizzas')}>
                <FontAwesomeIcon icon={faPizzaSlice} style={{fontSize:'24px'}} />
                    Pizzas
                </div>
                <div className="category-section category-lomitos" onClick={() => goToCategory('lomitos')}>
                    <FontAwesomeIcon icon={faDrumstickBite} style={{fontSize:'24px'}} />
                    Lomitos
                </div>
                <div className="category-section category-bebidas" onClick={() => goToCategory('bebidas')}>
                    <FontAwesomeIcon icon={faMartiniGlass} style={{fontSize:'24px'}} />
                    Bebidas
                </div>
            </div>
        </header>
    );
};

export default Header;
