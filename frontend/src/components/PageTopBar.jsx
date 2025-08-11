// frontend/src/components/PageTopBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const wrap = {
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100vw',
  background: '#13354B',
  color: 'white',
  padding: '14px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  borderRadius: 0,
  boxSizing: 'border-box',
};

const left = { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '20px' };
const right = { display: 'flex', alignItems: 'center', gap: '12px' };
const roleBadge = { display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', padding: '8px 12px', borderRadius: '999px', fontWeight: 600 };

const btn = {
  border: 'none',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '999px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform .06s ease'
};

const backBtn = { ...btn, background: '#0F7A65' };
const logoutBtn = { ...btn, background: '#e63946' };

export default function PageTopBar({
  title = 'Vista',
  backTo = '/panel',
  showRole = true,
  showBack = true,
  onLogout = null,          // 👈 NUEVO (opcional)
  logoutLabel = 'Cerrar sesión'
}) {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rolNombre = usuario?.rol?.nombre || 'Usuario';

  return (
    <div style={wrap}>
      <div style={left}>
        <span role="img" aria-label="ubicacion">📍</span>
        <span>{title}</span>
      </div>
      <div style={right}>
        {showRole && (
          <span style={roleBadge}>
            <span role="img" aria-label="user">👤</span>
            {rolNombre}
          </span>
        )}

        {showBack && (
          <button
            type="button"
            style={backBtn}
            onClick={() => navigate(backTo)}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ← Volver al Panel
          </button>
        )}

        {typeof onLogout === 'function' && (
          <button
            type="button"
            style={logoutBtn}
            onClick={onLogout}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {logoutLabel}
          </button>
        )}
      </div>
    </div>
  );
}
