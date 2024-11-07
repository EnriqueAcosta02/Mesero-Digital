import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redirige a la página de login
    };

    const handleRegister = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    

    return (
        <div>
            <h1>Bienvenido a Mesero Digital</h1>
            <p>Elige una opción para continuar:</p>
            <button onClick={handleLogin}>Iniciar Sesión</button>
            <button onClick={handleRegister}>Registrarse</button>
            <br /><br />
            
        </div>
    );
};

export default Home;

