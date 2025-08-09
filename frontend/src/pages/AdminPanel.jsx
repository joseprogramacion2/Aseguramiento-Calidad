import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:3001';

// Catálogo de accesos del panel y el permiso que requiere cada uno
const CATALOGO = [
  { ruta: "/admin/usuarios",   texto: "Usuarios",     icono: "👥",  permiso: "CONFIGURAR_USUARIOS" },
  { ruta: "/admin/platillos",  texto: "Platillos",    icono: "🍽️", permiso: "CONFIGURAR_PLATILLOS" },
  { ruta: "/admin/historial",  texto: "Historial",    icono: "📜",  permiso: "VER_HISTORIAL" },
  { ruta: "/admin/menu",       texto: "Menú",         icono: "📋",  permiso: "VER_MENU" },
  { ruta: "/admin/categorias", texto: "Categorías",   icono: "📂",  permiso: "GESTIONAR_CATEGORIAS" },
  { ruta: "/admin/roles",      texto: "Roles",        icono: "🛠",  permiso: "GESTIONAR_ROLES" },
];

function AdminPanel() {
  const [usuario, setUsuario] = useState(null);
  const [permisosIdPorNombre, setPermisosIdPorNombre] = useState({}); // { NOMBRE: id }
  const [permisosDelRol, setPermisosDelRol] = useState([]); // [ids]
  const navigate = useNavigate();

  // 1) Verificación de sesión y bloqueo si NO es admin
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario'));
    if (!u) return navigate('/login', { replace: true });

    setUsuario(u);
    const esAdmin = u?.rol?.nombre?.toLowerCase() === 'administrador';
    if (!esAdmin) {
      // Si quieres que el panel sea SOLO admin, redirige:
      navigate('/menu', { replace: true });
      return;
    }

    // 2) Cargar permisos (mapa nombre->id y permisos del rol)
    (async () => {
      try {
        // Mapa nombre → id
        const { data: listaPermisos } = await axios.get(`${API}/permisos`);
        const map = {};
        for (const p of listaPermisos) map[p.nombre] = p.id;
        setPermisosIdPorNombre(map);

        // Permisos del rol
        // roles-con-permisos devuelve [{id, nombre, permisos: [ids]}]
        const { data: roles } = await axios.get(`${API}/permisos/roles-con-permisos`);
        const rolActual = roles.find(r => r.id === u?.rolId || r.nombre === u?.rol?.nombre);
        setPermisosDelRol(rolActual?.permisos ?? []);
      } catch (e) {
        console.error('Error cargando permisos:', e);
      }
    })();
  }, [navigate]);

  const esAdmin = useMemo(
    () => usuario?.rol?.nombre?.toLowerCase() === 'administrador',
    [usuario]
  );

  // 3) Helper para saber si muestra cada botón
  const puedeVer = (permisoNombre) => {
    if (esAdmin) return true; // admin ve todo
    const idNecesario = permisosIdPorNombre[permisoNombre];
    if (!idNecesario) return false;
    return permisosDelRol.includes(idNecesario);
  };

  const cerrarSesion = () => {
  try {
    localStorage.removeItem('usuario');
    sessionStorage.clear();
    // Redirección limpia y definitiva
    window.location.replace('/login'); // o '/'

    // Si prefieres react-router:
    // navigate('/login', { replace: true });
  } catch (e) {
    console.error(e);
    window.location.replace('/login');
  }
};

  if (!usuario || !esAdmin) return null; // mientras valida/redirige

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f5f6fa' }}>
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
          <span>👤 {usuario?.nombre || "Administrador"}</span>
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
          {CATALOGO.filter(btn => puedeVer(btn.permiso)).map(({ ruta, texto, icono }) => (
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

export default AdminPanel;
