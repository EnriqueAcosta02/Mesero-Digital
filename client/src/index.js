// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ruta a tu componente App
import './index.css'; // Si tienes estilos

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);