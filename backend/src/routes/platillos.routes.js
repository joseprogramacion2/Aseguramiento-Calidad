//Platillos
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// Obtener todos los platillos
router.get('/', async (req, res) => {
  try {
    const platillos = await prisma.platillo.findMany({
      orderBy: { creadoEn: 'desc' }
    });
    res.json(platillos);
  } catch (error) {
    console.error('Error al obtener platillos:', error);
    res.status(500).json({ error: 'Error al obtener los platillos.' });
  }
});

// Endpoint de prueba para verificar el estado
router.get('/test', async (req, res) => {
  try {
    const platillos = await prisma.platillo.count();
    const usuarios = await prisma.usuario.count();
    const historial = await prisma.historialModificacion.count();
    
    // Obtener algunos registros de historial para verificar la estructura
    const historialEjemplo = await prisma.historialModificacion.findMany({
      take: 5,
      orderBy: { fecha: 'desc' },
      include: {
        responsable: { select: { nombre: true } },
        platillo: { select: { nombre: true } },
        usuario: { select: { nombre: true } }
      }
    });
    
    res.json({
      platillos: platillos,
      usuarios: usuarios,
      historial: historial,
      historialEjemplo: historialEjemplo,
      mensaje: 'Sistema funcionando correctamente'
    });
  } catch (error) {
    console.error('Error en test:', error);
    res.status(500).json({ error: 'Error en test' });
  }
});

// Crear un nuevo platillo
router.post('/', async (req, res) => {
  const { nombre, precio, categoria } = req.body;

  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // Validar que el nombre no esté repetido
    const existente = await prisma.platillo.findUnique({ where: { nombre } });
    if (existente) {
      return res.status(409).json({ error: 'El platillo ya existe.' });
    }

    const nuevoPlatillo = await prisma.platillo.create({
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria
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
  const { nombre, precio, categoria, responsableId } = req.body;

  // Validar campos requeridos
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const platilloOriginal = await prisma.platillo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!platilloOriginal) {
      return res.status(404).json({ error: 'Platillo no encontrado' });
    }

    const cambios = [];
    const precioNuevo = parseFloat(precio);

    console.log('Comparando valores:');
    console.log('Nombre - Original:', platilloOriginal.nombre, 'Nuevo:', nombre);
    console.log('Precio - Original:', platilloOriginal.precio, 'Nuevo:', precioNuevo);
    console.log('Categoría - Original:', platilloOriginal.categoria, 'Nuevo:', categoria);

    if (platilloOriginal.nombre !== nombre) {
      cambios.push({
        campo: 'nombre',
        valorAnterior: platilloOriginal.nombre,
        valorNuevo: nombre
      });
    }

    if (Math.abs(platilloOriginal.precio - precioNuevo) > 0.01) { // Usar tolerancia para comparación de floats
      cambios.push({
        campo: 'precio',
        valorAnterior: platilloOriginal.precio.toString(),
        valorNuevo: precio.toString()
      });
    }

    if (platilloOriginal.categoria !== categoria) {
      cambios.push({
        campo: 'categoria',
        valorAnterior: platilloOriginal.categoria,
        valorNuevo: categoria
      });
    }

    // Actualizar platillo
    const actualizado = await prisma.platillo.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria
      }
    });

    // Registrar en historial si hubo cambios y si hay responsableId
    console.log('Cambios detectados:', cambios);
    console.log('ResponsableId:', responsableId);
    
    if (cambios.length > 0 && responsableId) {
      console.log('Creando registros en historial...');
      for (const cambio of cambios) {
        try {
          // Crear registro de historial para platillo (usar platilloId, no usuarioId)
          const historialEntry = await prisma.historialModificacion.create({
            data: {
              campo: cambio.campo,
              valorAnterior: cambio.valorAnterior,
              valorNuevo: cambio.valorNuevo,
              accion: `Modificación de platillo: campo '${cambio.campo}' actualizado.`,
              responsableId: parseInt(responsableId), // Quién hizo el cambio
              platilloId: parseInt(id) // A qué platillo se le hizo el cambio
            }
          });
          console.log('Registro de historial creado:', historialEntry);
        } catch (error) {
          console.error('Error al crear registro de historial:', error);
          // Si falla, intentar con una consulta SQL directa
          try {
            await prisma.$executeRaw`
              INSERT INTO "HistorialModificacion" ("campo", "valorAnterior", "valorNuevo", "accion", "responsableId", "platilloId", "fecha")
              VALUES (${cambio.campo}, ${cambio.valorAnterior}, ${cambio.valorNuevo}, ${`Modificación de platillo: campo '${cambio.campo}' actualizado.`}, ${parseInt(responsableId)}, ${parseInt(id)}, NOW())
            `;
            console.log('Registro de historial creado con SQL directo');
          } catch (sqlError) {
            console.error('Error al crear registro con SQL directo:', sqlError);
          }
        }
      }
    } else {
      console.log('No se crearon registros de historial. Cambios:', cambios.length, 'ResponsableId:', responsableId);
    }

    res.json({ mensaje: 'Platillo actualizado', platillo: actualizado });

  } catch (error) {
    console.error('Error al actualizar platillo:', error);
    res.status(500).json({ error: 'Error al actualizar el platillo.' });
  }
});


module.exports = router;