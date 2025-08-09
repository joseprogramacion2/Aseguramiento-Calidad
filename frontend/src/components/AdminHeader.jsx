// src/components/AdminHeader.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export default function AdminHeader({ titulo = 'Panel' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rol = usuario?.rol?.nombre || 'Administrador';

  const enPanelAdmin = location.pathname === '/admin';

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <header style={wrap}>
      {/* Izquierda: título */}
      <div style={left}>
        <span role="img" aria-label="pin">📍</span>
        <span>{titulo}</span>
      </div>

      {/* Derecha: rol + volver/cerrar */}
      <div style={right}>
        <span style={roleBadge}>
          <span role="img" aria-label="user">👤</span>
          {rol}
        </span>

        {/* Si no estamos en /admin, mostrar "Volver al Panel" */}
        {!enPanelAdmin ? (
          <Link to="/admin" style={backBtn}>← Volver al Panel</Link>
        ) : (
          <button onClick={cerrarSesion} style={backBtnRed}>Cerrar sesión</button>
        )}
      </div>
    </header>
  );
}

/* === Estilos idénticos a PageTopBar === */
const wrap = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  width: '100vw',           // full‑bleed
  boxSizing: 'border-box',
  background: '#13354B',    // mismo azul
  color: 'white',
  padding: '14px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  borderRadius: 0,
  fontWeight: 700,
  fontSize: '20px',
};

const left = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const right = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const roleBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(255,255,255,0.12)',
  padding: '8px 12px',
  borderRadius: '999px',
  fontWeight: 600,
  fontSize: '14px',
};

const backBtn = {
  background: '#0F7A65',    // mismo verde del botón
  color: 'white',
  textDecoration: 'none',
  padding: '10px 16px',
  borderRadius: '999px',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform .06s ease',
};

const backBtnRed = {
  ...backBtn,
  background: '#e63946',
};
