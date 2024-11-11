import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './AuthContext';  // Asegúrate de que la ruta sea correcta

const App = () => {
    return (
        <Router>
            <AuthProvider> {/* Aquí envolvemos toda la aplicación con el contexto de autenticación */}
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;
