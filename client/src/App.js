// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';  // Asegúrate de que la ruta esté correcta
import Register from './components/Register';  // Importación por defecto sin llaves
import Productos from './components/Productos';
import NoAuth from './components/noauth'; // Importa la página NoAuth

const App = () => {
   // Verifica si el usuario está autenticado (por ejemplo, si el token está presente en localStorage)
   const isAuthenticated = localStorage.getItem('token');

   // Componente de ruta protegida
   const ProtectedRoute = ({ element }) => {
       return isAuthenticated ? element : <Navigate to="/no-auth" />;
   };
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} /> {/* Aquí debe estar el componente Register */}
                <Route path="/productos" element={<ProtectedRoute element={<Productos />} />} />
                <Route path="/no-auth" element={<NoAuth />} />
                
            </Routes>
        </Router>
    );
};

export default App;
