const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Ruta para crear una nueva categoría (sin verificación)
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const categoria = await prisma.categoria.create({
      data: { nombre },
    });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
});

// Ruta para obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

module.exports = router;
