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
import Profile from '../components/Profile';

const AppRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Obtén el rol de usuario desde localStorage

    // Ruta protegida para usuarios autenticados
    const ProtectedRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/no-auth" />;
    };

    // Ruta protegida para administradores
    const AdminProtectedRoute = ({ children }) => {
        return isAuthenticated && userRole === 'admin' ? children : <Navigate to="/" />;
    };

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas para todos los usuarios autenticados */}
            <Route 
                path="/catalogo" 
                element={
                    <ProtectedRoute>
                        <Catalogo />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/carrito" 
                element={
                    <ProtectedRoute>
                        <Carrito />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/productos/:categoria" 
                element={
                    <ProtectedRoute>
                        <Productos />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } 
            />

            {/* Rutas protegidas solo para administradores */}
            <Route 
                path="/add-product" 
                element={
                    <AdminProtectedRoute>
                        <AddProductForm />
                    </AdminProtectedRoute>
                } 
            />
            <Route 
                path="/edit-product" 
                element={
                    <AdminProtectedRoute>
                        <EditProduct />
                    </AdminProtectedRoute>
                } 
            />

            {/* Ruta para usuarios no autenticados */}
            <Route path="/no-auth" element={<NoAuth />} />
        </Routes>
    );
};

export default AppRoutes;
