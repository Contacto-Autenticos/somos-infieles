import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Nueva ruta: Panel de Administración */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
