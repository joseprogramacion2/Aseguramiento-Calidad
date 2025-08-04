import { Link } from 'react-router-dom';

const AdminHeader = ({ titulo }) => {
  return (
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
      <strong>{titulo}</strong>
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
  );
};

export default AdminHeader;
