import React, { useEffect, useState } from 'react';

const Productos = () => {
    const [hamburguesas, setHamburguesas] = useState([]);

    useEffect(() => {
        const fetchHamburguesas = async () => {
            try {
                const response = await fetch('http://localhost:9999/productos/hamburguesas'); // Ajusta la URL según tu configuración
                const data = await response.json();
                setHamburguesas(data);
            } catch (error) {
                console.error('Error al obtener hamburguesas:', error);
            }
        };

        fetchHamburguesas();
    }, []);

    return (
        <div>
            <h1>Hamburguesas</h1>
            <ul>
                {hamburguesas.map((hamburguesa) => (
                    <li key={hamburguesa._id}>
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

export default Productos;
