import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminHeader = ({ titulo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rol = usuario?.rol?.nombre || 'Administrador General';

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const enPanelAdmin = location.pathname === '/admin';

  return (
    <header style={headerContainer}>
      <div style={leftSection}>
        <span style={icono}>📋</span>
        <h1 style={tituloEstilo}>{titulo}</h1>
      </div>

      <div style={rightSection}>
        <span style={usuarioEstilo}>👤 {rol}</span>

        {rol === 'Administrador' && enPanelAdmin && (
          <button onClick={cerrarSesion} style={buttonRed}>Cerrar sesión</button>
        )}

        {rol === 'Administrador' && !enPanelAdmin && (
          <Link to="/admin" style={buttonReturn}>← Volver al Panel</Link>
        )}

        {rol !== 'Administrador' && (
          <button onClick={cerrarSesion} style={buttonRed}>Cerrar sesión</button>
        )}
      </div>
    </header>
  );
};

// 🎨 Estilos visuales
const headerContainer = {
  backgroundColor: '#1e3d59',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  fontFamily: 'Poppins, sans-serif'
};

const leftSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem'
};

const icono = {
  fontSize: '1.5rem'
};

const tituloEstilo = {
  fontSize: '1.2rem',
  margin: 0
};

const rightSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const usuarioEstilo = {
  fontWeight: '500',
  fontSize: '0.95rem'
};

const buttonRed = {
  backgroundColor: '#e63946',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const buttonReturn = {
  backgroundColor: '#007f5f',
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  fontWeight: 'bold'
};

export default AdminHeader;
