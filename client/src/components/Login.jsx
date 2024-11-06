import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>
                ¿No tienes cuenta? 
                <button onClick={goToRegister}>Registrarse</button>
            </p>

            {/* Botón de "Volver a Inicio" */}
            <button onClick={goToHome} style={styles.backButton}>Volver a Inicio</button>
        </div>
    );
};

const styles = {
    backButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    }
};

export default Login;
