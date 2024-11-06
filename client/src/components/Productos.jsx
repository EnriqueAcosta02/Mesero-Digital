import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar para redirigir a otra página

const Productos = () => {
    const [hamburguesas, setHamburguesas] = useState([]); // Estado para almacenar hamburguesas
    const navigate = useNavigate(); // Para redirigir al usuario
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario

    useEffect(() => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Decodificar el token (si estás usando JWT, puedes usar una librería como jwt-decode)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: decodedToken.username }); // Establecer el nombre de usuario
        }

        const fetchHamburguesas = async () => {
            try {
                const response = await fetch('http://localhost:9999/productos/hamburguesas'); // URL de la API
                const data = await response.json(); // Convertir la respuesta a JSON
                setHamburguesas(data); // Actualizar el estado con los datos
            } catch (error) {
                console.error('Error al obtener hamburguesas:', error); // Manejo de errores
            }
        };

        fetchHamburguesas(); // Llamar a la función para obtener hamburguesas
    }, []); // El arreglo vacío significa que solo se ejecuta una vez al montar el componente

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };

    return (
        <div>
            {/* Menú de usuario y botón de cerrar sesión */}
            <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                {user ? (
                    <div>
                        <span>Bienvenido, {user.username}</span>
                        <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <div>
                        <span>No estás autenticado</span>
                    </div>
                )}
            </div>

            <h1>Hamburguesas</h1>
            <ul>
                {hamburguesas.map((hamburguesa) => (
                    <li key={hamburguesa._id}> {/* Clave única para cada elemento */}
                        <h2>{hamburguesa.nombre} - ${hamburguesa.precio}</h2>
                        <h3>Ingredientes:</h3>
                        <ul>
                            {hamburguesa.ingredientes.map((ingrediente) => (
                                <li key={ingrediente._id}>
                                    {ingrediente.nombre} - {ingrediente.cantidad}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Productos; // Exportar el componente
