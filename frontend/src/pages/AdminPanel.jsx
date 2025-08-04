import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminPanel() {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      setNombre(usuario.nombre);
    } else {
      navigate('/'); // Redirige al login si no hay sesión
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem'
    }}>
      {/* Barra superior */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#004d4d',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <div><strong>👤 {nombre}</strong></div>
        <button onClick={cerrarSesion} style={{
          backgroundColor: '#e60000',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1.2rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Cerrar sesión
        </button>
      </header>

      {/* Título principal */}
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>Panel de Administración</h2>

      {/* Navegación */}
      <nav style={{
        display: 'flex',
        gap: '1.5rem',
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Link to="/admin/usuarios" style={linkStyle}>👥 Usuarios</Link>
        <Link to="/admin/platillos" style={linkStyle}>🍽 Platillos</Link>
        <Link to="/admin/historial" style={linkStyle}>📜 Historial</Link>
        <Link to="/admin/menu" style={linkStyle}>📋 Menú</Link> 
        <Link to="/admin/categorias" style={linkStyle}>📂 Categorías</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  textDecoration: 'none',
  padding: '0.8rem 1.2rem',
  backgroundColor: '#006666',
  color: 'white',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

export default AdminPanel;
