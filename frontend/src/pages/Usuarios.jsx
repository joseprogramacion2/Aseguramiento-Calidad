// src/pages/Usuarios.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

const API = 'http://localhost:3001';

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const usuarioSesion = useMemo(() => JSON.parse(localStorage.getItem('usuario')), []);
  const responsableId = usuarioSesion?.id ?? 1;

  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: '',
    rolId: '',
    responsableId
  });

  const [editando, setEditando] = useState(null);
  const [viendoEliminados, setViendoEliminados] = useState(false);

  const esAdmin = (u) => u?.rol?.nombre?.toLowerCase() === 'administrador';

  const obtenerUsuarios = async (inactivos = false) => {
    try {
      const { data } = await axios.get(`${API}/usuarios${inactivos ? '?inactivos=1' : ''}`);
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const obtenerRoles = async () => {
    try {
      const { data } = await axios.get(`${API}/roles`);
      const rolesFiltrados = data.filter(r => r.nombre.toLowerCase() !== 'administrador');
      setRoles(rolesFiltrados);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  useEffect(() => {
    if (!usuarioSesion) return navigate('/login');
    obtenerUsuarios(false);
    obtenerRoles();
  }, [navigate, usuarioSesion]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      usuario: '',
      correo: '',
      contrasena: '',
      rolId: '',
      responsableId
    });
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, responsableId };
      await axios.post(`${API}/usuarios`, payload);
      resetForm();
      await obtenerUsuarios(false);
      alert('Usuario creado correctamente');
    } catch (error) {
      alert(error.response?.data?.error || 'Error al crear usuario');
    }
  };

  const editarUsuario = (usuario) => {
    setEditando(usuario);
    const rolCoincidente = roles.find(r => r.nombre === usuario?.rol?.nombre);
    setFormData({
      nombre: usuario.nombre,
      usuario: usuario.usuario,
      correo: usuario.correo,
      contrasena: '',
      rolId: rolCoincidente?.id || '',
      responsableId
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    resetForm();
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: formData.nombre,
        usuario: formData.usuario,
        correo: formData.correo,
        rolId: formData.rolId,
        responsableId
      };
      if (formData.contrasena && formData.contrasena.trim() !== '') {
        payload.contrasena = formData.contrasena.trim();
      }

      const { data } = await axios.put(`${API}/usuarios/${editando.id}`, payload);
      const actualizado = { ...data.usuario, rol: data.usuario.rol || { nombre: 'Desconocido' } };
      setUsuarios(prev => prev.map(u => (u.id === actualizado.id ? actualizado : u)));
      cancelarEdicion();
      alert('Usuario actualizado');
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar el usuario';
      alert(mensaje);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await axios.delete(`${API}/usuarios/${id}`);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      alert('Usuario eliminado');
    } catch (error) {
      alert(error.response?.data?.error || 'Error al eliminar usuario');
    }
  };

  const restaurarUsuario = async (id) => {
    if (!confirm('¿Restaurar este usuario?')) return;
    try {
      await axios.put(`${API}/usuarios/${id}/restaurar`, { responsableId });
      // si quieres volver a la vista de activos automáticamente:
      // setViendoEliminados(false);
      await obtenerUsuarios(true);
      alert('Usuario restaurado');
    } catch (error) {
      alert(error.response?.data?.error || 'Error al restaurar usuario');
    }
  };

  /* ===== estilos coherentes y “pegados” ===== */
  const page = {
    minHeight: '100vh',
    backgroundColor: '#f3f6f7',
    fontFamily: 'Poppins, Segoe UI, sans-serif',
  };

  const wrapTop = {
    padding: '20px 24px 0',
    display: 'flex',
    justifyContent: 'flex-end'
  };

  const toggleBtn = {
    backgroundColor: '#0f766e',
    color: '#fff',
    border: 'none',
    padding: '0.55rem 0.9rem',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer'
  };

  const wrap = {
    padding: '12px 24px 28px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
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
    backgroundColor: '#007f5f',
    color: '#fff',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const buttonEdit = {
    backgroundColor: '#f0ad4e',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const buttonDelete = {
    backgroundColor: '#e63946',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const buttonRestore = {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const buttonCancel = {
    backgroundColor: '#cccccc',
    color: '#333',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  const tituloLista = viendoEliminados ? 'Usuarios Eliminados' : 'Usuarios Registrados';

  return (
    <div style={page}>
      <AdminHeader titulo="👥 Gestión de Usuarios" />

      {/* Botón para ver eliminados / activos */}
      <div style={wrapTop}>
        <button
          style={toggleBtn}
          onClick={async () => {
            const next = !viendoEliminados;
            setViendoEliminados(next);
            await obtenerUsuarios(next);
          }}
        >
          {viendoEliminados ? '← Ver activos' : 'Usuarios eliminados'}
        </button>
      </div>

      <div style={wrap}>
        {/* Lista */}
        <div style={card}>
          <h2 style={{ marginBottom: 12, color: '#1e3d59' }}>{tituloLista}</h2>

          {usuarios.length === 0 ? (
            <p style={{ margin: 0, color: '#64748b' }}>
              {viendoEliminados ? 'No hay usuarios eliminados.' : 'No hay usuarios registrados.'}
            </p>
          ) : (
            Object.entries(
              usuarios.reduce((acc, u) => {
                const rol = u?.rol?.nombre ?? 'Sin rol';
                (acc[rol] = acc[rol] || []).push(u);
                return acc;
              }, {})
            ).map(([rol, users]) => (
              <details key={rol} open style={{ marginBottom: 12 }}>
                <summary style={{ fontWeight: 600, color: '#007f5f', cursor: 'pointer', marginBottom: 6 }}>
                  {rol}
                </summary>
                <ul style={{ listStyle: 'none', paddingLeft: 16, margin: 0 }}>
                  {users.map((u) => (
                    <li key={u.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <span>{u.nombre} — {u.usuario} — {u.correo}</span>

                      {viendoEliminados ? (
                        <button onClick={() => restaurarUsuario(u.id)} style={buttonRestore}>Restaurar</button>
                      ) : (
                        !esAdmin(u) && (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => editarUsuario(u)} style={buttonEdit}>Editar</button>
                            <button onClick={() => eliminarUsuario(u.id)} style={buttonDelete}>Eliminar</button>
                          </div>
                        )
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ))
          )}
        </div>

        {/* Formulario (solo en vista de activos) */}
        {!viendoEliminados && (
          <div style={card}>
            <h3 style={{ marginBottom: 16, color: '#1e3d59' }}>
              {editando ? '✏️ Editar Usuario' : '➕ Registrar Nuevo Usuario'}
            </h3>

            <form onSubmit={editando ? guardarCambios : crearUsuario} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} style={inputStyle} required />
              <input type="text" name="usuario" placeholder="Nombre de usuario" value={formData.usuario} onChange={handleChange} style={inputStyle} required />
              <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} style={inputStyle} required />
              <input type="password" name="contrasena" placeholder={editando ? 'Contraseña (opcional)' : 'Contraseña'} value={formData.contrasena} onChange={handleChange} style={inputStyle} />

              <select name="rolId" value={formData.rolId} onChange={handleChange} style={inputStyle} required>
                <option value="">Seleccionar un rol</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>

              <button type="submit" style={buttonPrimary}>
                {editando ? 'Guardar cambios' : 'Crear usuario'}
              </button>

              {editando && (
                <button type="button" onClick={cancelarEdicion} style={buttonCancel}>Cancelar</button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuarios;