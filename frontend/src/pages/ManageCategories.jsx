import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ManageCategories = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const obtenerCategorias = async () => {
    try {
      const res = await fetch('http://localhost:3001/categorias');
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        setMensaje('✅ Categoría creada exitosamente');
        setNombre('');
        obtenerCategorias();
      } else {
        setMensaje('❌ Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error en la conexión al servidor');
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;
    try {
      await fetch(`http://localhost:3001/categorias/${id}`, { method: 'DELETE' });
      setMensaje('✅ Categoría eliminada');
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMensaje('❌ No se pudo eliminar la categoría');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#004d4d',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <strong>📂 Gestión de Categorías</strong>
        <Link to="/admin" style={{
          backgroundColor: '#006666',
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1.2rem',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          ← Volver al Panel
        </Link>
      </header>

      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '10px',
        maxWidth: '500px',
        margin: '0 auto 2rem auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Crear nueva categoría</h2>

        <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Crear Categoría</button>
        </form>

        {mensaje && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{mensaje}</p>}
      </div>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Categorías Existentes</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categorias.map((cat) => (
            <li key={cat.id} style={{
              padding: '0.6rem 0',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{cat.nombre}</span>
              <button onClick={() => eliminarCategoria(cat.id)} style={{
                backgroundColor: '#e60000',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer'
              }}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.75rem',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#006666',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default ManageCategories;
