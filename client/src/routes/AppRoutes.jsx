import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Productos from '../components/Productos';
import NoAuth from '../components/noauth';
import Catalogo from '../components/Catalogo';
import AddProductForm from '../components/AddProductForm';
import EditProduct from '../components/EditProduct'; // Asegúrate de importar el componente EditProduct

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
            <Route path="/add-product" element={<AddProductForm />} />

            {/* Ruta dinámica para los productos según la categoría */}
            <Route path="/productos/:categoria" element={<ProtectedRoute element={<Productos />} />} />

            {/* Ruta para el catálogo */}
            <Route path="/catalogo" element={<ProtectedRoute element={<Catalogo />} />} />

            {/* Ruta para editar productos */}
            <Route path="/edit-product" element={<ProtectedRoute element={<EditProduct />} />} />

            {/* Ruta para no autenticado */}
            <Route path="/no-auth" element={<NoAuth />} />
        </Routes>
    );
};

export default AppRoutes;
