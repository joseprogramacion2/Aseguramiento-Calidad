//usuarios
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      setFormData({
        nombre: '',
        usuario: '',
        correo: '',
        contrasena: '',
        rolId: '',
        responsableId: 1
      });
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

    setUsuarios(prev =>
      prev.map(u => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
    );

    setEditando(null);
    setFormData({
      nombre: '',
      usuario: '',
      correo: '',
      contrasena: '',
      rolId: '',
      responsableId: 1
    });
  } catch (error) {
    const mensaje = error.response?.data?.error || 'Error al actualizar el usuario';
    alert(mensaje);
  }
};

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem'
    }}>
      {/* Botón regresar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => navigate('/admin')} style={{
          backgroundColor: '#004d4d',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          ← Volver al panel
        </button>
      </div>

      {/* Título */}
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>Usuarios Registrados</h2>

      {/* Lista de usuarios */}
      <ul style={{
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        {usuarios.map((u) => (
          <li key={u.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span>{u.nombre} - {u.usuario} - {u.correo} - <strong>Rol:</strong> {u.rol.nombre}</span>
            {u.rol.nombre.toLowerCase() !== 'administrador' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => editarUsuario(u)} style={buttonEdit}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)} style={buttonDelete}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario */}
      <h3 style={{ marginBottom: '1rem' }}>{editando ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
      <form onSubmit={editando ? guardarCambios : crearUsuario} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        maxWidth: '350px',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="usuario" placeholder="Nombre de usuario" value={formData.usuario} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required />
        <input type="password" name="contrasena" placeholder="Contraseña" value={formData.contrasena} onChange={handleChange} />
        <select name="rolId" value={formData.rolId} onChange={handleChange} required>
          <option value="">Seleccionar un rol</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>{r.nombre}</option>
          ))}
        </select>
        <button type="submit" style={buttonPrimary}>{editando ? 'Guardar cambios' : 'Crear usuario'}</button>
        {editando && <button type="button" onClick={cancelarEdicion} style={buttonCancel}>Cancelar</button>}
      </form>
    </div>
  );
}

const buttonPrimary = {
  backgroundColor: '#006666',
  color: 'white',
  padding: '0.6rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const buttonEdit = {
  backgroundColor: '#ffaa00',
  color: '#fff',
  border: 'none',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer'
};

const buttonDelete = {
  backgroundColor: '#e60000',
  color: '#fff',
  border: 'none',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer'
};

const buttonCancel = {
  backgroundColor: '#cccccc',
  color: '#333',
  padding: '0.6rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Usuarios;