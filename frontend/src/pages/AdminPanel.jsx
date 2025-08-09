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
      navigate('/');
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f5f6fa'
    }}>
      {/* Top bar */}
      <header style={{
        backgroundColor: '#1e3d59',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.3rem' }}>📋 Panel de Administración</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>👤 {nombre || "Administrador"}</span>
          <button onClick={cerrarSesion} style={{
            backgroundColor: '#e63946',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Cerrar sesión</button>
        </div>
      </header>

      {/* Contenido */}
      <div style={{
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Accesos rápidos</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          justifyItems: 'center'
        }}>
          {botones.map(({ ruta, texto, icono }) => (
            <Link to={ruta} key={ruta} style={cuadroLink}>
              <div style={{ fontSize: '2rem' }}>{icono}</div>
              <span style={{ marginTop: '0.5rem', fontWeight: 500 }}>{texto}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const botones = [
  { ruta: "/admin/usuarios", texto: "Usuarios", icono: "👥" },
  { ruta: "/admin/platillos", texto: "Platillos", icono: "🍽️" },
  { ruta: "/admin/historial", texto: "Historial", icono: "📜" },
  { ruta: "/admin/menu", texto: "Menú", icono: "📋" },
  { ruta: "/admin/categorias", texto: "Categorías", icono: "📂" },
];

const cuadroLink = {
  backgroundColor: '#f1f3f6',
  textDecoration: 'none',
  color: '#1e3d59',
  width: '150px',
  height: '120px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer'
};

cuadroLink[':hover'] = {
  transform: 'scale(1.05)',
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
};

export default AdminPanel;
