import React from 'react';
import { Outlet } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAuth } from './AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        <UserMenu user={user} onLogout={logout} />
      </header>
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
};

export default Layout;
