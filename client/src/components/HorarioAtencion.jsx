import React from 'react';
import '../App.css';  // Asegúrate de que la ruta sea correcta

const HorarioAtencion = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;  // Si el modal no está abierto, no renderizarlo

    return (
        <div className="horario-modal-overlay" onClick={closeModal}>
            <div className="horario-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="horario-modal-title">Horario de Atención</h2>
                <p className="horario-modal-description">
                    Lunes a Viernes: 6:00 PM - 00.00 AM
                    <br />
                    Sábado y Domingo: 5:00 PM - 2:30 AM
                    
                </p>
                <button className="horario-close-modal-btn" onClick={closeModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default HorarioAtencion;
