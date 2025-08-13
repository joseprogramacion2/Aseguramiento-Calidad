// backend/src/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Rutas =====
const loginRoutes          = require("./routes/login.routes");
const usuarioRoutes        = require("./routes/usuarios.routes");
const rolesRoutes          = require("./routes/rol.routes");
const historialRoutes      = require("./routes/historial.routes");
const platillosRoutes      = require("./routes/platillos.routes");
const categoriaRoutes      = require("./routes/categoria.routes");
const permisosRoutes       = require("./routes/permisos.routes");
const ordenesMeseroRoutes  = require("./routes/ordenes.mesero.routes");
const ordenesCocinaRoutes  = require("./routes/ordenes.cocina.routes");

// Prefijos “oficiales”
app.use("/login", loginRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/roles", rolesRoutes);
app.use("/historial", historialRoutes);
app.use("/platillos", platillosRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/permisos", permisosRoutes);
app.use("/ordenes", ordenesMeseroRoutes);

// Cocina: nuevo prefijo y alias para compatibilidad
app.use("/cocina", ordenesCocinaRoutes);
app.use("/ordenes/cocina", ordenesCocinaRoutes);

// ===== Healthchecks =====
app.get("/health", (_req, res) => res.status(200).json({ ok: true }));
app.get("/", (_req, res) => res.send("Backend corriendo 🚀"));

// ===== 404 =====
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ===== Error handler =====
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ===== Start (solo si se ejecuta directamente) =====
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
  });
}

// Exporta la app para pruebas
module.exports = app;
