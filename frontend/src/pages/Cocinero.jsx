// frontend/src/pages/Cocinero.jsx
import React, { useEffect, useMemo, useState, useRef } from 'react';
import axios from 'axios';
import PageTopBar from '../components/PageTopBar';
import ToastMessage from '../components/ToastMessage';

const API = 'http://localhost:3001';
const COCINA = `${API}/cocina`;
const REFRESH_MS = 7000; // auto-refresh más ágil

// helper duración (se sigue usando en historial agrupado)
const fmtDuration = (sec) => {
  if (!sec || sec <= 0) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
};

export default function Cocinero() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const chefId = usuario?.id;

  const [view, setView] = useState('activos'); // 'activos' | 'historial'
  const [actual, setActual] = useState(null);
  const [cola, setCola] = useState([]);
  const [historial, setHistorial] = useState([]);       // crudo
  const [historialGrp, setHistorialGrp] = useState([]); // agrupado por orden
  const [cargando, setCargando] = useState(true);
  const timerRef = useRef(null);
  const hbRef = useRef(null);
  const autoRef = useRef(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 2800);
  };

  const [confirm, setConfirm] = useState({ open: false, id: null, nombre: '' });
  const abrirConfirmRechazo = (item) => setConfirm({ open: true, id: item.id, nombre: item.nombre });
  const cerrarConfirm = () => setConfirm({ open: false, id: null, nombre: '' });

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

      // auto-acepta el primero si estás libre (una sola vez)
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
      showToast('No se pudo cargar la cola de cocina', 'danger');
    } finally {
      setCargando(false);
    }
  }

  // Agrupa historial por orden para mostrar duración 1 sola vez
  function groupHistorialByOrder(items) {
    const map = new Map();
    (items || []).forEach(it => {
      const ord = it.orden || {};
      const key = ord.id ?? ord.codigo ?? `o-${it.ordenId}`;
      const g = map.get(key) || {
        orderId: ord.id,
        codigo: ord.codigo,
        mesa: ord.mesa,
        finishedAt: ord.finishedAt || null,
        durationSec: ord.durationSec ?? null,
        items: []
      };

      g.items.push({
        id: it.id,
        nombre: it.nombre,
        finalizadoEn: it.finalizadoEn || it.creadoEn
      });

      const cand = it.finalizadoEn || it.creadoEn;
      if (!g.finishedAt || (cand && new Date(cand) > new Date(g.finishedAt))) {
        g.finishedAt = cand;
      }

      if (ord.durationSec != null) g.durationSec = ord.durationSec;

      map.set(key, g);
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.finishedAt) - new Date(a.finishedAt)
    );
  }

  async function cargarHistorial() {
    if (!chefId) return;
    try {
      setCargando(true);
      const { data } = await axios.get(`${COCINA}/historial`, { params: { chefId } });
      const items = Array.isArray(data) ? data : [];
      setHistorial(items);
      setHistorialGrp(groupHistorialByOrder(items));
    } catch (e) {
      console.error('[COCINA/historial] error', e?.response?.data || e?.message);
      showToast('No se pudo cargar el historial', 'danger');
    } finally {
      setCargando(false);
    }
  }

  // Auto-refresh + heartbeat
  useEffect(() => {
    if (!chefId) return;

    heartbeat();

    // limpia intervalos previos
    clearInterval(timerRef.current);
    clearInterval(hbRef.current);

    if (view === 'activos') {
      cargarActivos();
      timerRef.current = setInterval(cargarActivos, REFRESH_MS);
    } else {
      cargarHistorial();
      timerRef.current = setInterval(cargarHistorial, REFRESH_MS);
    }

    hbRef.current = setInterval(heartbeat, 30000);

    // refrescar cuando el tab vuelva a estar visible
    const onVis = () => {
      if (document.visibilityState === 'visible') {
        if (view === 'activos') cargarActivos();
        else cargarHistorial();
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(hbRef.current);
      document.removeEventListener('visibilitychange', onVis);
      axios.post(`${COCINA}/desactivar`, { chefId }).catch(() => {});
    };
  }, [chefId, view]);

  async function aceptar(itemId) {
    try {
      await axios.post(`${COCINA}/items/${itemId}/aceptar`, { chefId });
      autoRef.current = true;
      await cargarActivos();
      showToast('Platillo aceptado. ¡Manos a la obra! 🧑‍🍳', 'success');
    } catch (e) {
      console.error(e);
      showToast(e?.response?.data?.error || 'No se pudo aceptar este platillo', 'danger');
    }
  }

  async function confirmarRechazo() {
    if (!confirm.id) return;
    try {
      await axios.post(`${COCINA}/items/${confirm.id}/rechazar`, { chefId });
      autoRef.current = false;
      await cargarActivos();
      showToast('Platillo rechazado y reasignado', 'success');
    } catch (e) {
      console.error(e);
      showToast(e?.response?.data?.error || 'No se pudo rechazar', 'danger');
    } finally {
      cerrarConfirm();
    }
  }

  async function listo(itemId) {
    try {
      await axios.patch(`${COCINA}/items/${itemId}/listo`);
      autoRef.current = false;
      await cargarActivos();
      showToast('Platillo marcado como listo ✅', 'success');
    } catch {
      showToast('No se pudo marcar como listo', 'danger');
    }
  }

  const Tabs = () => (
    <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
      <button onClick={() => setView('activos')} style={view === 'activos' ? tabActive : tab}>
        Activos / Cola
      </button>
      <button onClick={() => setView('historial')} style={view === 'historial' ? tabActive : tab}>
        Historial preparados
      </button>
    </div>
  );

  // 🔧 SIN el “reloj”: quitamos el chip de tiempo del header
  const Card = ({ item, acciones }) => {
    return (
      <div style={card}>
        <div style={{ marginBottom: 8 }}>
          <strong style={{ fontSize: 20 }}>{item?.nombre}</strong>
        </div>
        <div style={{ color: '#334155', fontSize: 16, marginBottom: 6 }}>
          Orden <b>{item?.orden?.codigo}</b> • Mesa <b>{item?.orden?.mesa}</b>
        </div>
        {item?.nota && <div style={notaBox}>Nota: {item.nota}</div>}
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
                      <button style={btnDanger} onClick={() => abrirConfirmRechazo(actual)}>↩ Rechazar</button>
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
                        <button style={btnDanger} onClick={() => abrirConfirmRechazo(it)}>
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
            ) : historialGrp.length === 0 ? (
              <div style={emptyBox}>Aún no tienes platillos preparados.</div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {historialGrp.map(grp => (
                  <div key={grp.orderId ?? grp.codigo} style={row}>
                    <div>
                      <b>{grp.items.map(i => i.nombre).join(', ')}</b>
                      {' '}• Orden <b>{grp.codigo}</b> • Mesa <b>{grp.mesa}</b>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>
                      Finalizado: {grp.finishedAt ? new Date(grp.finishedAt).toLocaleString() : '—'}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>
                      Duración total: {fmtDuration(grp.durationSec)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <ToastMessage
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

      {confirm.open && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Rechazar platillo</h3>
            <p style={{ marginBottom: 16 }}>
              ¿Rechazar <b>{confirm.nombre}</b> y reasignarlo a otro cocinero?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={cerrarConfirm} style={btnGhost}>Cancelar</button>
              <button onClick={confirmarRechazo} style={btnDanger}>Rechazar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== estilos ===== */
const section = { background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' };
const h2 = { margin: '0 0 12px', color: '#0f172a', fontSize: 22 };
const emptyBox = { background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 12, padding: '16px 14px', color: '#64748b', fontSize: 16 };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 };

const card = { background: '#fdfdfd', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, boxShadow: '0 6px 16px rgba(0,0,0,0.05)' };
// const chipTiempo = { background: '#e0f2fe', color: '#075985', padding: '4px 8px', borderRadius: 999, fontWeight: 700, fontSize: 14 }; // eliminado del UI
const btnPrimary = { background: '#0f766e', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: 'pointer' };
const btnDanger  = { background: '#dc2626', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: 'pointer' };
const btnListo   = { background: '#16a34a', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: 'pointer' };
const tab        = { background: '#e5e7eb', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' };
const tabActive  = { ...tab, background: '#0ea5e9', color: '#fff' };
const row        = { padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 10, background: '#f8fafc' };
const notaBox    = { background: '#fff7ed', border: '1px dashed #f59e0b', color: '#92400e', padding: '8px 10px', borderRadius: 8, fontSize: 16, marginBottom: 10 };

/* Modal styles */
const modalOverlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
};
const modalBox = {
  background: '#fff',
  width: 520,
  maxWidth: '92vw',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 12px 32px rgba(0,0,0,.2)',
  fontFamily: 'Segoe UI, sans-serif',
};
const btnGhost = {
  padding: '.55rem 1rem',
  background: '#e5e7eb',
  color: '#111827',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  cursor: 'pointer',
};
