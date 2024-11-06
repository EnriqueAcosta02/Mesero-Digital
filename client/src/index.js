import React from 'react';
import ReactDOM from 'react-dom/client';  // Importa desde 'react-dom/client' en lugar de 'react-dom'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Crea un root
root.render(<App />);  // Usa el método render del root
