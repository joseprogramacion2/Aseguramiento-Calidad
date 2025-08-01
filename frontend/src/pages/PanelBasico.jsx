//panelbasico
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenido, {nombre}</h2>
      <p><strong>Rol:</strong> {rol}</p>

      {rol === 'Cocinero' && <p>🍳 Vista de cocinero próximamente</p>}
      {rol === 'Repartidor' && <p>🚚 Vista de repartidor próximamente</p>}
      {rol === 'Mesero' && <p>🍽 Vista de mesero próximamente</p>}
      {rol === 'Administrador' && <p>🛠 Vista de administrador</p>}
      {!rol && <p>⚠ No se encontró rol</p>}

      <button onClick={cerrarSesion} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default PanelBasico;