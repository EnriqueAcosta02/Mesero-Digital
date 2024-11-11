// PrivateRoute.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NoAuth from './noauth'; // Importa tu componente NoAuth

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} /> // Si está autenticado, renderiza el componente
                ) : (
                    <NoAuth /> // Si no está autenticado, muestra el componente NoAuth
                )
            }
        />
    );
};

export default PrivateRoute;
