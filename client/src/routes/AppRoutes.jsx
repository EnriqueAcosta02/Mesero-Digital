import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Productos from '../components/Productos';
import NoAuth from '../components/noauth';
import Catalogo from '../components/Catalogo';
import AddProductForm from '../components/AddProductForm';
import EditProduct from '../components/EditProduct'; 
import Carrito from '../components/Carrito';
import Profile from '../components/Profile';  // Importa el componente Profile

const AppRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');

    // Componente de ruta protegida
    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/no-auth" />;
    };

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route path="/add-product" element={<ProtectedRoute element={<AddProductForm />} />} />
            <Route path="/carrito" element={<ProtectedRoute element={<Carrito />} />} />
            <Route path="/catalogo" element={<ProtectedRoute element={<Catalogo />} />} />
            <Route path="/productos/:categoria" element={<ProtectedRoute element={<Productos />} />} />
            <Route path="/edit-product" element={<ProtectedRoute element={<EditProduct />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

            {/* Ruta para no autenticado */}
            <Route path="/no-auth" element={<NoAuth />} />
        </Routes>
    );
};

export default AppRoutes;
