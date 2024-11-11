import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Catalogo = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verifica el rol del usuario desde localStorage
        const userRole = localStorage.getItem('role'); // Obtenemos el rol desde localStorage
        setIsAdmin(userRole === 'admin');
    }, []);

    const handleCategoryClick = (categoria) => {
        navigate(`/productos/${categoria}`);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const goToAddProductPage = () => {
        if (isAdmin) navigate('/add-product');
    };

    const goToEditProductPage = () => {
        if (isAdmin) navigate('/edit-product');
    };
    console.log(localStorage.getItem('role'));
    return (
        <div className="catalogo-container">
            <div className="catalogo-card">
                <h1>Catálogo de Productos</h1>

                <button onClick={handleBackToHome} className="back-btn">
                    Volver a Inicio
                </button>

                <div className="categorias-grid">
                    {/* Muestra las categorías */}
                    <div className="categoria-card1" onClick={() => handleCategoryClick('hamburguesas')}>
                        <h3>Hamburguesas</h3>
                    </div>
                    <div className="categoria-card2" onClick={() => handleCategoryClick('lomitos')}>
                        <h3>Lomitos</h3>
                    </div>
                    <div className="categoria-card3" onClick={() => handleCategoryClick('pizzas')}>
                        <h3>Pizzas</h3>
                    </div>
                    <div className="categoria-card4" onClick={() => handleCategoryClick('bebidas')}>
                        <h3>Bebidas</h3>
                    </div>
                </div>

                {isAdmin && (
                    <div className="button-container">
                        <button onClick={goToAddProductPage} className="add-product-btn">
                            Agregar Producto
                        </button>
                        <button onClick={goToEditProductPage} className="edit-product-btn">
                            Editar Productos
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalogo;
