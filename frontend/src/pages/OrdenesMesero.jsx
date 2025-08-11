// frontend/src/pages/OrdenesMesero.jsx
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTopBar from '../components/PageTopBar';

const API = 'http://localhost:3001';

export default function OrdenesMesero() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const usuario = useMemo(() => JSON.parse(localStorage.getItem('usuario')), []);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario'));
    if (!u || (u.rol?.nombre || '').toUpperCase() !== 'MESERO') {
      navigate('/login', { replace: true });
      return;
    }
    cargar();
    // refrescar cada 10s para ver avances de cocina
    const t = setInterval(cargar, 10000);
    return () => clearInterval(t);
  }, [navigate]);

  async function cargar() {
    try {
      setCargando(true);
      const { data } = await axios.get(`${API}/ordenes`);
      setOrdenes(data || []);
      setError('');
    } catch (e) {
      console.error(e);
      setError('No se pudo cargar órdenes');
    } finally {
      setCargando(false);
    }
  }

  const cancelarOrden = async (id) => {
    if (!window.confirm('¿Deseas cancelar esta orden?')) return;
    try {
      await axios.delete(`${API}/ordenes/${id}`);
      await cargar();
      alert('Orden cancelada correctamente');
    } catch (error) {
      console.error('Error al cancelar orden:', error);
      alert('Error al cancelar la orden');
    }
  };

  const editarOrden = (orden) => {
    localStorage.setItem(
      'ordenEnEdicion',
      JSON.stringify({
        id: orden.id,
        codigo: orden.codigo,
        mesa: orden.mesa,
        items: orden.items.map((it) => ({
          id: it.platilloId || it.id,
          nombre: it.nombre,
          precio: it.precio,
          nota: it.nota,
          tipo: it.tipo || 'PLATILLO',
        })),
      })
    );
    navigate('/mesero');
  };

  const chip = (estado) => {
    const base = {
      display: 'inline-block',
      padding: '0.2rem .5rem',
      borderRadius: 999,
      fontSize: '.85rem',
      color: '#fff',
      marginLeft: 6,
    };
    if (estado === 'PENDIENTE') return { ...base, background: '#a68b00' };
    if (estado === 'PREPARANDO') return { ...base, background: '#006666' };
    return { ...base, background: '#2e7d32' }; // LISTO
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Segoe UI, sans-serif' }}>
      <PageTopBar title="Órdenes del Mesero" backTo="/panel" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', boxSizing: 'border-box' }}>
        <h2>📄 Órdenes enviadas</h2>

        {cargando ? (
          <p>Cargando…</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ background: '#006666', color: '#fff' }}>
                <th style={th}>Código</th>
                <th style={th}>Mesa</th>
                <th style={th}>Mesero</th>
                <th style={th}>Detalle (platillos y estados)</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden, i) => (
                <tr key={orden.id} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={td}>{orden.codigo || `#${orden.id}`}</td>
                  <td style={td}>{orden.mesa}</td>
                  <td style={td}>{orden.mesero?.nombre || usuario?.nombre}</td>
                  <td style={{ ...td, verticalAlign: 'top' }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {(orden.items || [])
                        .filter((it) => (it.tipo || 'PLATILLO') === 'PLATILLO')
                        .map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '.2rem' }}>
                            <strong>{item.nombre}</strong> - Q{Number(item.precio).toFixed(2)}
                            {item.nota && <em> ({item.nota})</em>}
                            <span style={chip(item.estado || 'PENDIENTE')}>{item.estado || 'PENDIENTE'}</span>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td style={td}>
                    <button onClick={() => editarOrden(orden)} style={accionBtn}>
                      Editar
                    </button>
                    <button onClick={() => cancelarOrden(orden.id)} style={{ ...accionBtn, background: '#e60000' }}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
              {ordenes.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ ...td, textAlign: 'center' }}>
                    No hay órdenes todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const th = { padding: '0.8rem', textAlign: 'left', borderBottom: '2px solid #ccc' };
const td = { padding: '0.8rem', borderBottom: '1px solid #ddd' };
const accionBtn = { marginRight: '.5rem', padding: '.4rem .8rem', border: 'none', borderRadius: 4, background: '#004d4d', color: '#fff', cursor: 'pointer' };
