const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

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

// Eliminar un platillo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.platillo.delete({
      where: { id: parseInt(id) }
    });
    res.json({ mensaje: 'Platillo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar platillo:', error);
    res.status(500).json({ error: 'Error al eliminar el platillo.' });
  }
});

// Actualizar un platillo y registrar en historial
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoriaId, responsableId } = req.body;

  try {
    const platilloOriginal = await prisma.platillo.findUnique({
      where: { id: parseInt(id) },
      include: { categoria: true }
    });

    if (!platilloOriginal) {
      return res.status(404).json({ error: 'Platillo no encontrado' });
    }

    const cambios = [];

    if (platilloOriginal.nombre !== nombre) {
      cambios.push({
        campo: 'nombre',
        valorAnterior: platilloOriginal.nombre,
        valorNuevo: nombre
      });
    }

    if (platilloOriginal.precio !== parseFloat(precio)) {
      cambios.push({
        campo: 'precio',
        valorAnterior: platilloOriginal.precio.toString(),
        valorNuevo: precio.toString()
      });
    }

    if (platilloOriginal.categoriaId !== parseInt(categoriaId)) {
      cambios.push({
        campo: 'categoria',
        valorAnterior: platilloOriginal.categoria?.nombre || '',
        valorNuevo: (await prisma.categoria.findUnique({ where: { id: parseInt(categoriaId) } }))?.nombre || ''
      });
    }

    // Actualizar platillo
    const actualizado = await prisma.platillo.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria: {
          connect: { id: parseInt(categoriaId) }
        }
      }
    });

    // Registrar en historial si hubo cambios
    for (const cambio of cambios) {
      await prisma.historialModificacion.create({
        data: {
          campo: cambio.campo,
          valorAnterior: cambio.valorAnterior,
          valorNuevo: cambio.valorNuevo,
          accion: `Modificación de platillo: campo '${cambio.campo}' actualizado.`,
          responsableId: parseInt(responsableId),
          platilloId: parseInt(id)
        }
      });
    }

    res.json({ mensaje: 'Platillo actualizado', platillo: actualizado });

  } catch (error) {
    console.error('Error al actualizar platillo:', error);
    res.status(500).json({ error: 'Error al actualizar el platillo.' });
  }
});

module.exports = router;
