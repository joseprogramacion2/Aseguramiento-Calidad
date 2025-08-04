import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

function PanelBasico() {
  const [rol, setRol] = useState('');
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) {
      setRol(user.rol?.nombre || '');
      setNombre(user.nombre || '');
    }
  }, []);

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
      <AdminHeader titulo="🔐 Panel Básico" />

      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2>Bienvenido, {nombre}</h2>
        <p><strong>Rol:</strong> {rol}</p>

        {rol === 'Cocinero' && <p>🍳 Vista de cocinero próximamente</p>}
        {rol === 'Repartidor' && <p>🚚 Vista de repartidor próximamente</p>}
        {rol === 'Mesero' && <p>🍽 Vista de mesero próximamente</p>}
        {rol === 'Administrador' && <p>🛠 Vista de administrador</p>}
        {!rol && <p>⚠ No se encontró rol</p>}

        <button onClick={cerrarSesion} style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.2rem',
          borderRadius: '5px',
          backgroundColor: '#e60000',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default PanelBasico;
