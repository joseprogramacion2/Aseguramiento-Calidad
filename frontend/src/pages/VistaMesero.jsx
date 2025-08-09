// src/pages/VistaMesero.jsx
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTopBar from '../components/PageTopBar';

const FALLBACK_IMG = '/no-image.png'; // coloca no-image.png en /public

function VistaMesero() {
  const [categorias, setCategorias] = useState([]);
  const [platillos, setPlatillos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [carrito, setCarrito] = useState([]);
  const [mostrarNotas, setMostrarNotas] = useState(false);
  const [platilloActual, setPlatilloActual] = useState(null);
  const [notaTemporal, setNotaTemporal] = useState('');

  const [mostrarMesaModal, setMostrarMesaModal] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const [ordenEditId, setOrdenEditId] = useState(null);
  const [ordenEditCodigo, setOrdenEditCodigo] = useState(null);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!usuario || usuario.rol?.nombre !== 'Mesero') {
      navigate('/');
      return;
    }
    obtenerCategorias();
    obtenerPlatillos();

    const raw = localStorage.getItem('ordenEnEdicion');
    if (raw) {
      try {
        const ord = JSON.parse(raw);
        setOrdenEditId(ord.id);
        setOrdenEditCodigo(ord.codigo || `#${ord.id}`);
        setMesaSeleccionada(ord.mesa || null);
        const pre = (ord.items || []).map(it => ({
          id: it.platilloId || 0,
          nombre: it.nombre,
          precio: it.precio,
          nota: it.nota || '',
          cantidad: 1
        }));
        setCarrito(pre);
      } catch {}
    }
  }, [navigate]);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3001/categorias');
      setCategorias(res.data || []);
      if (res.data?.length) setCategoriaSeleccionada(res.data[0].id);
    } catch (error) { console.error('Error al obtener categorías:', error); }
  };

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/platillos');
      // Asegúrate que el backend incluya "imagenUrl" en la respuesta
      setPlatillos((res.data || []).filter(p => p.disponible));
    } catch (error) { console.error('Error al obtener platillos:', error); }
  };

  const seleccionarPlatillo = (platillo) => { setPlatilloActual(platillo); setNotaTemporal(''); setMostrarNotas(true); };

  const confirmarNota = () => {
    if (!platilloActual) return;
    const notaLimpia = (notaTemporal || '').trim();

    setCarrito(prev => {
      if (notaLimpia === '') {
        const idx = prev.findIndex(it => it.id === platilloActual.id && (it.nota || '') === '');
        if (idx >= 0) {
          const copia = [...prev];
          copia[idx] = { ...copia[idx], cantidad: (copia[idx].cantidad || 1) + 1 };
          return copia;
        }
        return [...prev, { ...platilloActual, nota: '', cantidad: 1 }];
      }
      return [...prev, { ...platilloActual, nota: notaLimpia, cantidad: 1 }];
    });

    setMostrarNotas(false);
    setPlatilloActual(null);
    setNotaTemporal('');
  };

  const eliminarDelCarrito = (i) => setCarrito(prev => prev.filter((_, idx) => idx !== i));

  const total = useMemo(() => carrito.reduce((s, it) => s + it.precio * (it.cantidad || 1), 0), [carrito]);

  const enviarOrden = async () => {
    if (!mesaSeleccionada) return alert('Selecciona una mesa');
    if (carrito.length === 0) return alert('Agrega platillos al pedido');

    const itemsPlano = carrito.flatMap(item => {
      const cantidad = item.cantidad || 1;
      const nota = (item.nota || '').trim();
      return Array.from({ length: cantidad }).map(() => ({
        nombre: item.nombre,
        precio: item.precio,
        nota: nota === '' ? null : nota
      }));
    });

    try {
      if (ordenEditId) {
        await axios.post(`http://localhost:3001/ordenes/${ordenEditId}/items`, { items: itemsPlano });
        alert(`Ítems añadidos a la orden ${ordenEditCodigo}`);
        localStorage.removeItem('ordenEnEdicion');
      } else {
        await axios.post('http://localhost:3001/ordenes', {
          mesa: mesaSeleccionada,
          meseroId: usuario.id,
          items: itemsPlano
        });
        alert('Orden enviada exitosamente');
      }

      setCarrito([]); setMesaSeleccionada(null); setMostrarMesaModal(false);
      setOrdenEditId(null); setOrdenEditCodigo(null);
      navigate('/mesero/ordenes');
    } catch (error) {
      if (ordenEditId) {
        try {
          await axios.post('http://localhost:3001/ordenes', {
            mesa: mesaSeleccionada, meseroId: usuario.id, items: itemsPlano
          });
          alert('No existía el endpoint de anexar. Se creó una nueva orden.');
          localStorage.removeItem('ordenEnEdicion');
          setOrdenEditId(null); setOrdenEditCodigo(null);
          navigate('/mesero/ordenes'); return;
        } catch (e2) { console.error('Error al enviar orden (fallback):', e2); }
      }
      console.error('Error al enviar orden:', error); alert('Error al enviar la orden');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Segoe UI, sans-serif',
        width: '100vw',
        overflowX: 'hidden',
      }}
    >
      <PageTopBar
        title={ordenEditId ? 'Generar Orden (Edición)' : 'Generar Orden'}
        backTo="/panel"
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        {/* Sidebar IZQ */}
        <div
          style={{
            flex: '0 0 260px',
            padding: '1rem',
            borderRight: '2px solid #ccc',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={{ fontSize: '1.2rem' }}>Categorías</h2>
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '.8rem',
                padding: '.6rem',
                fontSize: '1rem',
                backgroundColor: categoriaSeleccionada === cat.id ? '#004d4d' : '#eee',
                color: categoriaSeleccionada === cat.id ? '#fff' : '#000',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            >{cat.nombre}</button>
          ))}
        </div>

        {/* Centro */}
        <div
          style={{
            flex: '1 1 auto',
            minWidth: 0,
            padding: '1rem',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
        >
          {ordenEditId && (
            <div style={{ background: '#fff8e1', border: '1px solid #ffecb3', padding: '.6rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
              <strong>Editando</strong> la orden <b>{ordenEditCodigo}</b>. Los ítems que agregues se anexarán a esa orden.
            </div>
          )}
          <h2>Platillos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {platillos
              .filter(p => p.categoria?.id === categoriaSeleccionada)
              .map(p => (
                <div key={p.id} style={{ background: '#fff', padding: '1rem', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,.1)' }}>
                  {/* IMAGEN DEL PLATILLO */}
                  <img
                    src={p.imagenUrl || FALLBACK_IMG}
                    alt={p.nombre}
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                    style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: '1rem', display: 'block' }}
                  />
                  <h4 style={{ margin: 0 }}>{p.nombre}</h4>
                  <p style={{ marginTop: '.3rem' }}>Q{Number(p.precio).toFixed(2)}</p>
                  <button onClick={() => seleccionarPlatillo(p)} style={{ padding: '.5rem 1rem', background: '#004d4d', color: '#fff', border: 'none', borderRadius: 5 }}>Agregar</button>
                </div>
              ))}
          </div>
        </div>

        {/* Carrito DER */}
        <div
          style={{
            flex: '0 0 360px',
            padding: '1rem',
            borderLeft: '2px solid #ccc',
            overflowY: 'auto',
            background: '#fff',
            boxSizing: 'border-box',
          }}
        >
          <h2>Pedido</h2>
          {carrito.map((item, i) => {
            const cant = item.cantidad || 1;
            const sub = item.precio * cant;
            return (
              <div key={i} style={{ marginBottom: '1rem', background: '#f1f1f1', padding: '1rem', borderRadius: 8 }}>
                <strong>{item.nombre}{cant > 1 ? ` x${cant}` : ''}</strong>
                <p style={{ margin: '.25rem 0' }}>
                  Q{item.precio.toFixed(2)}{cant > 1 ? ` c/u • Subtotal: Q${sub.toFixed(2)}` : ''}
                </p>
                {item.nota && <p><em>Nota: {item.nota}</em></p>}
                <button onClick={() => eliminarDelCarrito(i)} style={{ background: '#e60000', color: '#fff', border: 'none', padding: '.3rem .6rem', borderRadius: 4 }}>Eliminar</button>
              </div>
            );
          })}
          <h3>Total: Q{total.toFixed(2)}</h3>
          <button onClick={() => setMostrarMesaModal(true)} style={{ width: '100%', padding: '1rem', background: '#006666', color: '#fff', border: 'none', borderRadius: 6, marginTop: '1rem' }}>
            {ordenEditId ? 'Anexar a la orden' : 'Crear orden'}
          </button>
        </div>
      </div>

      {/* Modal nota */}
      {mostrarNotas && (
        <div style={modalStyle}>
          <div style={{ ...modalContent, borderRight: '4px solid #fff' }}>
            <h3>Agregar nota</h3>
            <textarea
              value={notaTemporal}
              onChange={(e) => setNotaTemporal(e.target.value)}
              placeholder="Ej: Sin cebolla, extra salsa..."
              style={{ width: '100%', height: 100, padding: '1rem', fontSize: '1rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button onClick={() => setMostrarNotas(false)} style={{ padding: '.6rem 1.2rem', background: '#ccc', color: '#000', border: 'none', borderRadius: 6 }}>Cancelar</button>
              <button onClick={confirmarNota} style={{ padding: '.6rem 1.2rem', background: '#004d4d', color: '#fff', border: 'none', borderRadius: 6 }}>Añadir al carrito</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal mesa */}
      {mostrarMesaModal && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3>{ordenEditId ? `Confirmar mesa (Orden ${ordenEditCodigo})` : 'Asignar mesa'}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', margin: '1rem 0' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setMesaSeleccionada(i + 1)}
                  style={{
                    width: 50, height: 50,
                    backgroundColor: mesaSeleccionada === i + 1 ? '#004d4d' : '#ccc',
                    color: mesaSeleccionada === i + 1 ? '#fff' : '#000',
                    border: 'none', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer'
                  }}
                >{i + 1}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setMostrarMesaModal(false)} style={{ padding: '.6rem 1.2rem', background: '#ccc', color: '#333', border: 'none', borderRadius: 6 }}>Cancelar</button>
              <button onClick={enviarOrden} style={{ padding: '.8rem 2rem', background: '#006666', color: '#fff', border: 'none', borderRadius: 6 }}>
                {ordenEditId ? 'Anexar ítems' : 'Enviar orden'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 };
const modalContent = { background: '#fff', padding: '2rem', borderRadius: 10, width: 400, maxWidth: '90vw', boxSizing: 'border-box' };

export default VistaMesero;
