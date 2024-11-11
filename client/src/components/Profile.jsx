import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Asegúrate de que la ruta sea correcta

const Profile = ({ closeModal }) => {
    const [user, setUser] = useState(null);  // Para almacenar los datos del usuario
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found, redirecting to login...');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:9999/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Pasar el token como parte de la autorización
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data); // Establecer los datos del usuario, incluido el email
                } else {
                    console.log('Error al obtener perfil:', data.message);
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            } finally {
                setLoading(false); // Dejamos de cargar una vez obtenemos la respuesta
            }
        };

        fetchUserProfile();
    }, [navigate]);  // `navigate` como dependencia

    const handleLogout = () => {
        // Eliminar el token de localStorage para cerrar la sesión
        localStorage.removeItem('token');
        localStorage.removeItem('role');  // Si estás almacenando el rol también
        navigate('/login');  // Redirigir al inicio de sesión
    };

    if (loading) {
        return <div>Cargando...</div>; // Mensaje mientras se obtiene el perfil
    }

    if (!user) {
        return <div>No se pudo cargar el perfil. Asegúrate de haber iniciado sesión.</div>;
    }

    return (
        <div className="profile-modal">
            <div className="profile-card">
                {/* Botón para cerrar el modal */}
                <button onClick={closeModal} className="close-modal-btn">X</button>

                <h1>Perfil</h1>
                <p><strong>Nombre de usuario:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p> {/* Mostrar el email del usuario */}

                {/* Botón de Cerrar sesión */}
                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>

                <button onClick={closeModal} className="close-btn">Cerrar</button>
            </div>
        </div>
    );
};

export default Profile;
