//login
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f4f4f4'
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#004d4d'
        }}>Iniciar Sesión</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario o correo"
            value={credenciales.usuario}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={credenciales.contrasena}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <button type="submit" style={{
            padding: '0.75rem',
            backgroundColor: '#006666',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            Ingresar
          </button>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;