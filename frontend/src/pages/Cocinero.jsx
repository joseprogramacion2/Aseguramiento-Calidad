// frontend/src/pages/Cocinero.jsx
import React, { useEffect, useMemo, useState, useRef } from 'react';
import axios from 'axios';
import PageTopBar from '../components/PageTopBar';

const API = 'http://localhost:3001';
const COCINA = `${API}/cocina`;

export default function Cocinero() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const chefId = usuario?.id;

  const [view, setView] = useState('activos'); // 'activos' | 'historial'
  const [actual, setActual] = useState(null);
  const [cola, setCola] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const timerRef = useRef(null);
  const hbRef = useRef(null);
  const autoRef = useRef(false); // evita bucle de auto-aceptar

  const puedeAceptar = useMemo(() => !actual && cola.length > 0, [actual, cola]);

  async function heartbeat() {
    if (!chefId) return;
    try { await axios.post(`${COCINA}/heartbeat`, { chefId }); } catch {}
  }

  async function cargarActivos() {
    if (!chefId) return;
    try {
      setCargando(true);
      const { data } = await axios.get(`${COCINA}/mis`, {
        params: { chefId },
        headers: { 'x-chef-id': String(chefId) }
      });
      setActual(data.actual || null);
      setCola(Array.isArray(data.cola) ? data.cola : []);

      // Respaldo: si el server aún no promovió, auto-acepta el primero de la cola una sola vez
      if (!autoRef.current && !data.actual && (data.cola?.length || 0) > 0) {
        autoRef.current = true;
        try {
          await axios.post(`${COCINA}/items/${data.cola[0].id}/aceptar`, { chefId });
          const again = await axios.get(`${COCINA}/mis`, { params: { chefId } });
          setActual(again.data.actual || null);
          setCola(Array.isArray(again.data.cola) ? again.data.cola : []);
        } catch {}
      }
    } catch (e) {
      console.error('[COCINA/mis] error', e?.response?.data || e?.message);
    } finally {
      setCargando(false);
    }
  }

  async function cargarHistorial() {
    if (!chefId) return;
    try {
      setCargando(true);
      const { data } = await axios.get(`${COCINA}/historial`, { params: { chefId } });
      setHistorial(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('[COCINA/historial] error', e?.response?.data || e?.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    if (!chefId) return;

    heartbeat();

    if (view === 'activos') {
      cargarActivos();
      timerRef.current = setInterval(cargarActivos, 10000);
    } else {
      cargarHistorial();
    }

    hbRef.current = setInterval(heartbeat, 30000);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(hbRef.current);
      axios.post(`${COCINA}/desactivar`, { chefId }).catch(() => {});
    };
  }, [chefId, view]);

  async function aceptar(itemId) {
    try {
      await axios.post(`${COCINA}/items/${itemId}/aceptar`, { chefId });
      autoRef.current = true;
      await cargarActivos();
    } catch (e) {
      alert(e?.response?.data?.error || 'No se pudo aceptar este platillo');
    }
  }

  async function rechazar(itemId) {
    if (!window.confirm('¿Rechazar este platillo y reasignarlo?')) return;
    try {
      await axios.post(`${COCINA}/items/${itemId}/rechazar`, { chefId });
      autoRef.current = false;
      await cargarActivos();
    } catch (e) {
      alert(e?.response?.data?.error || 'No se pudo rechazar');
    }
  }

  async function listo(itemId) {
    try {
      await axios.patch(`${COCINA}/items/${itemId}/listo`);
      autoRef.current = false; // permite promover el siguiente
      await cargarActivos();   // el server ya promueve el siguiente; esto refresca
    } catch {
      alert('No se pudo marcar como listo');
    }
  }

  const Tabs = () => (
    <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
      <button
        onClick={() => setView('activos')}
        style={view === 'activos' ? tabActive : tab}
      >
        Activos / Cola
      </button>
      <button
        onClick={() => setView('historial')}
        style={view === 'historial' ? tabActive : tab}
      >
        Historial preparados
      </button>
    </div>
  );

  const Card = ({ item, acciones }) => {
    const espera = item?.esperaMin ?? 0;
    return (
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <strong style={{ fontSize: 20 }}>{item?.nombre}</strong>
          <span style={chipTiempo}>⏱ {espera} min</span>
        </div>
        <div style={{ color: '#334155', fontSize: 16, marginBottom: 6 }}>
          Orden <b>{item?.orden?.codigo}</b> • Mesa <b>{item?.orden?.mesa}</b>
        </div>
        {item?.nota && (
          <div style={notaBox}>Nota: {item.nota}</div>
        )}
        {acciones}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopBar title="Cocina" backTo="/panel" />
      {!chefId && <div style={{ padding: 16, color: '#b91c1c' }}>No se encontró tu sesión de cocinero. Vuelve a iniciar sesión.</div>}

      <Tabs />

      {view === 'activos' ? (
        <div style={{ padding: '0 1rem 1rem', display: 'grid', gap: 16 }}>
          {/* En preparación (sticky) */}
          <div style={{ position: 'sticky', top: 96, zIndex: 3, background: '#fff' }}>
            <section style={section}>
              <h2 style={h2}>En preparación</h2>
              {actual ? (
                <Card
                  item={actual}
                  acciones={
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <button style={btnListo} onClick={() => listo(actual.id)}>✅ Listo</button>
                      <button style={btnDanger} onClick={() => rechazar(actual.id)}>↩ Rechazar</button>
                    </div>
                  }
                />
              ) : (
                <div style={emptyBox}>No estás preparando nada ahora.</div>
              )}
            </section>
          </div>

          {/* Cola personal */}
          <section style={section}>
            <h2 style={h2}>Siguientes platillos</h2>
            {cargando ? (
              <div style={emptyBox}>Cargando…</div>
            ) : cola.length === 0 ? (
              <div style={emptyBox}>Sin pendientes asignados.</div>
            ) : (
              <div style={grid}>
                {cola.map((it) => (
                  <Card
                    key={it.id}
                    item={it}
                    acciones={
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button style={btnPrimary} onClick={() => aceptar(it.id)} disabled={!!actual}>
                          Aceptar
                        </button>
                        <button style={btnDanger} onClick={() => rechazar(it.id)}>
                          Rechazar
                        </button>
                      </div>
                    }
                  />
                ))}
              </div>
            )}
            {!actual && cola.length > 0 && (
              <div style={{ marginTop: 10, color: '#64748b', fontSize: 14 }}>
                Sugerencia: acepta el más antiguo primero. (Se auto-acepta si estás libre)
              </div>
            )}
          </section>
        </div>
      ) : (
        <div style={{ padding: '0 1rem 1rem' }}>
          <section style={section}>
            <h2 style={h2}>Historial de preparados</h2>
            {cargando ? (
              <div style={emptyBox}>Cargando…</div>
            ) : historial.length === 0 ? (
              <div style={emptyBox}>Aún no tienes platillos preparados.</div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {historial.map(it => (
                  <div key={it.id} style={row}>
                    <div><b>{it.nombre}</b> • Orden <b>{it?.orden?.codigo}</b> • Mesa <b>{it?.orden?.mesa}</b></div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>
                      Finalizado: {new Date(it.finalizadoEn || it.creadoEn).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

const section = { background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' };
const h2 = { margin: '0 0 12px', color: '#0f172a', fontSize: 22 };
const emptyBox = { background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 12, padding: '16px 14px', color: '#64748b', fontSize: 16 };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 };

const card = {
  background: '#fdfdfd',
  border: '1px solid #e2e8f0',
  borderRadius: 14,
  padding: 14,
  boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
};
const chipTiempo = { background: '#e0f2fe', color: '#075985', padding: '4px 8px', borderRadius: 999, fontWeight: 700, fontSize: 14 };
const btnPrimary = { background: '#0f766e', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: 'pointer' };
const btnDanger = { background: '#dc2626', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: 'pointer' };
const btnListo = { background: '#16a34a', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: 'pointer' };
const tab = { background: '#e5e7eb', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' };
const tabActive = { ...tab, background: '#0ea5e9', color: '#fff' };
const row = { padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 10, background: '#f8fafc' };
const notaBox = { background: '#fff7ed', border: '1px dashed #f59e0b', color: '#92400e', padding: '8px 10px', borderRadius: 8, fontSize: 16, marginBottom: 10 };
