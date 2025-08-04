const express = require('express');
const router = express.Router(); // 👈 Esta línea debe ir antes de usar router
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// Obtener todos los platillos
// Obtener todos los platillos con su categoría
router.get('/', async (req, res) => {
  try {
    const platillos = await prisma.platillo.findMany({
      orderBy: { creadoEn: 'desc' },
      include: {
        categoria: {
          select: {
            id: true,
            nombre: true
          }
        }
      }
    });
    res.json(platillos);
  } catch (error) {
    console.error('Error al obtener platillos:', error);
    res.status(500).json({ error: 'Error al obtener los platillos.' });
  }
});


// Crear un nuevo platillo
router.post('/', async (req, res) => {
  const { nombre, precio, categoriaId } = req.body;

  if (!nombre || !precio || !categoriaId) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const existente = await prisma.platillo.findUnique({ where: { nombre } });
    if (existente) {
      return res.status(409).json({ error: 'El platillo ya existe.' });
    }

    const nuevoPlatillo = await prisma.platillo.create({
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria: {
          connect: { id: parseInt(categoriaId) }
        }
      }
    });

    res.status(201).json({
      mensaje: 'Platillo creado exitosamente',
      platillo: nuevoPlatillo
    });
  } catch (error) {
    console.error('Error al crear platillo:', error);
    res.status(500).json({ error: 'Error al crear el platillo.' });
  }
});

module.exports = router; // 👈 Esto es CRUCIAL
