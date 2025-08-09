// src/pages/MenuAdmin.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

const API = 'http://localhost:3001';

function MenuAdmin() {
  const [platillos, setPlatillos] = useState([]);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState({}); // { nombreCat: bool }

  useEffect(() => {
    obtenerPlatillos();
  }, []);

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get(`${API}/platillos`);
      setPlatillos(res.data);
    } catch (error) {
      console.error('Error al obtener el menú:', error);
      alert('No se pudo cargar el menú.');
    }
  };

  // Agrupar por nombre de categoría
  const platillosPorCategoria = useMemo(
    () =>
      platillos.reduce((grupos, p) => {
        const cat = typeof p.categoria?.nombre === 'string' ? p.categoria.nombre : 'Sin categoría';
        (grupos[cat] = grupos[cat] || []).push(p);
        return grupos;
      }, {}),
    [platillos]
  );

  const categoriasOrdenadas = useMemo(
    () => Object.keys(platillosPorCategoria).sort(),
    [platillosPorCategoria]
  );

  // Abrir categorías por defecto al cargar datos
  useEffect(() => {
    if (categoriasOrdenadas.length === 0) return;
    setCategoriasAbiertas((prev) => {
      // si ya hay estado previo, lo conservamos
      if (Object.keys(prev).length) return prev;
      const abierto = {};
      categoriasOrdenadas.forEach((c) => (abierto[c] = true));
      return abierto;
    });
  }, [categoriasOrdenadas]);

  const toggleCategoria = (cat) =>
    setCategoriasAbiertas((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const abrirTodas = () =>
    setCategoriasAbiertas(Object.fromEntries(categoriasOrdenadas.map((c) => [c, true])));

  const cerrarTodas = () =>
    setCategoriasAbiertas(Object.fromEntries(categoriasOrdenadas.map((c) => [c, false])));

  const money = (v) => {
    const n = Number(v ?? 0);
    return `Q${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`;
    // Si prefieres separadores: n.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' })
  };

  /* ===== estilos coherentes y “pegados” ===== */
  const page = {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f3f6f7',
    minHeight: '100vh'
  };

  const wrap = {
    padding: '20px 24px 28px',
    display: 'grid',
    gap: 16
  };

  const h3Cat = {
    margin: '0 0 12px',
    borderBottom: '2px solid #006666',
    paddingBottom: 8,
    color: '#006666',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const gridCards = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '14px'
  };

  const card = {
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eee'
  };

  const imgBox = { width: '100%', height: 150, background: '#f2f2f2' };

  const pricePill = {
    background: '#0f766e',
    color: '#fff',
    borderRadius: 8,
    padding: '2px 8px',
    fontWeight: 700,
    fontSize: 13,
    whiteSpace: 'nowrap',
    alignSelf: 'flex-start'
  };

  const toolsRow = {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const btnGhost = {
    background: '#e2e8f0',
    border: 'none',
    color: '#0f172a',
    padding: '6px 10px',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer'
  };

  return (
    <div style={page}>
      <AdminHeader titulo="📋 Menú del Restaurante" />

      <div style={wrap}>
        {/* Herramientas globales */}
        <div style={toolsRow}>
          <button onClick={abrirTodas} style={btnGhost}>Abrir todas</button>
          <button onClick={cerrarTodas} style={btnGhost}>Cerrar todas</button>
        </div>

        {/* Secciones por categoría */}
        {categoriasOrdenadas.map((cat) => (
          <section key={cat}>
            <h3 onClick={() => toggleCategoria(cat)} style={h3Cat} title="Mostrar/ocultar categoría">
              {cat}
              <span style={{ fontSize: 18 }}>{categoriasAbiertas[cat] ? '🔽' : '▶️'}</span>
            </h3>

            {categoriasAbiertas[cat] && (
              <div style={gridCards}>
                {platillosPorCategoria[cat].map((p) => (
                  <article key={p.id} style={card}>
                    {/* Imagen del platillo */}
                    <div style={imgBox}>
                      {p.imagenUrl ? (
                        <img
                          src={p.imagenUrl}
                          alt={p.nombre}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={(e) => {
                            e.currentTarget.src = '';
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                            fontSize: 13
                          }}
                        >
                          Sin imagen
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: '0.9rem 1rem 1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.2 }}>{p.nombre}</h4>
                        <span style={pricePill}>{money(p.precio)}</span>
                      </div>

                      <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
                        {p.categoria?.nombre || 'Sin categoría'}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default MenuAdmin;
