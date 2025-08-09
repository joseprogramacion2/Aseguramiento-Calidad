const express = require("express");
const cors = require("cors");
const app = express();

const loginRoutes = require("./routes/login.routes");
const usuarioRoutes = require('./routes/usuarios.routes');
const rolesRoutes = require('./routes/rol.routes');
const historialRoutes = require('./routes/historial.routes');
const platillosRoutes = require('./routes/platillos.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const ordenesRoutes = require('./routes/ordenes.routes'); // ✅ AÑADIDO

const PORT = 3001;

app.use(cors());
app.use(express.json());

// Registrar rutas
app.use("/login", loginRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/roles', rolesRoutes);
app.use('/historial', historialRoutes);
app.use('/platillos', platillosRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/ordenes', ordenesRoutes); // ✅ AÑADIDO

app.get("/", (req, res) => {
  res.send("Backend corriendo 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
