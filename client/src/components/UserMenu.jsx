import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token de localStorage y redirige al login
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="user-menu">
      {user ? (
        <div>
          <span>Bienvenido, {user.username}</span>
          <nav>
            <Link to="/profile">Perfil</Link>
            <Link to="/productos">Productos</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </nav>
        </div>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </div>
  );
};

export default UserMenu;
