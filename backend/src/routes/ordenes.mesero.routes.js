// backend/src/routes/ordenes.mesero.routes.js
const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const { rebalanceAssignments } = require("../services/cocina.assigner");

const prisma = new PrismaClient();
const router = express.Router();

/** Listado (excluye finalizadas) */
router.get("/", async (_req, res) => {
  try {
    const ordenes = await prisma.orden.findMany({
      where: { finishedAt: null },                // <<< NO mostrar finalizadas
      orderBy: { fecha: "desc" },
      include: {
        mesero: { select: { id: true, nombre: true } },
        items: true,
      },
    });
    res.json(ordenes);
  } catch (e) {
    console.error("GET /ordenes", e);
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
});

/** Sólo pendientes de orden (si sigues usando esto) */
router.get("/pendientes", async (_req, res) => {
  try {
    const ordenes = await prisma.orden.findMany({
      where: { finishedAt: null, estado: "En espera" },
      orderBy: { fecha: "desc" },
      include: {
        mesero: { select: { nombre: true } },
        items: { where: { estado: "PENDIENTE" } },
      },
    });
    res.json(ordenes);
  } catch (e) {
    console.error("GET /pendientes", e);
    res.status(500).json({ error: "Error al obtener pendientes" });
  }
});

/** Crear orden + items */
router.post("/", async (req, res) => {
  const { mesa, meseroId, items } = req.body;
  if (!mesa || !meseroId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  try {
    const orden = await prisma.orden.create({
      data: {
        mesa: Number(mesa),
        mesero: { connect: { id: Number(meseroId) } },
        items: {
          create: items.map((it) => ({
            nombre: it.nombre,
            precio: it.precio,
            nota: it.nota || null,
            tipo: it.tipo === "BEBIDA" ? "BEBIDA" : "PLATILLO",
            estado: "PENDIENTE",
          })),
        },
        estado: "En espera",
      },
      include: { items: true },
    });

    await rebalanceAssignments(); // reparto inmediato
    res.status(201).json({ mensaje: "Orden registrada", orden });
  } catch (e) {
    console.error("POST /ordenes", e);
    res.status(500).json({ error: "Error al registrar la orden" });
  }
});

/** Anexar items */
router.post("/:id/items", async (req, res) => {
  const id = Number(req.params.id);
  const { items } = req.body;
  if (!id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  try {
    const exists = await prisma.orden.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ error: "Orden no encontrada" });

    await prisma.ordenItem.createMany({
      data: items.map((it) => ({
        ordenId: id,
        nombre: it.nombre,
        precio: it.precio,
        nota: it.nota || null,
        tipo: it.tipo === "BEBIDA" ? "BEBIDA" : "PLATILLO",
        estado: "PENDIENTE",
      })),
    });

    await rebalanceAssignments();

    const ordenActualizada = await prisma.orden.findUnique({
      where: { id },
      include: {
        mesero: { select: { nombre: true } },
        items: true,
      },
    });

    res.json({ mensaje: "Items anexados", orden: ordenActualizada });
  } catch (e) {
    console.error("POST /:id/items", e);
    res.status(500).json({ error: "Error al anexar items" });
  }
});

/** Eliminar */
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.ordenItem.deleteMany({ where: { ordenId: id } });
    await prisma.orden.delete({ where: { id } });
    res.json({ mensaje: "Orden eliminada" });
  } catch (e) {
    console.error("DELETE /:id", e);
    res.status(500).json({ error: "Error al eliminar la orden" });
  }
});

/**
 * FINALIZAR ORDEN
 * PATCH /ordenes/:id/finalizar
 * Requiere que **todos los PLATILLOS** estén LISTO.
 */
router.patch("/:id/finalizar", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "ordenId inválido" });

  try {
    const orden = await prisma.orden.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!orden) return res.status(404).json({ error: "Orden no existe" });
    if (orden.finishedAt) {
      return res.status(400).json({ error: "La orden ya está finalizada" });
    }

    // todos los platillos listos (las bebidas no bloquean)
    const platillos = orden.items.filter((it) => (it.tipo || "").toUpperCase() !== "BEBIDA");
    const ok = platillos.length > 0 &&
               platillos.every((it) => (it.estado || "").toUpperCase() === "LISTO");
    if (!ok) return res.status(409).json({ error: "Aún hay platillos sin terminar" });

    const now = new Date();
    const durationSec = Math.max(0, Math.round((now - new Date(orden.fecha)) / 1000));

    const updated = await prisma.orden.update({
      where: { id },
      data: {
        finishedAt: now,
        durationSec,
        estado: "Terminada",
      },
      include: {
        items: true,
        mesero: { select: { id: true, nombre: true } },
      },
    });

    res.json(updated);
  } catch (e) {
    console.error("PATCH /:id/finalizar", e);
    res.status(500).json({ error: "Error al finalizar la orden" });
  }
});

module.exports = router;
