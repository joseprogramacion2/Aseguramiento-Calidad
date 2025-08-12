// src/pages/GestionRoles.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import ToastMessage from '../components/ToastMessage';

const API = 'http://localhost:3001';

const GestionRoles = () => {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [nuevoRol, setNuevoRol] = useState('');

  // edición de nombre
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [nuevoNombreRol, setNuevoNombreRol] = useState('');

  // búsqueda de roles
  const [qRol, setQRol] = useState('');

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    obtenerRoles();
    obtenerPermisos();
  }, []);

  const obtenerRoles = async () => {
    try {
      const res = await axios.get(`${API}/permisos/roles-con-permisos`);
      setRoles(res.data);
      if (rolSeleccionado) {
        const actualizado = res.data.find((r) => r.id === rolSeleccionado.id);
        if (actualizado) {
          setRolSeleccionado(actualizado);
          setPermisosSeleccionados(actualizado.permisos);
        }
      }
    } catch (error) {
      console.error('Error al cargar roles:', error);
      showToast('Error al cargar roles.', 'danger');
    }
  };

  const obtenerPermisos = async () => {
    try {
      const res = await axios.get(`${API}/permisos`);
      setPermisos(res.data);
    } catch (error) {
      console.error('Error al cargar permisos:', error);
      showToast('Error al cargar permisos.', 'danger');
    }
  };

  const seleccionarRol = (rol) => {
    setRolSeleccionado(rol);
    setPermisosSeleccionados(rol.permisos);
    setEditandoNombre(false);
    setNuevoNombreRol(rol.nombre);
  };

  const togglePermiso = (permisoId) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(permisoId) ? prev.filter((id) => id !== permisoId) : [...prev, permisoId]
    );
  };

  const esAdmin = rolSeleccionado?.nombre === 'Administrador';

  const seleccionarTodo = () => {
    if (!rolSeleccionado || esAdmin) return;
    setPermisosSeleccionados(permisos.map((p) => p.id));
  };

  const seleccionarNinguno = () => {
    if (!rolSeleccionado || esAdmin) return;
    setPermisosSeleccionados([]);
  };

  const guardarCambios = async () => {
    if (!rolSeleccionado) return;
    if (esAdmin) {
      showToast('No se pueden modificar los permisos del rol Administrador.', 'danger');
      return;
    }
    try {
      await axios.put(`${API}/permisos/actualizar`, {
        rolId: rolSeleccionado.id,
        permisos: permisosSeleccionados,
      });
      await obtenerRoles();
      showToast('Permisos actualizados correctamente.', 'success');
    } catch (error) {
      console.error('Error al actualizar permisos:', error);
      showToast('Error al actualizar permisos.', 'danger');
    }
  };

  const crearRol = async () => {
    if (!nuevoRol.trim()) {
      showToast('Debes ingresar un nombre para el nuevo rol.', 'warning');
      return;
    }
    try {
      await axios.post(`${API}/permisos/crear-rol-con-permisos`, {
        nombreRol: nuevoRol.trim(),
        permisos: [],
      });
      setNuevoRol('');
      await obtenerRoles();
      showToast('Rol creado correctamente.', 'success');
    } catch (error) {
      console.error('Error al crear rol:', error);
      showToast(error.response?.data?.error || 'Error al crear el rol.', 'danger');
    }
  };

  const renombrarRol = async () => {
    if (!rolSeleccionado) return;
    if (esAdmin) {
      showToast('No se puede renombrar el rol Administrador.', 'danger');
      return;
    }
    if (!nuevoNombreRol.trim()) {
      showToast('Ingresa un nombre válido para el rol.', 'warning');
      return;
    }
    if (nuevoNombreRol.trim() === rolSeleccionado.nombre) {
      setEditandoNombre(false);
      return;
    }
    try {
      await axios.put(`${API}/permisos/rol/${rolSeleccionado.id}/nombre`, {
        nombre: nuevoNombreRol.trim(),
      });
      setEditandoNombre(false);
      await obtenerRoles();
      showToast('Nombre del rol actualizado.', 'success');
    } catch (error) {
      console.error('Error al renombrar rol:', error);
      showToast(error.response?.data?.error || 'Error al renombrar el rol.', 'danger');
    }
  };

  // ===== estilos coherentes y “pegados” =====
  const page = {
    minHeight: '100vh',
    background: '#f3f6f7',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const wrap = {
    padding: '20px 24px 28px',
    boxSizing: 'border-box',
    display: 'grid',
    gap: 16,
  };

  const tools = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  };

  const layout = {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: 24,
    alignItems: 'start',
  };

  const sidebar = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    padding: 12,
    position: 'sticky',
    top: 84,
  };

  const roleItem = (activo) => ({
    backgroundColor: activo ? '#006666' : '#e5e7eb',
    color: activo ? '#fff' : '#111827',
    padding: '0.6rem 0.75rem',
    marginBottom: 8,
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const contentCard = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    padding: 16,
  };

  const input = {
    padding: '0.5rem 0.6rem',
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    background: '#fff',
  };

  const btnPrimary = {
    backgroundColor: '#006666',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer',
  };

  const btnGhost = {
    background: '#e2e8f0',
    border: 'none',
    color: '#0f172a',
    padding: '0.5rem 0.8rem',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer',
  };

  // filtrado de roles por búsqueda
  const rolesFiltrados = useMemo(() => {
    const q = qRol.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((r) => r.nombre.toLowerCase().includes(q));
  }, [roles, qRol]);

  return (
    <div style={page}>
      <AdminHeader titulo="⚙ Gestión de Roles" />

      <div style={wrap}>
        {/* Herramientas superiores: crear rol y buscar */}
        <div style={tools}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <strong>Crear nuevo rol</strong>
            <input
              type="text"
              value={nuevoRol}
              placeholder="Nombre del nuevo rol"
              onChange={(e) => setNuevoRol(e.target.value)}
              style={{ ...input, width: 260 }}
            />
            <button onClick={crearRol} style={btnPrimary}>
              Crear Rol
            </button>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <strong>Buscar rol</strong>
            <input
              type="text"
              value={qRol}
              placeholder="Escribe para filtrar"
              onChange={(e) => setQRol(e.target.value)}
              style={{ ...input, width: 220 }}
            />
            {qRol && (
              <button style={btnGhost} onClick={() => setQRol('')}>
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Layout principal */}
        <div style={layout}>
          {/* Sidebar de roles */}
          <aside style={sidebar}>
            <h3 style={{ marginTop: 0 }}>Roles existentes</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {rolesFiltrados.map((rol) => (
                <li
                  key={rol.id}
                  style={roleItem(rolSeleccionado?.id === rol.id)}
                  onClick={() => seleccionarRol(rol)}
                >
                  <span>{rol.nombre}</span>
                </li>
              ))}
              {rolesFiltrados.length === 0 && (
                <li style={{ color: '#64748b', padding: '0.5rem' }}>Sin resultados…</li>
              )}
            </ul>
          </aside>

          {/* Contenido: Renombrar + Permisos */}
          <section style={contentCard}>
            <h3 style={{ marginTop: 0 }}>Permisos del rol</h3>

            {rolSeleccionado ? (
              <>
                {/* Renombrar */}
                <div
                  style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: '0.75rem 1rem',
                    marginBottom: 12,
                  }}
                >
                  <strong>Rol:</strong>{' '}
                  {editandoNombre ? (
                    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <input
                        value={nuevoNombreRol}
                        onChange={(e) => setNuevoNombreRol(e.target.value)}
                        style={input}
                        disabled={esAdmin}
                      />
                      <button onClick={renombrarRol} disabled={esAdmin} style={btnPrimary}>
                        Guardar
                      </button>
                      <button
                        onClick={() => {
                          setEditandoNombre(false);
                          setNuevoNombreRol(rolSeleccionado.nombre);
                        }}
                        style={btnGhost}
                      >
                        Cancelar
                      </button>
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      {rolSeleccionado.nombre}
                      <button
                        onClick={() => {
                          setEditandoNombre(true);
                          setNuevoNombreRol(rolSeleccionado.nombre);
                        }}
                        disabled={esAdmin}
                        style={btnGhost}
                        title={esAdmin ? 'No editable' : 'Editar nombre'}
                      >
                        Editar nombre
                      </button>
                    </span>
                  )}
                </div>

                {/* Acciones rápidas de permisos */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <button onClick={seleccionarTodo} style={btnGhost} disabled={esAdmin}>
                    Seleccionar todo
                  </button>
                  <button onClick={seleccionarNinguno} style={btnGhost} disabled={esAdmin}>
                    Ninguno
                  </button>
                </div>

                {/* Checklist de permisos */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 8,
                  }}
                >
                  {permisos.map((permiso) => (
                    <label key={permiso.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="checkbox"
                        checked={permisosSeleccionados.includes(permiso.id)}
                        onChange={() => togglePermiso(permiso.id)}
                        disabled={esAdmin}
                      />
                      <span>{permiso.descripcion || permiso.nombre}</span>
                    </label>
                  ))}
                </div>

                <button onClick={guardarCambios} style={{ ...btnPrimary, marginTop: 12 }} disabled={esAdmin}>
                  Guardar Cambios
                </button>
              </>
            ) : (
              <p>Selecciona un rol para ver y editar sus permisos.</p>
            )}
          </section>
        </div>
      </div>

      {/* Toast centrado arriba */}
      <ToastMessage
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default GestionRoles;
