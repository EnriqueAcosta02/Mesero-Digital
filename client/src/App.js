// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AddProductForm from './components/AddProductForm';




const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;
