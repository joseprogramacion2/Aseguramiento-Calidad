// app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Usuarios from './pages/Usuarios';
import Platillos from './pages/Platillos';
import Historial from './pages/Historial';
import PanelPorRol from './pages/PanelPorRol';
import MenuAdmin from './pages/MenuAdmin';
import ManageCategories from './pages/ManageCategories';
import VistaMesero from './pages/VistaMesero';
import GestionRoles from './pages/GestionRoles';
import OrdenesMesero from './pages/OrdenesMesero'; // ✅ Importación nueva

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />  {/* 👈 alias */}

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/platillos" element={<Platillos />} />
        <Route path="/admin/historial" element={<Historial />} />
        <Route path="/admin/menu" element={<MenuAdmin />} />
        <Route path="/admin/categorias" element={<ManageCategories />} />
        <Route path="/admin/roles" element={<GestionRoles />} />

        <Route path="/panel" element={<PanelPorRol />} />

        <Route path="/mesero" element={<VistaMesero />} />
        <Route path="/mesero/ordenes" element={<OrdenesMesero />} /> {/* ✅ Ruta nueva */}


        
      </Routes>
    </Router>
  );
}

export default App;

