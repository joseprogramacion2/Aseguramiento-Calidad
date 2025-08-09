import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

function MenuAdmin() {
  const [platillos, setPlatillos] = useState([]);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPlatillos();
  }, []);

  const obtenerPlatillos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/platillos');
      // ✅ Solo mostrar platillos disponibles
      setPlatillos(res.data.filter(p => p.disponible));
    } catch (error) {
      console.error('Error al obtener el menú:', error);
    }
  };

  // Agrupar platillos por nombre de categoría
  const platillosPorCategoria = platillos.reduce((grupos, platillo) => {
    const categoriaNombre = typeof platillo.categoria?.nombre === 'string'
      ? platillo.categoria.nombre
      : 'Sin categoría';

    if (!grupos[categoriaNombre]) {
      grupos[categoriaNombre] = [];
    }
    grupos[categoriaNombre].push(platillo);
    return grupos;
  }, {});

  const categoriasOrdenadas = Object.keys(platillosPorCategoria).sort();

  const toggleCategoria = (cat) => {
    setCategoriasAbiertas((prev) => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f4f4',
      minHeight: '100vh'
    }}>
      <AdminHeader titulo="📋 Menú del Restaurante" />

      {categoriasOrdenadas.map((cat, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <h3
            onClick={() => toggleCategoria(cat)}
            style={{
              borderBottom: '2px solid #006666',
              paddingBottom: '0.5rem',
              color: '#006666',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {cat}
            <span style={{ fontSize: '1.2rem' }}>
              {categoriasAbiertas[cat] ? '🔽' : '▶️'}
            </span>
          </h3>

          {categoriasAbiertas[cat] && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {platillosPorCategoria[cat].map(p => (
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
          )}
        </div>
      ))}
    </div>
  );
}

export default MenuAdmin;
