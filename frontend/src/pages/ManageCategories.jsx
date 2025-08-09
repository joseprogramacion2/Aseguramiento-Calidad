// src/pages/ManageCategories.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

const API = 'http://localhost:3001';

const ManageCategories = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerCategorias = async () => {
    try {
      setCargando(true);
      const { data } = await axios.get(`${API}/categorias`);
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      setMensaje('❌ Error al obtener categorías');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      await axios.post(`${API}/categorias`, { nombre: nombre.trim() });
      setMensaje('✅ Categoría creada exitosamente');
      setNombre('');
      obtenerCategorias();
    } catch (error) {
      console.error('Error:', error);
      setMensaje(error.response?.data?.error || '❌ Error al crear la categoría');
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    try {
      await axios.delete(`${API}/categorias/${id}`);
      setMensaje('✅ Categoría eliminada');
      // Optimista: quitamos sin reconsultar (y luego revalidamos en background)
      setCategorias((prev) => prev.filter((c) => c.id !== id));
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMensaje(error.response?.data?.error || '❌ No se pudo eliminar la categoría');
    }
  };

  /* ===== Estilos coherentes y “pegados” ===== */
  const page = {
    minHeight: '100vh',
    backgroundColor: '#f3f6f7',
    fontFamily: 'Segoe UI, sans-serif'
  };

  const wrap = {
    padding: '20px 24px 28px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 16,
    alignItems: 'start'
  };

  const card = {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
  };

  const inputStyle = {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    background: '#fff'
  };

  const buttonPrimary = {
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#006666',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const buttonDanger = {
    backgroundColor: '#e11d48',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.7rem',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer'
  };

  const empty = {
    padding: '0.75rem',
    color: '#64748b',
    background: '#f1f5f9',
    borderRadius: 8,
    textAlign: 'center'
  };

  return (
    <div style={page}>
      {/* Topbar pegado, coherente con las otras vistas */}
      <AdminHeader titulo="📂 Gestión de Categorías" />

      <div style={wrap}>
        {/* Crear categoría */}
        <section style={card}>
          <h2 style={{ marginTop: 0, marginBottom: 12, color: '#1e293b' }}>Crear nueva categoría</h2>

          <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la categoría"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonPrimary}>Crear Categoría</button>
          </form>

          {mensaje && (
            <p style={{ marginTop: 12, fontWeight: 'bold' }}>{mensaje}</p>
          )}
        </section>

        {/* Lista de categorías */}
        <section style={card}>
          <h3 style={{ marginTop: 0, marginBottom: 12, color: '#1e293b' }}>Categorías existentes</h3>

          {cargando ? (
            <div style={empty}>Cargando…</div>
          ) : categorias.length === 0 ? (
            <div style={empty}>No hay categorías registradas.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categorias.map((cat) => (
                <li
                  key={cat.id}
                  style={{
                    padding: '0.6rem 0',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <span>{cat.nombre}</span>
                  
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ManageCategories;
