import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Importamos el archivo CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        // Hacer la solicitud de inicio de sesión al backend
        try {
            const response = await fetch('http://localhost:9999/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token);
                console.log('Inicio de sesión exitoso');
                navigate('/catalogo');  // Redirigir a la página de catálogo
            } else {
                console.log('Error al iniciar sesión:', data.message);
                alert('Credenciales inválidas. Intenta nuevamente.');
            }
        } catch (error) {
            console.log('Error de red:', error);
            alert('Hubo un error al conectar con el servidor. Intenta más tarde.');
        }
    };

    const goToRegister = () => {
        navigate('/register');  // Redirigir a la ruta de registro
    };

    const goToHome = () => {
        navigate('/');  // Redirigir a la página de inicio
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Introduce tu correo electrónico"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Introduce tu contraseña"
                        />
                    </div>
                    <button type="submit" className="login-btn">Iniciar Sesión</button>
                </form>
                <div className="auth-links">
                    <p>¿No tienes cuenta? <button onClick={goToRegister}>Registrarse</button></p>
                </div>
                <button onClick={goToHome} className="back-btn">Volver a Inicio</button>
            </div>
        </div>
    );
};

export default Login;
