// historial.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Historial() {
  const [historial, setHistorial] = useState([]);
  const [filtroCampo, setFiltroCampo] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroEntidad, setFiltroEntidad] = useState('todos');
  const navigate = useNavigate();

  const camposDisponibles = [
    '', 'nombre', 'usuario', 'correo', 'contrasena', 'rol', 'estado', 'precio', 'categoria'
  ];

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const obtenerHistorial = async () => {
    try {
      const res = await axios.get('http://localhost:3001/historial');
      setHistorial(res.data);
    } catch (error) {
      console.error('Error al obtener historial:', error);
    }
  };

  const getDescripcionAccion = (accion, campo, valorAnterior, valorNuevo) => {
    if (accion.startsWith('eliminación de')) return accion;

    if (accion === 'creación') {
      return `Creación: ${valorNuevo}`;
    }

    if (accion === 'modificación' || accion.includes('Modificación de platillo')) {
      if (campo === 'rol') {
        return `Cambio de rol: ${valorAnterior} → ${valorNuevo}`;
      } else if (campo === 'contrasena') {
        return `Cambio de contraseña`;
      } else {
        return `Cambio en ${campo}: ${valorAnterior || '—'} → ${valorNuevo || '—'}`;
      }
    }

    if (accion === 'eliminación') {
      return `Eliminación de ${campo}: ${valorAnterior || '—'}`;
    }

    return accion;
  };

  const historialFiltrado = historial.filter(h =>
    (!filtroCampo || h.campo === filtroCampo) &&
    (!filtroUsuario || (
      (h.usuario?.nombre && h.usuario.nombre.toLowerCase().includes(filtroUsuario.toLowerCase())) ||
      (h.platillo?.nombre && h.platillo.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()))
    )) &&
    (filtroEntidad === 'todos' ||
      (filtroEntidad === 'usuarios' && h.usuario) ||
      (filtroEntidad === 'platillos' && h.platillo))
  );

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f6f7',
      minHeight: '100vh'
    }}>
      {/* Botón volver */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/admin')} style={{
          backgroundColor: '#004d4d',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          ← Volver al panel
        </button>
      </div>

      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>📜 Historial de Modificaciones</h2>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ marginRight: '0.5rem' }}>Filtrar por entidad:</label>
          <select value={filtroEntidad} onChange={(e) => setFiltroEntidad(e.target.value)} style={inputStyle}>
            <option value="todos">Todos</option>
            <option value="usuarios">Usuarios</option>
            <option value="platillos">Platillos</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '0.5rem' }}>Filtrar por campo:</label>
          <select value={filtroCampo} onChange={(e) => setFiltroCampo(e.target.value)} style={inputStyle}>
            {camposDisponibles.map((campo, i) => (
              <option key={i} value={campo}>
                {campo === '' ? 'Todos' : campo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ marginRight: '0.5rem' }}>Filtrar por afectado:</label>
          <input
            type="text"
            placeholder="Nombre de usuario o platillo"
            value={filtroUsuario}
            onChange={(e) => setFiltroUsuario(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Tabla de historial */}
      <div style={{
        overflowX: 'auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '1rem'
      }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Entidad</th>
              <th style={thStyle}>Campo</th>
              <th style={thStyle}>Valor anterior</th>
              <th style={thStyle}>Valor nuevo</th>
              <th style={thStyle}>Acción</th>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {historialFiltrado.map((h) => (
              <tr key={h.id}>
                <td style={tdStyle}>{h.id}</td>
                <td style={tdStyle}>
                  {h.usuario?.nombre ? `Usuario: ${h.usuario.nombre}` :
                    h.platillo?.nombre ? `Platillo: ${h.platillo.nombre}` :
                      '—'}
                </td>
                <td style={tdStyle}>{h.campo}</td>
                <td style={tdStyle}>{h.valorAnterior || '—'}</td>
                <td style={tdStyle}>{h.valorNuevo || '—'}</td>
                <td style={tdStyle}>{getDescripcionAccion(h.accion, h.campo, h.valorAnterior, h.valorNuevo)}</td>
                <td style={tdStyle}>{new Date(h.fecha).toLocaleString()}</td>
                <td style={tdStyle}>{h.responsable?.nombre || 'Desconocido'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.4rem 0.6rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '0.95rem'
};

const thStyle = {
  backgroundColor: '#005f5f',
  color: 'white',
  padding: '10px',
  borderRight: '1px solid #ddd'
};

const tdStyle = {
  padding: '10px',
  borderRight: '1px solid #ddd',
  borderBottom: '1px solid #eee',
  color: '#333'
};

export default Historial;
