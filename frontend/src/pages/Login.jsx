import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credenciales, setCredenciales] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/login', credenciales);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      const usuario = res.data.usuario;

      if (usuario.rol.nombre === 'Administrador') {
        navigate('/admin');
      } else {
        navigate('/panel');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #006666, #009999)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeIn 0.4s ease-in-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            color: '#006666'
          }}>
            🔐
          </div>
          <h2 style={{
            margin: 0,
            color: '#333'
          }}>Iniciar Sesión</h2>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario o correo"
            value={credenciales.usuario}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={credenciales.contrasena}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Ingresar
          </button>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
};

const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#006666',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.1s ease',
};

export default Login;
