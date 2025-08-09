// src/pages/OrdenesMesero.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTopBar from '../components/PageTopBar';

function OrdenesMesero() {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenTemporal, setOrdenTemporal] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!usuario || usuario.rol?.nombre !== 'Mesero') {
      navigate('/');
      return;
    }
    obtenerOrdenes();
  }, [navigate]);

  const obtenerOrdenes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ordenes');
      const datosConEstadoFalso = (response.data || []).map((orden, index) => ({
        ...orden,
        estado: ['Pendiente', 'Preparando', 'Entregado'][index % 3]
      }));
      setOrdenes(datosConEstadoFalso);
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
    }
  };

  const cancelarOrden = async (id) => {
    if (!window.confirm('¿Deseas cancelar esta orden?')) return;
    try {
      await axios.delete(`http://localhost:3001/ordenes/${id}`);
      setOrdenes(prev => prev.filter(o => o.id !== id));
      alert('Orden cancelada correctamente');
    } catch (error) {
      console.error('Error al cancelar orden:', error);
      alert('Error al cancelar la orden');
    }
  };

  const eliminarItem = (index) => {
    const nueva = { ...ordenTemporal };
    nueva.items.splice(index, 1);
    setOrdenTemporal(nueva);
  };

  const actualizarNota = (index, nota) => {
    const nueva = { ...ordenTemporal };
    nueva.items[index].nota = nota;
    setOrdenTemporal(nueva);
  };

  const guardarCambios = () => {
    const nuevas = ordenes.map(o => (o.id === ordenTemporal.id ? ordenTemporal : o));
    setOrdenes(nuevas);
    setMostrarModal(false);
    setOrdenTemporal(null);
  };

  // Ir a agregar más platillos a esta orden (lleva contexto a VistaMesero)
  const irAgregarMas = () => {
    if (!ordenTemporal) return;
    localStorage.setItem(
      'ordenEnEdicion',
      JSON.stringify({
        id: ordenTemporal.id,
        codigo: ordenTemporal.codigo,
        mesa: ordenTemporal.mesa,
        items: ordenTemporal.items
      })
    );
    setMostrarModal(false);
    navigate('/mesero'); // VistaMesero leerá 'ordenEnEdicion'
  };

  // Agrupar solo para MOSTRAR en tabla (sin nota => xN)
  const agruparItemsParaMostrar = (items = []) => {
    const grupos = [];
    const map = new Map();
    items.forEach(it => {
      const hasNote = it.nota != null && String(it.nota).trim() !== '';
      if (hasNote) {
        grupos.push({ ...it, cantidad: 1, _agrupado: false });
      } else {
        const key = it.nombre;
        if (!map.has(key)) {
          map.set(key, grupos.length);
          grupos.push({ ...it, nota: null, cantidad: 1, _agrupado: true });
        } else {
          grupos[map.get(key)].cantidad += 1;
        }
      }
    });
    return grupos;
  };

  const estadoChipStyle = (estado) => {
    const base = { display:'inline-block', padding:'0.25rem 0.5rem', borderRadius:999, fontSize:'.85rem', color:'#fff' };
    if (estado === 'Pendiente') return { ...base, background:'#a68b00' };
    if (estado === 'Preparando') return { ...base, background:'#006666' };
    return { ...base, background:'#2e7d32' };
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',            // 👈 sin scroll lateral
        fontFamily: 'Segoe UI, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Barra superior full-width/sticky */}
      <PageTopBar
        title="Órdenes del Mesero"
        backTo="/panel"                 // 👈 ajusta si tu panel usa otra ruta
      />

      {/* Contenido */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', boxSizing: 'border-box' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2>📄 Órdenes enviadas</h2>

        </div>

        <table style={{ width:'100%', borderCollapse:'collapse', marginTop:'2rem' }}>
          <thead>
            <tr style={{ background:'#006666', color:'#fff' }}>
              <th style={th}>Código</th>
              <th style={th}>Mesa</th>
              <th style={th}>Estado</th>
              <th style={th}>Mesero</th>
              <th style={th}>Detalle</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden, i) => {
              const itemsAgr = agruparItemsParaMostrar(orden.items);
              return (
                <tr key={orden.id} style={{ background: i%2===0 ? '#f9f9f9' : '#fff' }}>
                  <td style={td}>{orden.codigo || `#${orden.id}`}</td>
                  <td style={td}>{orden.mesa}</td>
                  <td style={td}><span style={estadoChipStyle(orden.estado)}>{orden.estado}</span></td>
                  <td style={td}>{orden.mesero?.nombre || usuario?.nombre}</td>
                  <td style={{ ...td, verticalAlign:'top' }}>
                    <ul style={{ margin:0, paddingLeft:'1.2rem' }}>
                      {itemsAgr.map((it, idx) => (
                        <li key={idx} style={{ marginBottom:'.2rem' }}>
                          <strong>{it.nombre}</strong>
                          {it._agrupado && it.cantidad>1
                            ? <> x{it.cantidad} - Q{Number(it.precio).toFixed(2)} c/u</>
                            : <> - Q{Number(it.precio).toFixed(2)}</>}
                          {it.nota && <em> ({it.nota})</em>}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={td}>
                    <button
                      onClick={() => { setOrdenTemporal(JSON.parse(JSON.stringify(orden))); setMostrarModal(true); }}
                      style={accionBtn}
                    >Editar</button>
                    <button
                      onClick={() => cancelarOrden(orden.id)}
                      style={{ ...accionBtn, background:'#e60000' }}
                      disabled={orden.estado==='Entregado'}
                      title={orden.estado==='Entregado' ? 'No se puede cancelar una orden entregada' : undefined}
                    >Cancelar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal editar */}
      {mostrarModal && ordenTemporal && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3>Editar Orden {ordenTemporal.codigo || `#${ordenTemporal.id}`}</h3>
            {ordenTemporal.items.map((item, idx) => (
              <div key={idx} style={{ marginBottom:'1rem' }}>
                <strong>{item.nombre}</strong> - Q{Number(item.precio).toFixed(2)}
                <input
                  type="text"
                  value={item.nota || ''}
                  placeholder="Añadir nota..."
                  onChange={(e) => actualizarNota(idx, e.target.value)}
                  style={{ width:'100%', marginTop:'.5rem' }}
                />
                <button
                  onClick={() => eliminarItem(idx)}
                  style={{ marginTop:'.5rem', background:'#e60000', color:'#fff', border:'none', borderRadius:4, padding:'.3rem .6rem' }}
                >Eliminar</button>
              </div>
            ))}
            <div style={{ display:'flex', gap:'.5rem', justifyContent:'space-between', marginTop:'1.5rem' }}>
              <button onClick={() => { setMostrarModal(false); setOrdenTemporal(null); }} style={cerrarBtn}>Cerrar</button>
              <button onClick={irAgregarMas} style={agregarBtn}>➕ Agregar</button>
              <button onClick={guardarCambios} style={guardarBtn}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const th = { padding:'0.8rem', textAlign:'left', borderBottom:'2px solid #ccc' };
const td = { padding:'0.8rem', borderBottom:'1px solid #ddd' };

const volverBtn = { background:'#004d4d', color:'#fff', padding:'0.6rem 1.2rem', border:'none', borderRadius:6, cursor:'pointer' };
const accionBtn = { marginRight:'.5rem', padding:'.4rem .8rem', border:'none', borderRadius:4, background:'#004d4d', color:'#fff', cursor:'pointer' };

const guardarBtn = { padding:'0.6rem 1.2rem', background:'#006666', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' };
const agregarBtn = { padding:'0.6rem 1.2rem', background:'#0b7', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' };
const cerrarBtn = { padding:'0.6rem 1.2rem', background:'#ccc', color:'#333', border:'none', borderRadius:6, cursor:'pointer' };

const modalStyle = { position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:999 };
const modalContent = { background:'#fff', padding:'2rem', borderRadius:10, width:420, maxWidth:'90vw', boxSizing:'border-box' };

export default OrdenesMesero;
