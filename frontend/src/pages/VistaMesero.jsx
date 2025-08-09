// VistaMesero.jsx
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    // Cargar contexto de edición si viene de "Agregar" en OrdenesMesero
    const raw = localStorage.getItem('ordenEnEdicion');
    if (raw) {
      try {
        const ord = JSON.parse(raw);
        setOrdenEditId(ord.id);
        setOrdenEditCodigo(ord.codigo || `#${ord.id}`);
        setMesaSeleccionada(ord.mesa || null);
        // Precargar carrito desde items existentes (cada línea = 1, respeta nota)
        const pre = (ord.items || []).map(it => ({
          id: it.platilloId || 0, // si no lo tienes, no pasa nada para UI
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
      setPlatillos((res.data || []).filter(p => p.disponible));
    } catch (error) { console.error('Error al obtener platillos:', error); }
  };

  const seleccionarPlatillo = (platillo) => { setPlatilloActual(platillo); setNotaTemporal(''); setMostrarNotas(true); };

  // Agrupar solo sin nota
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
  const cerrarSesion = () => { localStorage.removeItem('usuario'); navigate('/'); };

  const total = useMemo(() => carrito.reduce((s, it) => s + it.precio * (it.cantidad || 1), 0), [carrito]);

  // Envío: si hay orden en edición, intentar agregar ítems a esa orden
  const enviarOrden = async () => {
    if (!mesaSeleccionada) return alert('Selecciona una mesa');
    if (carrito.length === 0) return alert('Agrega platillos al pedido');

    // aplanar al formato viejo
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
        // endpoint sugerido para anexar items a una orden existente
        await axios.post(`http://localhost:3001/ordenes/${ordenEditId}/items`, { items: itemsPlano });
        alert(`Ítems añadidos a la orden ${ordenEditCodigo}`);
        localStorage.removeItem('ordenEnEdicion');
      } else {
        // crear orden nueva (formato antiguo)
        await axios.post('http://localhost:3001/ordenes', {
          mesa: mesaSeleccionada,
          meseroId: usuario.id,
          items: itemsPlano
        });
        alert('Orden enviada exitosamente');
      }

      setCarrito([]);
      setMesaSeleccionada(null);
      setMostrarMesaModal(false);
      setOrdenEditId(null);
      setOrdenEditCodigo(null);
      navigate('/mesero/ordenes');
    } catch (error) {
      // fallback: si no existe el endpoint /ordenes/:id/items, intenta crear nueva
      if (ordenEditId) {
        console.error('Fallo añadir a orden existente, intento crear nueva:', error);
        try {
          await axios.post('http://localhost:3001/ordenes', {
            mesa: mesaSeleccionada,
            meseroId: usuario.id,
            items: itemsPlano
          });
          alert('No existía el endpoint de anexar. Se creó una nueva orden con esos ítems.');
          localStorage.removeItem('ordenEnEdicion');
          setOrdenEditId(null);
          setOrdenEditCodigo(null);
          navigate('/mesero/ordenes');
          return;
        } catch (e2) {
          console.error('Error al enviar orden (fallback):', e2);
        }
      }
      console.error('Error al enviar orden:', error);
      alert('Error al enviar la orden');
    }
  };

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', fontFamily:'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width:'18%', padding:'1rem', borderRight:'2px solid #ccc' }}>
        <h2 style={{ fontSize:'1.2rem' }}>Categorías</h2>
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            style={{
              display:'block', width:'100%', marginBottom:'.8rem', padding:'.6rem',
              fontSize:'1rem', backgroundColor: categoriaSeleccionada===cat.id ? '#004d4d' : '#eee',
              color: categoriaSeleccionada===cat.id ? '#fff' : '#000', border:'none', borderRadius:8, cursor:'pointer'
            }}
          >{cat.nombre}</button>
        ))}
        <button onClick={() => navigate('/mesero/ordenes')} style={{ marginTop:'2rem', width:'100%', padding:'1rem', background:'#006666', color:'#fff', border:'none', borderRadius:6 }}>
          📄 Ver órdenes
        </button>
        <button onClick={cerrarSesion} style={{ marginTop:'1rem', width:'100%', padding:'1rem', background:'#e60000', color:'#fff', border:'none', borderRadius:6 }}>
          Cerrar sesión
        </button>
      </div>

      {/* Centro */}
      <div style={{ width:'60%', padding:'1rem', overflowY:'auto' }}>
        {ordenEditId && (
          <div style={{ background:'#fff8e1', border:'1px solid #ffecb3', padding:'.6rem 1rem', borderRadius:8, marginBottom:'1rem' }}>
            <strong>Editando</strong> la orden <b>{ordenEditCodigo}</b>. Los ítems que agregues se anexarán a esa orden.
          </div>
        )}
        <h2>Platillos</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'1rem' }}>
          {platillos
            .filter(p => p.categoria?.id === categoriaSeleccionada)
            .map(p => (
              <div key={p.id} style={{ background:'#fff', padding:'1rem', borderRadius:10, boxShadow:'0 2px 6px rgba(0,0,0,.1)' }}>
                <div style={{ height:120, background:'#ccc', borderRadius:8, marginBottom:'1rem' }} />
                <h4 style={{ margin:0 }}>{p.nombre}</h4>
                <p style={{ marginTop:'.3rem' }}>Q{Number(p.precio).toFixed(2)}</p>
                <button onClick={() => seleccionarPlatillo(p)} style={{ padding:'.5rem 1rem', background:'#004d4d', color:'#fff', border:'none', borderRadius:5 }}>Agregar</button>
              </div>
            ))}
        </div>
      </div>

      {/* Carrito */}
      <div style={{ width:'22%', padding:'1rem', borderLeft:'2px solid #ccc', height:'100vh', overflowY:'auto', background:'#fff' }}>
        <h2>Pedido</h2>
        {carrito.map((item, i) => {
          const cant = item.cantidad || 1;
          const sub = item.precio * cant;
          return (
            <div key={i} style={{ marginBottom:'1rem', background:'#f1f1f1', padding:'1rem', borderRadius:8 }}>
              <strong>{item.nombre}{cant>1 ? ` x${cant}` : ''}</strong>
              <p style={{ margin:'.25rem 0' }}>
                Q{item.precio.toFixed(2)}{cant>1 ? ` c/u • Subtotal: Q${sub.toFixed(2)}` : ''}
              </p>
              {item.nota && <p><em>Nota: {item.nota}</em></p>}
              <button onClick={() => eliminarDelCarrito(i)} style={{ background:'#e60000', color:'#fff', border:'none', padding:'.3rem .6rem', borderRadius:4 }}>Eliminar</button>
            </div>
          );
        })}
        <h3>Total: Q{total.toFixed(2)}</h3>
        <button onClick={() => setMostrarMesaModal(true)} style={{ width:'100%', padding:'1rem', background:'#006666', color:'#fff', border:'none', borderRadius:6, marginTop:'1rem' }}>
          {ordenEditId ? 'Anexar a la orden' : 'Crear orden'}
        </button>
      </div>

      {/* Modal nota */}
      {mostrarNotas && (
        <div style={modalStyle}>
          <div style={{ ...modalContent, borderRight:'4px solid #fff' }}>
            <h3>Agregar nota</h3>
            <textarea
              value={notaTemporal}
              onChange={(e)=>setNotaTemporal(e.target.value)}
              placeholder="Ej: Sin cebolla, extra salsa..."
              style={{ width:'100%', height:100, padding:'1rem', fontSize:'1rem' }}
            />
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:'1rem' }}>
              <button onClick={()=>setMostrarNotas(false)} style={{ padding:'.6rem 1.2rem', background:'#ccc', color:'#000', border:'none', borderRadius:6 }}>Cancelar</button>
              <button onClick={confirmarNota} style={{ padding:'.6rem 1.2rem', background:'#004d4d', color:'#fff', border:'none', borderRadius:6 }}>Añadir al carrito</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal mesa */}
      {mostrarMesaModal && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3>{ordenEditId ? `Confirmar mesa (Orden ${ordenEditCodigo})` : 'Asignar mesa'}</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', margin:'1rem 0' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setMesaSeleccionada(i + 1)}
                  style={{
                    width:50, height:50,
                    backgroundColor: mesaSeleccionada === i + 1 ? '#004d4d' : '#ccc',
                    color: mesaSeleccionada === i + 1 ? '#fff' : '#000',
                    border:'none', borderRadius:'50%', fontSize:'1.2rem', cursor:'pointer'
                  }}
                >{i + 1}</button>
              ))}
            </div>
            <div style={{ display:'flex', gap:'.5rem', justifyContent:'flex-end' }}>
              <button onClick={()=>setMostrarMesaModal(false)} style={{ padding:'.6rem 1.2rem', background:'#ccc', color:'#333', border:'none', borderRadius:6 }}>Cancelar</button>
              <button onClick={enviarOrden} style={{ padding:'.8rem 2rem', background:'#006666', color:'#fff', border:'none', borderRadius:6 }}>
                {ordenEditId ? 'Anexar ítems' : 'Enviar orden'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = { position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:999 };
const modalContent = { background:'#fff', padding:'2rem', borderRadius:10, width:400, maxWidth:'90%' };

export default VistaMesero;
