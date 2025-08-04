import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

function Platillos() {
  const [platillos, setPlatillos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoriaId: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

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

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3001/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    obtenerPlatillos();
    obtenerCategorias();
  }, []);

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
        const updateData = {
          nombre: formData.nombre,
          precio: formData.precio,
          categoriaId: formData.categoriaId,
          responsableId: responsableId || 1
        };
        await axios.put(`http://localhost:3001/platillos/${idEditando}`, updateData);
        alert('Platillo actualizado correctamente');
      } else {
        await axios.post('http://localhost:3001/platillos', {
          nombre: formData.nombre,
          precio: formData.precio,
          categoriaId: formData.categoriaId
        });
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
      <AdminHeader titulo="🍽 Gestión de Platillos" />

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
              <strong>{p.nombre}</strong> - Q{p.precio} - <em>{p.categoria?.nombre || 'Sin categoría'}</em>
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
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del platillo"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            step="0.01"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>

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
