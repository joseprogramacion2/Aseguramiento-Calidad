// src/pages/Platillos.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Header ya existente
import AdminHeader from '../components/AdminHeader';

// Firebase
import { storage } from '../firebase';
import { ref as storageRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const API = 'http://localhost:3001';

function Platillos() {
  const [platillos, setPlatillos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', precio: '', categoriaId: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // subida de imagen
  const [subiendoId, setSubiendoId] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const fileInputRef = useRef(null);
  const platilloIdParaImagenRef = useRef(null);

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const responsableId = usuarioLogueado?.id;
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPlatillos();
    obtenerCategorias();
  }, []);

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get(`${API}/platillos`);
      setPlatillos(res.data);
    } catch (error) {
      console.error('Error al obtener platillos:', error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get(`${API}/categorias`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const crearPlatillo = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.categoriaId) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      if (modoEdicion) {
        await axios.put(`${API}/platillos/${idEditando}`, {
          ...formData,
          responsableId: responsableId || 1
        });
        alert('Platillo actualizado correctamente');
      } else {
        await axios.post(`${API}/platillos`, formData);
        alert('Platillo registrado correctamente');
      }
      setFormData({ nombre: '', precio: '', categoriaId: '' });
      setModoEdicion(false);
      setIdEditando(null);
      obtenerPlatillos();
    } catch (error) {
      console.error('Error completo:', error);
      alert(error.response?.data?.error || 'Error al guardar platillo');
    }
  };

  const editarPlatillo = (platillo) => {
    setModoEdicion(true);
    setIdEditando(platillo.id);
    setFormData({
      nombre: platillo.nombre,
      precio: platillo.precio,
      categoriaId: platillo.categoria?.id || ''
    });
  };

  const cambiarDisponibilidad = async (id, estadoActual) => {
    const accion = estadoActual ? 'desactivar' : 'activar';
    if (!window.confirm(`¿Deseas ${accion} este platillo?`)) return;
    try {
      await axios.patch(`${API}/platillos/${id}/disponibilidad`, {
        disponible: !estadoActual
      });
      obtenerPlatillos();
      alert(`Platillo ${accion} correctamente`);
    } catch (error) {
      console.error(`Error al ${accion} platillo:`, error);
      alert(`Error al ${accion} el platillo`);
    }
  };

  const eliminarPlatillo = async (id) => {
    if (!window.confirm('¿Deseas eliminar permanentemente este platillo?')) return;
    try {
      await axios.delete(`${API}/platillos/${id}`);
      obtenerPlatillos();
      alert('Platillo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar platillo:', error);
      alert('Error al eliminar el platillo');
    }
  };

  // ---- Subida de imagen ----
  const clickSubirPara = (platilloId) => {
    platilloIdParaImagenRef.current = platilloId;
    fileInputRef.current?.click();
  };

  const onArchivoSeleccionado = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!tiposPermitidos.includes(file.type)) {
      alert(`Formato no permitido (${file.type}). Usa JPG, PNG, WEBP, GIF o SVG.`);
      return;
    }

    const platilloId = platilloIdParaImagenRef.current;
    if (!platilloId) {
      alert('No se seleccionó platillo para la imagen.');
      return;
    }

    try {
      setSubiendoId(platilloId);
      setProgreso(0);

      const nombreSeguro = file.name.replace(/\s+/g, '_');
      const nombreArchivo = `platillos/${platilloId}-${Date.now()}-${nombreSeguro}`;
      const refObj = storageRef(storage, nombreArchivo);

      const task = uploadBytesResumable(refObj, file);
      task.on(
        'state_changed',
        (snap) => setProgreso((snap.bytesTransferred / snap.totalBytes) * 100),
        (err) => {
          console.error('Error Storage:', err);
          alert(err?.message || 'Error subiendo imagen.');
          setSubiendoId(null);
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            await axios.put(`${API}/platillos/${platilloId}/imagen`, {
              url,
              responsableId: responsableId || 1
            });
            await obtenerPlatillos();
            alert('Imagen subida y guardada.');
          } catch (e2) {
            console.error('Error guardando en backend:', e2);
            alert(e2.response?.data?.error || 'Error al guardar imagen en la base de datos.');
          } finally {
            setSubiendoId(null);
            setProgreso(0);
          }
        }
      );
    } catch (err) {
      console.error('Error general en subida:', err);
      alert('Error inesperado subiendo imagen.');
      setSubiendoId(null);
    }
  };

  /* ===== estilos iguales a Usuarios ===== */
  const page = {
    minHeight: '100vh',
    backgroundColor: '#f3f6f7',
    fontFamily: 'Poppins, Segoe UI, sans-serif',
    paddingBottom: 28
  };

  const wrap = {
    padding: '12px 24px 28px',
    display: 'grid',
    gridTemplateColumns: '340px 1fr',
    gap: '24px',
    alignItems: 'start'
  };

  const card = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
  };

  const inputStyle = {
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid #d1d5db',
    outline: 'none',
    backgroundColor: '#f9fafb',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
  };

  const buttonPrimary = {
    backgroundColor: '#0f766e',
    color: '#fff',
    padding: '0.85rem',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const btn = (bg) => ({
    backgroundColor: bg,
    color: '#fff',
    border: 'none',
    padding: '0.5rem 0.9rem',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer'
  });

  return (
    <div style={page}>
      {/* Header ya consistente */}
      <AdminHeader titulo=" 🍽 Platillos por Categoría" />

      {/* input de archivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onArchivoSeleccionado}
      />

      <div style={wrap}>
        {/* CATEGORÍAS */}
        <aside style={card}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {categorias.map((cat) => {
              const active = categoriaSeleccionada === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaSeleccionada(cat.id)}
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: '1.5px solid ' + (active ? '#0d9488' : '#e5e7eb'),
                    background: active ? '#e6fffb' : '#f3f4f6',
                    color: '#334155',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {cat.nombre}
                </button>
              );
            })}
          </div>
        </aside>

        {/* FORM + LISTA */}
        <main style={{ display: 'grid', gap: 24 }}>
          {/* Formulario */}
          <div style={card}>
            <h3 style={{ color: '#1e3d59', marginBottom: 16 }}>
              {modoEdicion ? '✏️ Editar platillo' : '➕ Registrar nuevo platillo'}
            </h3>

            <form onSubmit={crearPlatillo} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del platillo"
                value={formData.nombre}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              <input
                type="number"
                step="0.01"
                name="precio"
                placeholder="Precio"
                value={formData.precio}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              <select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" style={buttonPrimary}>
                  {modoEdicion ? 'Actualizar Platillo' : 'Registrar Platillo'}
                </button>
                {modoEdicion && (
                  <button
                    type="button"
                    onClick={() => { setModoEdicion(false); setIdEditando(null); setFormData({ nombre:'', precio:'', categoriaId:'' }); }}
                    style={{ ...buttonPrimary, backgroundColor: '#94a3b8' }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista por categoría */}
          {categoriaSeleccionada && (
            <div style={card}>
              <h3 style={{ marginBottom: 12, color: '#1e3d59' }}>
                Platillos de “{categorias.find(c => c.id === categoriaSeleccionada)?.nombre}”
              </h3>

              {platillos.filter(p => p.categoria?.id === categoriaSeleccionada).length === 0 ? (
                <p style={{ margin: 0, color: '#64748b' }}>No hay platillos en esta categoría.</p>
              ) : (
                platillos
                  .filter(p => p.categoria?.id === categoriaSeleccionada)
                  .map((platillo) => {
                    const tieneImagen = Boolean(platillo.imagenUrl);
                    const labelFoto = tieneImagen ? 'Cambiar foto' : 'Subir foto';
                    const mostrandoProgreso = subiendoId === platillo.id;

                    return (
                      <div
                        key={platillo.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: '1px solid #eef2f7',
                          gap: 14
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {tieneImagen ? (
                            <img
                              src={platillo.imagenUrl}
                              alt={platillo.nombre}
                              style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 10, border: '1px solid #e5e7eb' }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 52, height: 52, borderRadius: 10, background: '#e5e7eb',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, color: '#6b7280'
                              }}
                            >
                              Sin foto
                            </div>
                          )}

                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{platillo.nombre}</div>
                            <div style={{ color: '#334155', fontWeight: 700 }}>Q{platillo.precio}</div>
                            {!platillo.disponible && (
                              <span style={{ color: '#b91c1c', fontWeight: 800 }}>(No disponible)</span>
                            )}
                            {mostrandoProgreso && (
                              <div style={{ marginTop: 6, width: 180, background: '#eee', borderRadius: 6, overflow: 'hidden', height: 8 }}>
                                <div style={{ width: `${progreso}%`, height: '100%', background: '#0f766e', transition: 'width .2s' }} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <button
                            onClick={() => clickSubirPara(platillo.id)}
                            disabled={mostrandoProgreso}
                            style={{ ...btn('#0f766e'), opacity: mostrandoProgreso ? 0.7 : 1 }}
                            title={labelFoto}
                          >
                            {labelFoto}
                          </button>
                          <button onClick={() => editarPlatillo(platillo)} style={btn('#f59e0b')}>Editar</button>
                          <button onClick={() => cambiarDisponibilidad(platillo.id, platillo.disponible)} style={btn('#6b21a8')}>
                            {platillo.disponible ? 'Desactivar' : 'Activar'}
                          </button>
                          <button onClick={() => eliminarPlatillo(platillo.id)} style={btn('#dc2626')}>Eliminar</button>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Platillos;