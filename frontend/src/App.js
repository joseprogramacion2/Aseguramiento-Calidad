//app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Usuarios from './pages/Usuarios';
import Platillos from './pages/Platillos';
import Historial from './pages/Historial';
import PanelBasico from './pages/PanelBasico';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/platillos" element={<Platillos />} />
        <Route path="/admin/historial" element={<Historial />} />
        <Route path="/panel" element={<PanelBasico />} />
      </Routes>
    </Router>
  );
}

export default App;