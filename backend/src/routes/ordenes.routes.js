const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

/**
 * POST /ordenes
 * Crear nueva orden con items
 */
router.post('/', async (req, res) => {
  const { mesa, meseroId, items } = req.body;

  if (!mesa || !meseroId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos incompletos para crear la orden.' });
  }

  try {
    const nuevaOrden = await prisma.orden.create({
      data: {
        mesa: parseInt(mesa),
        mesero: { connect: { id: parseInt(meseroId) } },
        items: {
          create: items.map(item => ({
            nombre: item.nombre,
            precio: item.precio,
            nota: item.nota || null
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json({ mensaje: 'Orden registrada', orden: nuevaOrden });
  } catch (error) {
    console.error('Error al registrar orden:', error);
    res.status(500).json({ error: 'Error al registrar la orden.' });
  }
});

/**
 * GET /ordenes
 * Obtener todas las órdenes
 */
router.get('/', async (req, res) => {
  try {
    const ordenes = await prisma.orden.findMany({
      orderBy: { fecha: 'desc' }, // asumiendo que existe campo fecha
      include: {
        mesero: { select: { nombre: true } },
        items: true
      }
    });
    res.json(ordenes);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener las órdenes.' });
  }
});

/**
 * DELETE /ordenes/:id
 * Eliminar una orden con sus items
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.ordenItem.deleteMany({
      where: { ordenId: parseInt(id) }
    });

    await prisma.orden.delete({
      where: { id: parseInt(id) }
    });

    res.json({ mensaje: 'Orden eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar orden:', error);
    res.status(500).json({ error: 'Error al eliminar la orden.' });
  }
});

/**
 * NEW: POST /ordenes/:id/items
 * Anexar items a una orden existente
 * body: { items: [{ nombre, precio, nota|null }, ...] }
 */
router.post('/:id/items', async (req, res) => {
  const { id } = req.params;
  const { items } = req.body;

  if (!id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos incompletos para anexar items.' });
  }

  try {
    // 1) Verificar que la orden exista
    const orden = await prisma.orden.findUnique({
      where: { id: parseInt(id) }
    });
    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }

    // (Opcional) si tienes un campo estado y no quieres permitir añadir cuando esté entregada:
    // if (orden.estado === 'Entregado') {
    //   return res.status(409).json({ error: 'No se puede editar una orden entregada.' });
    // }

    // 2) Crear los nuevos items
    await prisma.ordenItem.createMany({
      data: items.map(it => ({
        ordenId: parseInt(id),
        nombre: it.nombre,
        precio: it.precio,
        nota: it.nota || null
      }))
    });

    // 3) Devolver la orden actualizada con sus items
    const ordenActualizada = await prisma.orden.findUnique({
      where: { id: parseInt(id) },
      include: {
        mesero: { select: { nombre: true } },
        items: true
      }
    });

    res.json({ mensaje: 'Items anexados correctamente', orden: ordenActualizada });
  } catch (error) {
    console.error('Error al anexar items:', error);
    res.status(500).json({ error: 'Error al anexar items a la orden.' });
  }
});

module.exports = router;
