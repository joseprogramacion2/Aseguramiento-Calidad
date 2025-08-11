// frontend/src/pages/VistaMesero.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTopBar from '../components/PageTopBar';

const API = 'http://localhost:3001';
const FALLBACK_IMG = '/no-image.png';

function makeUid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export default function VistaMesero() {
  const [categorias, setCategorias] = useState([]);
  const [platillos, setPlatillos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // cada línea del carrito: { uid, id, nombre, precio, tipo: 'PLATILLO'|'BEBIDA', nota, cantidad }
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
    const u = JSON.parse(localStorage.getItem('usuario'));
    const role = String(u?.rol?.nombre || '').trim().toUpperCase();
    if (!u || role !== 'MESERO') {
      navigate('/login', { replace: true });
      return;
    }
    obtenerCategorias();
    obtenerPlatillos();

    // Cargar "orden en edición" si viene de OrdenesMesero → Editar
    const raw = localStorage.getItem('ordenEnEdicion');
    if (raw) {
      try {
        const ord = JSON.parse(raw);
        setOrdenEditId(ord.id);
        setOrdenEditCodigo(ord.codigo || `#${ord.id}`);
        setMesaSeleccionada(ord.mesa || null);

        // Importante: traer los items existentes respetando tipo (PLATILLO/BEBIDA)
        const pre = (ord.items || []).map((it) => ({
          uid: makeUid(),
          id: it.platilloId || it.id || 0,
          nombre: it.nombre,
          precio: it.precio,
          nota: it.nota || '',
          cantidad: 1,
          tipo: it.tipo === 'BEBIDA' ? 'BEBIDA' : 'PLATILLO',
        }));
        setCarrito(pre);
      } catch {}
    }
  }, [navigate]);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get(`${API}/categorias`);
      setCategorias(res.data || []);
      if (res.data?.length) setCategoriaSeleccionada(res.data[0].id);
    } catch (error) {
      console.error('categorias', error);
    }
  };

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get(`${API}/platillos`);
      setPlatillos((res.data || []).filter((p) => p.disponible));
    } catch (error) {
      console.error('platillos', error);
    }
  };

  // ===== Agregar rápido o con nota =====
  const agregarDirecto = (p, tipo = 'PLATILLO') => {
    setCarrito((prev) => {
      // agrupar si ya existe (mismo item, sin nota, mismo tipo)
      const idx = prev.findIndex(
        (it) => it.id === p.id && (it.nota || '') === '' && it.tipo === tipo
      );
      if (idx >= 0) {
        const copia = [...prev];
        copia[idx] = { ...copia[idx], cantidad: (copia[idx].cantidad || 1) + 1 };
        return copia;
      }
      return [
        ...prev,
        {
          uid: makeUid(),
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          nota: '',
          cantidad: 1,
          tipo,
        },
      ];
    });
  };

  const agregarConNota = (p, tipo = 'PLATILLO') => {
    setPlatilloActual({ ...p, tipo });
    setNotaTemporal('');
    setMostrarNotas(true);
  };

  const confirmarNota = () => {
    if (!platilloActual) return;
    const notaLimpia = (notaTemporal || '').trim();
    setCarrito((prev) => [
      ...prev,
      {
        uid: makeUid(),
        id: platilloActual.id,
        nombre: platilloActual.nombre,
        precio: platilloActual.precio,
        nota: notaLimpia,
        cantidad: 1,
        tipo: platilloActual.tipo || 'PLATILLO',
      },
    ]);
    setMostrarNotas(false);
    setPlatilloActual(null);
    setNotaTemporal('');
  };

  // ===== Handlers por UID (arregla eliminar/mover/±1) =====
  const eliminarPorUid = (uid) => {
    setCarrito((prev) => prev.filter((x) => x.uid !== uid));
  };

  const incPorUid = (uid) => {
    setCarrito((prev) =>
      prev.map((x) => (x.uid === uid ? { ...x, cantidad: (x.cantidad || 1) + 1 } : x))
    );
  };

  const decPorUid = (uid) => {
    setCarrito((prev) =>
      prev.map((x) =>
        x.uid === uid ? { ...x, cantidad: Math.max(1, (x.cantidad || 1) - 1) } : x
      )
    );
  };

  const moverATipo = (uid, nuevoTipo) => {
    setCarrito((prev) => prev.map((x) => (x.uid === uid ? { ...x, tipo: nuevoTipo } : x)));
  };

  // ===== Drag & Drop =====
  const onDragStart = (p, tipoDefault = 'PLATILLO') => (e) => {
    e.dataTransfer.setData('app/pizza', JSON.stringify({ ...p, tipo: tipoDefault }));
  };
  const allowDrop = (e) => e.preventDefault();
  const onDropEn = (tipo) => (e) => {
    e.preventDefault();
    try {
      const p = JSON.parse(e.dataTransfer.getData('app/pizza'));
      if (!p) return;
      agregarDirecto(p, tipo);
    } catch {}
  };

  // ===== Enviar orden =====
  const total = useMemo(
    () => carrito.reduce((s, it) => s + it.precio * (it.cantidad || 1), 0),
    [carrito]
  );

  const enviarOrden = async () => {
    if (!mesaSeleccionada) return alert('Selecciona una mesa');
    if (carrito.length === 0) return alert('Agrega productos');

    // expandir por cantidad; respetar tipo/nota
    const itemsPlano = carrito.flatMap((item) => {
      const cantidad = item.cantidad || 1;
      const nota = (item.nota || '').trim();
      return Array.from({ length: cantidad }).map(() => ({
        nombre: item.nombre,
        precio: item.precio,
        nota: nota === '' ? null : nota,
        tipo: item.tipo === 'BEBIDA' ? 'BEBIDA' : 'PLATILLO',
      }));
    });

    try {
      if (ordenEditId) {
        await axios.post(`${API}/ordenes/${ordenEditId}/items`, { items: itemsPlano });
        alert(`Ítems añadidos a la orden ${ordenEditCodigo}`);
        localStorage.removeItem('ordenEnEdicion');
      } else {
        await axios.post(`${API}/ordenes`, {
          mesa: mesaSeleccionada,
          meseroId: usuario.id,
          items: itemsPlano,
        });
        alert('Orden enviada exitosamente');
      }
      // limpiar y salir
      setCarrito([]);
      setMesaSeleccionada(null);
      setMostrarMesaModal(false);
      setOrdenEditId(null);
      setOrdenEditCodigo(null);
      navigate('/mesero/ordenes');
    } catch (error) {
      console.error('enviar orden', error);
      alert(error?.response?.data?.error || 'Error al enviar la orden');
    }
  };

  // ===== UI =====
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Segoe UI, sans-serif',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <PageTopBar title={ordenEditId ? 'Generar Orden (Edición)' : 'Generar Orden'} backTo="/panel" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        {/* Sidebar IZQ: Categorías */}
        <div style={{ flex: '0 0 260px', padding: '1rem', borderRight: '2px solid #ccc', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Categorías</h2>
          {categorias.map((cat) => (
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
                cursor: 'pointer',
              }}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Centro: Tarjetas de productos */}
        <div style={{ flex: '1 1 auto', minWidth: 0, padding: '1rem', overflowY: 'auto' }}>
          {ordenEditId && (
            <div
              style={{
                background: '#fff8e1',
                border: '1px solid #ffecb3',
                padding: '.6rem 1rem',
                borderRadius: 8,
                marginBottom: '1rem',
              }}
            >
              <strong>Editando</strong> la orden <b>{ordenEditCodigo}</b>. Lo anexado se sumará a esa orden.
            </div>
          )}

          <h2>Platillos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {platillos
              .filter((p) => p.categoria?.id === categoriaSeleccionada)
              .map((p) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={onDragStart(p, 'PLATILLO')}
                  style={{
                    background: '#fff',
                    padding: '1rem',
                    borderRadius: 10,
                    boxShadow: '0 2px 6px rgba(0,0,0,.1)',
                    cursor: 'grab',
                  }}
                >
                  <img
                    src={p.imagenUrl || FALLBACK_IMG}
                    alt={p.nombre}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                    style={{
                      width: '100%',
                      height: 140,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginBottom: '1rem',
                      display: 'block',
                    }}
                  />
                  <h4 style={{ margin: 0 }}>{p.nombre}</h4>
                  <p style={{ marginTop: '.3rem' }}>Q{Number(p.precio).toFixed(2)}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => agregarDirecto(p, 'PLATILLO')}
                      style={{ padding: '.5rem .8rem', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 6 }}
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => agregarConNota(p, 'PLATILLO')}
                      style={{ padding: '.5rem .8rem', background: '#334155', color: '#fff', border: 'none', borderRadius: 6 }}
                    >
                      Agregar con nota
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Panel derecha: Pedido con 2 zonas drop + header sticky con Enviar */}
        <div style={{ flex: '0 0 420px', padding: '0', borderLeft: '2px solid #ccc', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          {/* Header sticky sin select; muestra chip de mesa + total + botón para abrir modal */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 5,
              background: '#fff',
              borderBottom: '1px solid #e5e7eb',
              padding: '0.8rem 1rem',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <strong>Mesa:</strong>
              {mesaSeleccionada ? (
                <span style={chipMesa}>#{mesaSeleccionada}</span>
              ) : (
                <span style={{ color: '#64748b' }}>sin asignar</span>
              )}
              <span style={{ marginLeft: 8, color: '#334155', fontWeight: 700 }}>Total: Q{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setMostrarMesaModal(true)}
              style={{ padding: '.6rem 1rem', background: '#006666', color: '#fff', border: 'none', borderRadius: 6 }}
            >
              {ordenEditId ? 'Anexar a la orden' : 'Enviar orden'}
            </button>
          </div>

          {/* Cuerpo scrollable */}
          <div style={{ padding: '1rem', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0 }}>Pedido</h2>

            <div style={{ display: 'grid', gap: 12 }}>
              {/* Zona platillos */}
              <div
                onDragOver={allowDrop}
                onDrop={onDropEn('PLATILLO')}
                style={{ background: '#f1f5f9', border: '2px dashed #0f766e', minHeight: 120, borderRadius: 10, padding: 10 }}
              >
                <h3 style={{ marginTop: 0 }}>🍽️ Platillos (para cocina)</h3>
                {carrito.filter((i) => i.tipo === 'PLATILLO').length === 0 ? (
                  <p style={{ margin: 0, color: '#64748b' }}>Arrastra aquí o usa “Agregar”.</p>
                ) : (
                  carrito
                    .filter((i) => i.tipo === 'PLATILLO')
                    .map((item) => {
                      const cant = item.cantidad || 1;
                      const sub = item.precio * cant;
                      return (
                        <div key={item.uid} style={{ marginBottom: '0.6rem', background: '#e2e8f0', padding: '0.6rem', borderRadius: 8 }}>
                          <strong>
                            {item.nombre}
                            {cant > 1 ? ` x${cant}` : ''}
                          </strong>
                          <div>Q{item.precio.toFixed(2)}{cant > 1 ? ` • Subtotal: Q${sub.toFixed(2)}` : ''}</div>
                          {item.nota && (
                            <div>
                              <em>Nota: {item.nota}</em>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                            <button onClick={() => incPorUid(item.uid)}>+1</button>
                            <button onClick={() => decPorUid(item.uid)}>-1</button>
                            <button
                              onClick={() => eliminarPorUid(item.uid)}
                              style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4, padding: '.2rem .5rem' }}
                            >
                              Eliminar
                            </button>
                            <button onClick={() => moverATipo(item.uid, 'BEBIDA')}>→ Bebidas</button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              {/* Zona bebidas */}
              <div
                onDragOver={allowDrop}
                onDrop={onDropEn('BEBIDA')}
                style={{ background: '#fef3c7', border: '2px dashed #ea580c', minHeight: 120, borderRadius: 10, padding: 10 }}
              >
                <h3 style={{ marginTop: 0 }}>🥤 Bebidas (las prepara el mesero)</h3>
                {carrito.filter((i) => i.tipo === 'BEBIDA').length === 0 ? (
                  <p style={{ margin: 0, color: '#a16207' }}>Arrastra aquí si es bebida.</p>
                ) : (
                  carrito
                    .filter((i) => i.tipo === 'BEBIDA')
                    .map((item) => {
                      const cant = item.cantidad || 1;
                      const sub = item.precio * cant;
                      return (
                        <div key={item.uid} style={{ marginBottom: '0.6rem', background: '#fde68a', padding: '0.6rem', borderRadius: 8 }}>
                          <strong>
                            {item.nombre}
                            {cant > 1 ? ` x${cant}` : ''}
                          </strong>
                          <div>Q{item.precio.toFixed(2)}{cant > 1 ? ` • Subtotal: Q${sub.toFixed(2)}` : ''}</div>
                          {item.nota && (
                            <div>
                              <em>Nota: {item.nota}</em>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                            <button onClick={() => incPorUid(item.uid)}>+1</button>
                            <button onClick={() => decPorUid(item.uid)}>-1</button>
                            <button
                              onClick={() => eliminarPorUid(item.uid)}
                              style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4, padding: '.2rem .5rem' }}
                            >
                              Eliminar
                            </button>
                            <button onClick={() => moverATipo(item.uid, 'PLATILLO')}>→ Platillos</button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal nota — simétrico */}
      {mostrarNotas && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Agregar nota</h3>
            <textarea
              value={notaTemporal}
              onChange={(e) => setNotaTemporal(e.target.value)}
              placeholder="Ej: Sin cebolla, extra salsa…"
              style={textarea}
            />
            <div style={modalActions}>
              <button onClick={() => setMostrarNotas(false)} style={btnGhost}>
                Cancelar
              </button>
              <button onClick={confirmarNota} style={btnConfirm}>
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal mesa */}
      {mostrarMesaModal && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>
              {ordenEditId ? `Confirmar mesa (Orden ${ordenEditCodigo})` : 'Asignar mesa'}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', margin: '1rem 0' }}>
              {Array.from({ length: 20 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setMesaSeleccionada(i + 1)}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: mesaSeleccionada === i + 1 ? '#004d4d' : '#ccc',
                    color: mesaSeleccionada === i + 1 ? '#fff' : '#000',
                    border: 'none',
                    borderRadius: '50%',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setMostrarMesaModal(false)} style={btnGhost}>
                Cancelar
              </button>
              <button onClick={enviarOrden} style={btnConfirm}>
                {ordenEditId ? 'Anexar ítems' : 'Enviar orden'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Estilos =====
const chipMesa = {
  background: '#e0f2fe',
  color: '#075985',
  padding: '2px 8px',
  borderRadius: 999,
  fontWeight: 700
};

const modalStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

// Caja del modal simétrica (mismos paddings en todos lados)
const modalContent = {
  background: '#fff',
  padding: '24px',
  borderRadius: 12,
  width: 460,
  maxWidth: '92vw',
  boxSizing: 'border-box',
  boxShadow: '0 12px 32px rgba(0,0,0,.18)'
};

const textarea = {
  width: '100%',
  minHeight: 120,
  padding: '12px',
  fontSize: '1rem',
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  outline: 'none',
  resize: 'vertical',
  boxSizing: 'border-box'
};

const modalActions = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px'
};

const btnGhost = {
  padding: '.6rem 1.2rem',
  background: '#e5e7eb',
  color: '#111827',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  cursor: 'pointer'
};

const btnConfirm = {
  padding: '.6rem 1.2rem',
  background: '#004d4d',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  cursor: 'pointer'
};
