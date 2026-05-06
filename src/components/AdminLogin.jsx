import React, { useState } from 'react';
import { Lock, LogIn, ShieldAlert } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const correctUser = import.meta.env.VITE_ADMIN_USER?.trim();
    const correctPass = import.meta.env.VITE_ADMIN_PASS?.trim();

    if (username.trim() === correctUser && password.trim() === correctPass) {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-icon">
          <Lock size={32} />
        </div>
        <h2>Acceso Restringido</h2>
        <p>Ingresa tus credenciales para gestionar las transacciones.</p>

        {error && (
          <div className="login-error">
            <ShieldAlert size={16} style={{ marginBottom: '-3px', marginRight: '5px' }} />
            Usuario o contraseña incorrectos.
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="login-btn">
            INGRESAR <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
