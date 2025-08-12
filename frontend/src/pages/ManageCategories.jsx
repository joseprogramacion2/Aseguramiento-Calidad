// src/pages/ManageCategories.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import ToastMessage from '../components/ToastMessage';
import { Modal } from 'bootstrap';

const API = 'http://localhost:3001';

const ManageCategories = () => {
  // Form compartido (crear/editar)
  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState(null); // null = creando, id = editando

  // Datos
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // Modal Confirmación
  const [confirmData, setConfirmData] = useState(null);
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);

  useEffect(() => {
    if (!confirmData) return;
    modalInstanceRef.current = new Modal(modalRef.current, { backdrop: true, keyboard: true });

    const node = modalRef.current;
    const onHidden = () => {
      setConfirmData(null);
      modalInstanceRef.current?.dispose();
      modalInstanceRef.current = null;
    };

    node.addEventListener('hidden.bs.modal', onHidden);
    modalInstanceRef.current.show();

    return () => node.removeEventListener('hidden.bs.modal', onHidden);
  }, [confirmData]);

  const closeModal = () => modalInstanceRef.current?.hide();

  const obtenerCategorias = async () => {
    try {
      setCargando(true);
      const { data } = await axios.get(`${API}/categorias`);
      setCategorias(data);
    } catch (error) {
      showToast('Error al obtener categorías', 'danger');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  // ----- Crear / Actualizar (mismo form) -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreTrim = nombre.trim();
    if (!nombreTrim) return;

    try {
      if (editId === null) {
        // Crear
        await axios.post(`${API}/categorias`, { nombre: nombreTrim });
        showToast('Categoría creada exitosamente', 'success');
      } else {
        // Actualizar
        await axios.put(`${API}/categorias/${editId}`, { nombre: nombreTrim });
        showToast('Categoría actualizada', 'success');
      }
      setNombre('');
      setEditId(null);
      obtenerCategorias();
    } catch (error) {
      showToast(
        error.response?.data?.error || (editId ? 'Error al actualizar categoría' : 'Error al crear la categoría'),
        'danger'
      );
    }
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setNombre(cat.nombre); // llenamos el form como en Platillos
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditId(null);
    setNombre('');
  };

  // ----- Activar / Desactivar -----
  const pedirConfirmacionToggle = (cat) => {
    const seraInactivar = !!cat.activo;
    setConfirmData({
      title: seraInactivar ? 'Desactivar categoría' : 'Activar categoría',
      message: seraInactivar
        ? `¿Deseas desactivar la categoría "${cat.nombre}"? Sus platillos no se mostrarán en el menú.`
        : `¿Deseas activar la categoría "${cat.nombre}"?`,
      confirmText: seraInactivar ? 'Desactivar' : 'Activar',
      confirmVariant: seraInactivar ? 'warning' : 'primary',
      onConfirm: async () => {
        try {
          await axios.put(`${API}/categorias/${cat.id}`, { activo: !cat.activo });
          showToast(seraInactivar ? 'Categoría desactivada' : 'Categoría activada', 'success');
          obtenerCategorias();
        } catch {
          showToast('No se pudo cambiar el estado', 'danger');
        } finally {
          closeModal();
        }
      }
    });
  };

  // ----- Eliminar -----
  const pedirConfirmacionEliminar = (id, nombreCat) => {
    setConfirmData({
      title: 'Confirmar eliminación',
      message: `¿Deseas eliminar la categoría "${nombreCat}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      confirmVariant: 'danger',
      onConfirm: async () => {
        try {
          await axios.delete(`${API}/categorias/${id}`);
          showToast('Categoría eliminada', 'success');
          // Si se estaba editando esta misma, resetea el form
          if (editId === id) cancelEdit();
          obtenerCategorias();
        } catch (error) {
          showToast(error.response?.data?.error || 'No se pudo eliminar la categoría', 'danger');
        } finally {
          closeModal();
        }
      }
    });
  };

  /* ===== estilos coherentes ===== */
  const page = { minHeight: '100vh', backgroundColor: '#f3f6f7', fontFamily: 'Poppins, Segoe UI, sans-serif' };
  const wrap = { padding: '20px 24px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))', gap: 16, alignItems: 'start' };
  const card = { backgroundColor: '#ffffff', padding: 20, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' };
  const inputStyle = { padding: '0.9rem 1rem', borderRadius: 12, border: '1.5px solid #d1d5db', background: '#f9fafb', fontSize: '1rem' };
  const buttonPrimary = { padding: '0.9rem', borderRadius: 10, border: 'none', backgroundColor: '#006666', color: 'white', fontWeight: 'bold', cursor: 'pointer' };
  const buttonCancel = { padding: '0.9rem', borderRadius: 10, border: 'none', backgroundColor: '#94a3b8', color: 'white', fontWeight: 'bold', cursor: 'pointer' };
  const btn = (bg) => ({ backgroundColor: bg, color: '#fff', border: 'none', padding: '0.5rem 0.9rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer' });
  const empty = { padding: '0.75rem', color: '#64748b', background: '#f1f5f9', borderRadius: 8, textAlign: 'center' };

  return (
    <div style={page}>
      <AdminHeader titulo={editId ? '✏️ Editar categoría' : '📂 Gestión de Categorías'} />

      <div style={wrap}>
        {/* Formulario (crear/editar) */}
        <section style={card}>
          <h2 style={{ marginTop: 0, marginBottom: 12, color: '#1e293b' }}>
            {editId ? 'Editar categoría' : 'Crear nueva categoría'}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la categoría"
              required
              style={inputStyle}
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" style={buttonPrimary}>
                {editId ? 'Actualizar Categoría' : 'Crear Categoría'}
              </button>
              {editId && (
                <button type="button" style={buttonCancel} onClick={cancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
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
                    padding: '0.9rem 0',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>{cat.nombre}</span>
                    {!cat.activo && <span className="badge text-bg-secondary" style={{ marginLeft: 8 }}>Inactiva</span>}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button style={btn('#f0ad4e')} onClick={() => startEdit(cat)}>Editar</button>
                    <button style={btn('#6d28d9')} onClick={() => pedirConfirmacionToggle(cat)}>
                      {cat.activo ? 'Desactivar' : 'Activar'}
                    </button>
                    <button style={btn('#e11d48')} onClick={() => pedirConfirmacionEliminar(cat.id, cat.nombre)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Toast centrado arriba */}
      <ToastMessage
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

      {/* Modal de confirmación arriba */}
      {confirmData && (
        <div className="modal fade" tabIndex="-1" ref={modalRef}>
          <div className="modal-dialog mt-5">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">{confirmData.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>{confirmData.message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button
                  type="button"
                  className={`btn btn-${confirmData.confirmVariant || 'danger'}`}
                  onClick={confirmData.onConfirm}
                >
                  {confirmData.confirmText || 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
