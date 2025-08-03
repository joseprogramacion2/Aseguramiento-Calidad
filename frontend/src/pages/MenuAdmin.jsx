import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MenuAdmin() {
  const [platillos, setPlatillos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPlatillos();
  }, []);

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/platillos');
      setPlatillos(res.data);
    } catch (error) {
      console.error('Error al obtener el menú:', error);
    }
  };

  // Agrupar platillos por categoría
  const categorias = [...new Set(platillos.map(p => p.categoria))];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <button onClick={() => navigate('/admin')} style={{
        backgroundColor: '#004d4d',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '1rem'
      }}>
        ← Volver al panel
      </button>

      <h2 style={{ marginBottom: '1rem', color: '#333' }}>📋 Menú del Restaurante</h2>

      {categorias.map((cat, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <h3 style={{ borderBottom: '2px solid #006666', paddingBottom: '0.5rem', color: '#006666' }}>{cat}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            {platillos.filter(p => p.categoria === cat).map(p => (
              <div key={p.id} style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '1rem',
                width: '250px'
              }}>
                <h4 style={{ margin: '0 0 0.5rem' }}>{p.nombre}</h4>
                <p style={{ margin: 0 }}>💰 <strong>Q{p.precio}</strong></p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuAdmin;
