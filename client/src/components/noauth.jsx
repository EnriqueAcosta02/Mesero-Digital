// NoAuth.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoAuth = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); // Redirige al inicio de sesión
    };

    return (
        <div>
            <h1>No estás autenticado</h1>
            <p>Por favor, inicia sesión para acceder a esta página.</p>
            <button onClick={goToLogin}>Iniciar sesión</button>
        </div>
    );
};

export default NoAuth;
