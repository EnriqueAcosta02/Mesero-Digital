import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');  // Cambié 'username' a 'email' para coincidir con el backend
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        // Hacer la solicitud de inicio de sesión al backend
        try {
            const response = await fetch('http://localhost:9999/api/login', {  // Asegúrate de que esta sea la ruta correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,   // Enviar el email en lugar del nombre de usuario
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token);
                console.log('Inicio de sesión exitoso');
                navigate('/productos');  // Redirigir a la página de productos
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
        </div>
    );
};

export default Login;
