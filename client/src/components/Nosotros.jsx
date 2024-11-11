import React from 'react';
import '../App.css';  // Asegúrate de que la ruta sea correcta

const Nosotros = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;  // Si el modal no está abierto, no renderizarlo

    return (
        <div className="nosotros-modal-overlay" onClick={closeModal}>
            <div className="nosotros-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="nosotros-modal-title">Nosotros</h2>
                <p className="nosotros-modal-description">
                    Somos un proyecto en inicio, diseñado como parte de Coding Dojo.
                    Nuestro objetivo es crear experiencias interactivas y educativas usando
                    tecnologías web modernas.
                </p>
                <button className="nosotros-close-modal-btn" onClick={closeModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default Nosotros;
