import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../App.css';  // Asegúrate de que la ruta sea correcta

// Coordenadas de la ubicación del local 
const location = {
    lat: -27.337006462192733,  
    lng: -55.87229730798131
};

const UbicacionModal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;  // Si el modal no está abierto, no renderizarlo

    return (
        <div className="ubicacion-modal-overlay" onClick={closeModal}>
            <div className="ubicacion-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Ubicación del Local</h2>
                <p>Estamos ubicados en el siguiente lugar:</p>

                <LoadScript googleMapsApiKey="AIzaSyC-RNq9mt_m9OiPc7x-F1Aw1I6X0ZQ-gFY"> 
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={location}
                        zoom={15}
                    >
                        <Marker position={location} />
                    </GoogleMap>
                </LoadScript>

                <button className="ubicacion-close-modal-btn" onClick={closeModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default UbicacionModal;
