import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Importamos el archivo CSS

const Catalogo = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoria) => {
        navigate(`/productos/${categoria}`);
    };

    const handleBackToHome = () => {
        navigate('/'); // Navegar a la página de inicio
    };

    const goToAddProductPage = () => {
        navigate('/add-product'); // Redirige a la página de agregar producto
    };

    const goToEditProductPage = () => {
        navigate('/edit-product'); // Redirige a la página de editar productos
    };

    return (
        <div className="catalogo-container">
            <div className="catalogo-card">
                <h1>Catálogo de Productos</h1>

                {/* Botón para volver a Home */}
                <button onClick={handleBackToHome} className="back-btn">
                    Volver a Inicio
                </button>

                <div className="categorias-grid">
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

                {/* Botones para agregar o editar productos */}
                <div className="button-container">
                    <button onClick={goToAddProductPage} className="add-product-btn">
                        Agregar Producto
                    </button>
                    <button onClick={goToEditProductPage} className="edit-product-btn">
                        Editar Productos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Catalogo;
