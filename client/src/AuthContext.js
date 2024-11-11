// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Almacena el usuario autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si el usuario está autenticado

    useEffect(() => {
        const token = localStorage.getItem('token'); // Verifica si hay un token
        if (token) {
            setIsAuthenticated(true); // Si existe el token, se considera autenticado
            fetchUserData(token); // Llama a la API para obtener los datos del usuario
        } else {
            setIsAuthenticated(false); // Si no hay token, no está autenticado
        }
    }, []); // Solo se ejecuta una vez al cargar el componente

    // Función para obtener los datos del usuario desde la API
    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:9999/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.user) {
                setUser(data.user); // Si los datos del usuario son válidos, se actualiza el estado
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        setIsAuthenticated(false); // Actualiza el estado de autenticación
        setUser(null); // Resetea el estado del usuario
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
