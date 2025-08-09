import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Platillos() {
  const [platillos, setPlatillos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', precio: '', categoriaId: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const responsableId = usuarioLogueado?.id;
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPlatillos();
    obtenerCategorias();
  }, []);

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
        await axios.put(`http://localhost:3001/platillos/${idEditando}`, {
          ...formData,
          responsableId: responsableId || 1
        });
        alert('Platillo actualizado correctamente');
      } else {
        await axios.post('http://localhost:3001/platillos', formData);
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
      await axios.patch(`http://localhost:3001/platillos/${id}/disponibilidad`, {
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
      await axios.delete(`http://localhost:3001/platillos/${id}`);
      obtenerPlatillos();
      alert('Platillo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar platillo:', error);
      alert('Error al eliminar el platillo');
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f8f9fc', padding: '2rem' }}>
      <div style={{ backgroundColor: '#1b3c59', color: 'white', padding: '1rem 2rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🍽 Platillos por Categoría</h2>
        <button onClick={() => navigate('/admin')} style={{ backgroundColor: '#15803d', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          ← Volver al Panel
        </button>
      </div>

      <div style={{ display: 'flex', marginTop: '2rem', gap: '2rem' }}>
        <aside style={{ width: '250px', background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          {categorias.map((cat) => (
            <div key={cat.id} onClick={() => setCategoriaSeleccionada(cat.id)} style={{
              marginBottom: '0.5rem',
              backgroundColor: categoriaSeleccionada === cat.id ? '#e0f2f1' : '#f2f2f2',
              color: '#333',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: categoriaSeleccionada === cat.id ? '2px solid #0d9488' : 'none'
            }}>
              {cat.nombre}
            </div>
          ))}
        </aside>

        <main style={{ flex: 1 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h3 style={{ color: '#1b3c59' }}>{modoEdicion ? 'Editar platillo' : 'Registrar nuevo platillo'}</h3>
            <form onSubmit={crearPlatillo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '450px' }}>
              <input type="text" name="nombre" placeholder="Nombre del platillo" value={formData.nombre} onChange={handleChange} style={inputStyle} required />
              <input type="number" step="0.01" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} style={inputStyle} required />
              <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} style={inputStyle} required>
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
              <button type="submit" style={botonStyle}>{modoEdicion ? 'Actualizar Platillo' : 'Registrar Platillo'}</button>
            </form>
          </div>

          {categoriaSeleccionada && (
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginBottom: '1rem', color: '#1b3c59' }}>Platillos de la categoría seleccionada</h3>
              {platillos.filter(p => p.categoria?.id === categoriaSeleccionada).map((platillo) => (
                <div key={platillo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                  <div>
                    <strong>{platillo.nombre}</strong> - Q{platillo.precio}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => editarPlatillo(platillo)} style={btnYellow}>Editar</button>
                    <button onClick={() => cambiarDisponibilidad(platillo.id, platillo.disponible)} style={btnPurple}>{platillo.disponible ? 'Desactivar' : 'Activar'}</button>
                    <button onClick={() => eliminarPlatillo(platillo.id)} style={btnRed}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%'
};

const botonStyle = {
  backgroundColor: '#0f766e',
  color: 'white',
  border: 'none',
  padding: '0.75rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '0.5rem'
};

const btnRed = {
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const btnYellow = {
  backgroundColor: '#f59e0b',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const btnPurple = {
  backgroundColor: '#6b21a8',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Platillos;