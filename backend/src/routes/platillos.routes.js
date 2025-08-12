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
        categoria: { select: { id: true, nombre: true } }
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
    if (existente) return res.status(409).json({ error: 'El platillo ya existe.' });

    const nuevoPlatillo = await prisma.platillo.create({
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria: { connect: { id: parseInt(categoriaId) } }
      }
    });

    res.status(201).json({ mensaje: 'Platillo creado exitosamente', platillo: nuevoPlatillo });
  } catch (error) {
    console.error('Error al crear platillo:', error);
    res.status(500).json({ error: 'Error al crear el platillo.' });
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
    if (!platilloOriginal) return res.status(404).json({ error: 'Platillo no encontrado' });

    const cambios = [];
    if (platilloOriginal.nombre !== nombre) {
      cambios.push({ campo: 'nombre', valorAnterior: platilloOriginal.nombre, valorNuevo: nombre });
    }
    if (platilloOriginal.precio !== parseFloat(precio)) {
      cambios.push({
        campo: 'precio',
        valorAnterior: platilloOriginal.precio.toString(),
        valorNuevo: parseFloat(precio).toString()
      });
    }
    if (platilloOriginal.categoriaId !== parseInt(categoriaId)) {
      const nuevaCat = await prisma.categoria.findUnique({ where: { id: parseInt(categoriaId) } });
      cambios.push({
        campo: 'categoria',
        valorAnterior: platilloOriginal.categoria?.nombre || '',
        valorNuevo: nuevaCat?.nombre || ''
      });
    }

    const actualizado = await prisma.platillo.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria: { connect: { id: parseInt(categoriaId) } }
      }
    });

    for (const c of cambios) {
      await prisma.historialModificacion.create({
        data: {
          campo: c.campo,
          valorAnterior: c.valorAnterior,
          valorNuevo: c.valorNuevo,
          accion: `Modificación de platillo: campo '${c.campo}' actualizado.`,
          responsableId: parseInt(responsableId) || 1,
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

// ✅ Cambiar disponibilidad (activar/desactivar)
router.patch('/:id/disponibilidad', async (req, res) => {
  const { id } = req.params;
  const { disponible, responsableId } = req.body;

  // normaliza a boolean aunque llegue como string/number
  const toBool = (v) =>
    v === true || v === 'true' || v === 1 || v === '1' || v === 'on';

  const nuevoEstado = toBool(disponible);

  try {
    const platillo = await prisma.platillo.update({
      where: { id: parseInt(id) },
      data: { disponible: nuevoEstado }
    });

    // (Opcional) registra en historial si manejas historial de platillos
    try {
      await prisma.historialModificacion.create({
        data: {
          accion: 'modificación',
          campo: 'disponible',
          valorAnterior: (!nuevoEstado).toString(),
          valorNuevo: nuevoEstado.toString(),
          descripcion: `Cambio de disponibilidad del platillo "${platillo.nombre}": ahora ${nuevoEstado ? 'activado' : 'desactivado'}.`,
          platillo: { connect: { id: platillo.id } },
          ...(responsableId
            ? { responsable: { connect: { id: parseInt(responsableId) } } }
            : {})
        }
      });
    } catch (eHist) {
      console.error('No se pudo registrar el historial de disponibilidad:', eHist);
      // no fallamos la respuesta por el historial
    }

    res.json({
      mensaje: `Platillo ${nuevoEstado ? 'activado' : 'desactivado'} correctamente`,
      platillo
    });
  } catch (error) {
    console.error('Error al cambiar disponibilidad:', error);
    res.status(500).json({ error: 'Error al actualizar disponibilidad del platillo.' });
  }
});


// ✅ NUEVO: Guardar URL de imagen en BD (sin historial)
router.put('/:id/imagen', async (req, res) => {
  const id = parseInt(req.params.id);
  const { url } = req.body;

  if (!id || !url) return res.status(400).json({ error: 'Falta id o url' });

  try {
    const actual = await prisma.platillo.findUnique({ where: { id } });
    if (!actual) return res.status(404).json({ error: 'Platillo no encontrado' });

    const actualizado = await prisma.platillo.update({
      where: { id },
      data: { imagenUrl: url }
    });

    res.json({ mensaje: 'Imagen guardada correctamente', platillo: actualizado });
  } catch (error) {
    console.error('Error guardando imagen en BD:', error);
    res.status(500).json({ error: 'Error al guardar imagen en la base de datos.' });
  }
});


module.exports = router;
