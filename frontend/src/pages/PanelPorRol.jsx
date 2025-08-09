// src/pages/PanelPorRol.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function logout() {
  try {
    localStorage.removeItem('usuario');
    sessionStorage.clear();
    window.location.replace('/login'); // redirección limpia
  } catch {
    window.location.replace('/login');
  }
}

// === Helpers inline (Opción B) ===
function getPermisosFromUser(u) {
  if (Array.isArray(u?.permisos) && u.permisos.length) {
    return u.permisos
      .map(p => (typeof p === 'string' ? p : (p.clave || p.nombre || p.key)))
      .filter(Boolean);
  }
  if (Array.isArray(u?.rol?.permisos) && u.rol.permisos.length) {
    return u.rol.permisos
      .map(p => (typeof p === 'string' ? p : (p.clave || p.nombre || p.key)))
      .filter(Boolean);
  }
  return [];
}
function esAdmin(u) {
  const n = (u?.rol?.nombre || '').trim().toUpperCase();
  return n === 'ADMINISTRADOR' || n === 'ADMIN';
}

// === estilos ===
const cajaLink = {
  textDecoration: 'none',
  padding: '0.8rem 1.2rem',
  backgroundColor: '#006666',
  color: 'white',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'transform 0.2s, box-shadow 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.5rem',
};
const tile = {
  backgroundColor: '#f1f3f6',
  textDecoration: 'none',
  color: '#1e3d59',
  minWidth: 160,
  height: 120,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  transition: 'transform .2s, box-shadow .2s',
};
const cont = {
  minHeight: '100vh',
  background: '#f9f9f9',
  fontFamily: 'Segoe UI, sans-serif',
};

// Importante: claves de permiso alineadas al seed.js
const CATALOGO_ROL = [
  { ruta: "/admin/usuarios",   texto: "Usuarios",              icono: "👥",  permiso: "CONFIGURAR_USUARIOS" },
  { ruta: "/admin/platillos",  texto: "Platillos",             icono: "🍽️", permiso: "CONFIGURAR_PLATILLOS" },
  { ruta: "/admin/historial",  texto: "Historial",             icono: "📜",  permiso: "VER_HISTORIAL" },
  { ruta: "/admin/menu",       texto: "Menú",                  icono: "📋",  permiso: "VER_MENU" },
  { ruta: "/admin/categorias", texto: "Categorías",            icono: "📂",  permiso: "GESTIONAR_CATEGORIAS" },
  { ruta: "/admin/roles",      texto: "Roles",                 icono: "🛠",  permiso: "GESTIONAR_ROLES" },
  // Mesero
  { ruta: "/mesero",           texto: "Generar Orden",   icono: "🛎️", permiso: "GENERAR_ORDEN" },
  { ruta: "/mesero/ordenes",   texto: "Historial Órdenes", icono: "📋", permiso: "VER_ORDENES" }, // <- del seed
];

export default function PanelPorRol() {
  const [usuario, setUsuario] = useState(null);
  const [permisos, setPermisos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario'));
    if (!u) return navigate('/login', { replace: true });

    // Si es admin, no debe ver este panel
    if (esAdmin(u)) return navigate('/admin', { replace: true });

    setUsuario(u);
    setPermisos(getPermisosFromUser(u)); // normaliza strings/objetos/clave/nombre
  }, [navigate]);

  const nombre = usuario?.nombre || '';
  const rolNombre = usuario?.rol?.nombre || 'Usuario';

  const accesos = useMemo(
    () => CATALOGO_ROL.filter(item => !item.permiso || permisos.includes(item.permiso)),
    [permisos]
  );

  if (!usuario) return null;

  return (
    <div style={cont}>
      {/* Header simple */}
      <header style={{
  backgroundColor: '#1e3d59',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
}}>
  <h1 style={{ margin: 0, fontSize: '1.1rem' }}>👤 {nombre}</h1>

  {/* 👉 lado derecho: rol + botón cerrar sesión */}
  <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
    <span>{rolNombre}</span>
    <button onClick={logout} style={{
      background:'#e63946',
      color:'#fff',
      border:'none',
      padding:'.5rem 1rem',
      borderRadius:6,
      fontWeight:'bold',
      cursor:'pointer'
    }}>
      Cerrar sesión
    </button>
  </div>
</header>

      <main style={{
        maxWidth: 1000,
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
          Accesos según tu rol
        </h2>

        {accesos.length === 0 ? (
          <div style={{
            background:'#fff8e1',
            border:'1px solid #ffe0a3',
            color:'#7a5b00',
            padding:'1rem',
            borderRadius:8,
            textAlign:'center'
          }}>
            No tienes accesos habilitados todavía. Contacta al administrador para asignarte permisos.
          </div>
        ) : (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',
            gap:'1.2rem',
            justifyItems:'center'
          }}>
            {accesos.map(({ ruta, texto, icono }) => (
              <Link key={ruta} to={ruta} style={tile}>
                <div style={{ fontSize: '2rem' }}>{icono}</div>
                <span style={{ marginTop: 8, fontWeight: 600 }}>{texto}</span>
              </Link>
            ))}
          </div>
        )}


      </main>
    </div>
  );
}
