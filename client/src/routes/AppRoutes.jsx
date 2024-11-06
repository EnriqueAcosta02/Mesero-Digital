import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Productos from '../components/Productos';
import NoAuth from '../components/noauth';
import Catalogo from '../components/Catalogo'; 

const AppRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');

    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/no-auth" />;
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Ruta dinámica para los productos según la categoría */}
            <Route path="/productos/:categoria" element={<ProtectedRoute element={<Productos />} />} />
            
            <Route path="/catalogo" element={<ProtectedRoute element={<Catalogo />} />} />
            <Route path="/no-auth" element={<NoAuth />} />
        </Routes>
    );
};

export default AppRoutes;
