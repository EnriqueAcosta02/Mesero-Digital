import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Asegúrate de importar el CSS

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="home-card-container">
            <div className="home-card">
                <img src="logo.png" alt="Logo Mesero Digital" className="home-card-logo" />
                <h1 className="home-card-title">Mesero Digital</h1>
                <div className="home-card-gif">
                    <img src="/gif.gif" alt="Gif" className="home-card-gif-image" />
                </div>
                <div className="home-card-buttons">
                    <button className="home-card-btn home-card-login-btn" onClick={handleLogin}>Iniciar Sesión</button>
                    <button className="home-card-btn home-card-register-btn" onClick={handleRegister}>Registrarse</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
