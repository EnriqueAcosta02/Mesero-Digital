import React from 'react';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div style={styles.catalogoContainer}>
            <h1>Catálogo de Productos</h1>

            {/* Botón para volver a Home */}
            <button onClick={handleBackToHome} style={styles.backButton}>
                Volver a Inicio
            </button>

            <div style={styles.categoriasGrid}>
                <div style={styles.categoriaCard} onClick={() => handleCategoryClick('hamburguesas')}>
                    <h3>Hamburguesas</h3>
                </div>
                <div style={styles.categoriaCard} onClick={() => handleCategoryClick('lomitos')}>
                    <h3>Lomitos</h3>
                </div>
                <div style={styles.categoriaCard} onClick={() => handleCategoryClick('pizzas')}>
                    <h3>Pizzas</h3>
                </div>
                <div style={styles.categoriaCard} onClick={() => handleCategoryClick('bebidas')}>
                    <h3>Bebidas</h3>
                </div>
                <div>
                    <button onClick={goToAddProductPage}>Agregar Producto</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    catalogoContainer: {
        textAlign: 'center',
        padding: '20px',
    },
    categoriasGrid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    },
    categoriaCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        width: '150px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
    },
    backButton: {
        backgroundColor: '#4CAF50', // Verde como los botones de inicio de sesión y registro
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px', // Espacio antes de las categorías
    }
};

export default Catalogo;
