const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

// Obtener todos los permisos disponibles
router.get("/", async (req, res) => {
  try {
    const permisos = await prisma.permiso.findMany();
    res.json(permisos);
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    res.status(500).json({ error: "Error al obtener permisos" });
  }
});

// Crear un nuevo rol y asignarle permisos
router.post("/crear-rol-con-permisos", async (req, res) => {
  const { nombreRol, permisos } = req.body;

  if (!nombreRol || !Array.isArray(permisos)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  try {
    const rolExistente = await prisma.rol.findUnique({
      where: { nombre: nombreRol.trim() },
    });
    if (rolExistente) {
      return res.status(400).json({ error: "El rol ya existe" });
    }

    const nuevoRol = await prisma.rol.create({
      data: { nombre: nombreRol.trim() },
    });

    if (permisos.length) {
      const relaciones = permisos.map((permisoId) => ({
        rolId: nuevoRol.id,
        permisoId,
      }));
      await prisma.permisoPorRol.createMany({ data: relaciones });
    }

    res.json({ mensaje: "Rol creado y permisos asignados correctamente" });
  } catch (error) {
    console.error("Error al crear rol con permisos:", error);
    res.status(500).json({ error: "Error al crear rol con permisos" });
  }
});

// Obtener todos los roles con sus permisos
router.get("/roles-con-permisos", async (req, res) => {
  try {
    const roles = await prisma.rol.findMany({
      include: { permisos: { include: { permiso: true } } },
      orderBy: { nombre: "asc" },
    });

    const resultado = roles.map((rol) => ({
      id: rol.id,
      nombre: rol.nombre,
      permisos: rol.permisos.map((p) => p.permisoId),
    }));

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener roles con permisos:", error);
    res.status(500).json({ error: "Error al obtener roles con permisos" });
  }
});

// Actualizar los permisos de un rol existente
router.put("/actualizar", async (req, res) => {
  const { rolId, permisos } = req.body;

  if (!rolId || !Array.isArray(permisos)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  try {
    const rol = await prisma.rol.findUnique({ where: { id: rolId } });
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });

    // No dejar sin permisos al Administrador
    if (rol.nombre.toLowerCase() === "administrador" && permisos.length === 0) {
      return res
        .status(400)
        .json({ error: "No puedes quitar todos los permisos al Administrador." });
    }

    await prisma.permisoPorRol.deleteMany({ where: { rolId } });

    if (permisos.length > 0) {
      const relaciones = permisos.map((permisoId) => ({ rolId, permisoId }));
      await prisma.permisoPorRol.createMany({ data: relaciones });
    }

    res.json({ mensaje: "Permisos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar permisos:", error);
    res.status(500).json({ error: "Error al actualizar permisos del rol" });
  }
});

//
// 🔹 Renombrar rol
//
router.put("/rol/:id/nombre", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: "El nombre del rol es obligatorio." });
  }

  try {
    const rol = await prisma.rol.findUnique({ where: { id: Number(id) } });
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });

    // Bloquear renombrar Administrador
    if (rol.nombre.toLowerCase() === "administrador") {
      return res
        .status(400)
        .json({ error: "No puedes renombrar el rol Administrador." });
    }

    // Evitar duplicados
    const existe = await prisma.rol.findUnique({
      where: { nombre: nombre.trim() },
    });
    if (existe) {
      return res.status(400).json({ error: "Ya existe un rol con ese nombre." });
    }

    const actualizado = await prisma.rol.update({
      where: { id: Number(id) },
      data: { nombre: nombre.trim() },
    });

    res.json({ mensaje: "Nombre de rol actualizado.", rol: actualizado });
  } catch (error) {
    console.error("Error al renombrar rol:", error);
    res.status(500).json({ error: "Error al renombrar el rol" });
  }
});

module.exports = router;
