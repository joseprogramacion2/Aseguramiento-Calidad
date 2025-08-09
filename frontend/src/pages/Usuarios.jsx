import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: '',
    rolId: '',
    responsableId: 1
  });
  const [editando, setEditando] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const obtenerRoles = async () => {
    try {
      const res = await axios.get('http://localhost:3001/roles');
      const rolesFiltrados = res.data.filter(r => r.nombre.toLowerCase() !== 'administrador');
      setRoles(rolesFiltrados);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    obtenerRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/usuarios', formData);
      alert('Usuario creado correctamente');
      resetForm();
      obtenerUsuarios();
    } catch (error) {
      alert(error.response?.data?.error || 'Error al crear usuario');
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuarios/${id}`);
      alert('Usuario eliminado');
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      alert('Error al eliminar usuario');
    }
  };

  const editarUsuario = (usuario) => {
    setEditando(usuario);
    setFormData({
      nombre: usuario.nombre,
      usuario: usuario.usuario,
      correo: usuario.correo,
      contrasena: '',
      rolId: roles.find(r => r.nombre === usuario.rol.nombre)?.id || '',
      responsableId: 1
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      usuario: '',
      correo: '',
      contrasena: '',
      rolId: '',
      responsableId: 1
    });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/usuarios/${editando.id}`, formData);
      alert('Usuario actualizado');
      const usuarioActualizado = {
        ...res.data.usuario,
        rol: res.data.usuario.rol || { nombre: 'Desconocido' }
      };
      setUsuarios(prev => prev.map(u => (u.id === usuarioActualizado.id ? usuarioActualizado : u)));
      cancelarEdicion();
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar el usuario';
      alert(mensaje);
    }
  };

  const inputStyle = {
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid #d1d5db',
    outline: 'none',
    backgroundColor: '#f9fafb',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f6fa',
      fontFamily: 'Poppins, sans-serif',
      padding: '2rem'
    }}>
      <AdminHeader titulo="👥 Gestión de Usuarios" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'flex-start',
        marginTop: '2rem'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#1e3d59' }}>Usuarios Registrados</h2>
          {Object.entries(
            usuarios.reduce((acc, u) => {
              const rol = u.rol.nombre;
              if (!acc[rol]) acc[rol] = [];
              acc[rol].push(u);
              return acc;
            }, {})
          ).map(([rol, users]) => (
            <details key={rol} open style={{ marginBottom: '1rem' }}>
              <summary style={{
                fontWeight: '600',
                color: '#007f5f',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}>
                {rol}
              </summary>
              <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                {users.map((u) => (
                  <li key={u.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.4rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span>{u.nombre} - {u.usuario} - {u.correo}</span>
                    {u.rol.nombre.toLowerCase() !== 'administrador' && (
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => editarUsuario(u)} style={buttonEdit}>Editar</button>
                        <button onClick={() => eliminarUsuario(u.id)} style={buttonDelete}>Eliminar</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1e3d59' }}>{editando ? '✏️ Editar Usuario' : '➕ Registrar Nuevo Usuario'}</h3>
          <form onSubmit={editando ? guardarCambios : crearUsuario} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} style={inputStyle} required />
            <input type="text" name="usuario" placeholder="Nombre de usuario" value={formData.usuario} onChange={handleChange} style={inputStyle} required />
            <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} style={inputStyle} required />
            <input type="password" name="contrasena" placeholder="Contraseña" value={formData.contrasena} onChange={handleChange} style={inputStyle} />
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
      </div>
    </div>
  );
}

const buttonPrimary = {
  backgroundColor: '#007f5f',
  color: 'white',
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

const buttonCancel = {
  backgroundColor: '#cccccc',
  color: '#333',
  padding: '0.8rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default Usuarios;
