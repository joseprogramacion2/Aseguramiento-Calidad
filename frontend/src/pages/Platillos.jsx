//platillos
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Platillos() {
  const navigate = useNavigate();
  const [platillos, setPlatillos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // 🔐 Obtener ID del usuario logueado
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const responsableId = usuarioLogueado?.id;

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/platillos');
      setPlatillos(res.data);
    } catch (error) {
      console.error('Error al obtener platillos:', error);
    }
  };

  useEffect(() => {
    obtenerPlatillos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const crearPlatillo = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.precio || !formData.categoria) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      if (modoEdicion) {
        // 🔄 ACTUALIZAR con historial
        const updateData = {
          nombre: formData.nombre,
          precio: formData.precio,
          categoria: formData.categoria,
          responsableId: responsableId || 1 // Usar ID 1 como fallback si no hay usuario logueado
        };
        
        console.log('Enviando datos de actualización:', updateData);
        await axios.put(`http://localhost:3001/platillos/${idEditando}`, updateData);
        alert('Platillo actualizado correctamente');
      } else {
        // ➕ CREAR
        console.log('Enviando datos de creación:', formData);
        await axios.post('http://localhost:3001/platillos', formData);
        alert('Platillo registrado correctamente');
      }
      setFormData({ nombre: '', precio: '', categoria: '' });
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
      categoria: platillo.categoria
    });
  };

  const eliminarPlatillo = async (id) => {
    if (!window.confirm('¿Deseas eliminar este platillo?')) return;
    try {
      await axios.delete(`http://localhost:3001/platillos/${id}`);
      obtenerPlatillos();
      alert('Platillo eliminado');
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
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

      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>Gestión de Platillos</h2>

      <section style={{
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Lista de Platillos</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {platillos.map((p) => (
            <li key={p.id} style={{
              marginBottom: '0.5rem',
              borderBottom: '1px solid #ddd',
              paddingBottom: '0.5rem'
            }}>
              <strong>{p.nombre}</strong> - Q{p.precio} - <em>{p.categoria}</em>
              <button onClick={() => editarPlatillo(p)} style={{ marginLeft: '1rem' }}>Editar</button>
              <button onClick={() => eliminarPlatillo(p.id)} style={{ marginLeft: '0.5rem', color: 'red' }}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>
          {modoEdicion ? 'Editar platillo' : 'Registrar nuevo platillo'}
        </h3>
        <form onSubmit={crearPlatillo} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input type="text" name="nombre" placeholder="Nombre del platillo" value={formData.nombre} onChange={handleChange} required style={inputStyle} />
          <input type="number" step="0.01" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={{
            backgroundColor: '#006666',
            color: 'white',
            border: 'none',
            padding: '0.7rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            {modoEdicion ? 'Actualizar Platillo' : 'Registrar Platillo'}
          </button>
        </form>
      </section>
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

export default Platillos;
