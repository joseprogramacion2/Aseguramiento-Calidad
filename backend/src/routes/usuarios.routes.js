//usuarios
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Obtener usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: { estado: true },
      select: {
        id: true,
        nombre: true,
        usuario: true,
        correo: true,
        rol: { select: { nombre: true } }
      }
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});


// Crear usuario
router.post('/', async (req, res) => {
  let { nombre, usuario, correo, contrasena, rolId, responsableId } = req.body;

  if (!nombre || !usuario || !correo || !contrasena || !rolId || !responsableId) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  rolId = parseInt(rolId);
  responsableId = parseInt(responsableId);

  try {
    const rol = await prisma.rol.findUnique({ where: { id: rolId } });
    if (!rol) return res.status(404).json({ error: 'Rol no encontrado.' });
    if (rol.nombre.toLowerCase() === 'administrador') {
      return res.status(403).json({ error: 'No se permite crear usuarios con rol de Administrador.' });
    }

    const existente = await prisma.usuario.findFirst({
      where: { OR: [{ usuario }, { correo }] }
    });
    if (existente) return res.status(409).json({ error: 'El usuario o correo ya existe.' });

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, usuario, correo, contrasena, rolId }
    });

    await prisma.historialModificacion.create({
      data: {
        usuarioId: nuevoUsuario.id,
        campo: 'usuario',
        valorAnterior: null,
        valorNuevo: `${nuevoUsuario.nombre} (${nuevoUsuario.usuario})`,
        accion: 'creación',
        responsableId
      }
    });

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  let { nombre, usuario, correo, contrasena, rolId, responsableId } = req.body;

  if (!nombre || !usuario || !correo || !rolId || !responsableId) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  rolId = parseInt(rolId);
  responsableId = parseInt(responsableId);

  try {
    const anterior = await prisma.usuario.findUnique({ where: { id } });
    if (!anterior) return res.status(404).json({ error: 'Usuario no encontrado.' });

    // Validar que no exista otro usuario con el mismo nombre de usuario o correo
const existente = await prisma.usuario.findFirst({
  where: {
    AND: [
      { id: { not: id } },
      {
        OR: [
          { usuario: usuario },
          { correo: correo }
        ]
      }
    ]
  }
});
if (existente) {
  return res.status(409).json({ error: 'El usuario o correo ya existe.' });
}

// Si no hay duplicados, ahora sí actualiza
const actualizado = await prisma.usuario.update({
  where: { id },
  data: {
    nombre,
    usuario,
    correo,
    rolId,
    ...(contrasena ? { contrasena } : {})
  }
});

    const cambios = [];

    if (anterior.nombre !== nombre) {
      cambios.push({ campo: 'nombre', valorAnterior: anterior.nombre, valorNuevo: nombre });
    }

    if (anterior.usuario !== usuario) {
      cambios.push({ campo: 'usuario', valorAnterior: anterior.usuario, valorNuevo: usuario });
    }

    if (anterior.correo !== correo) {
      cambios.push({ campo: 'correo', valorAnterior: anterior.correo, valorNuevo: correo });
    }

    if (anterior.contrasena !== contrasena && contrasena) {
      cambios.push({ campo: 'contrasena', valorAnterior: '****', valorNuevo: '****' });
    }

    if (anterior.rolId !== rolId) {
      const nuevoRol = await prisma.rol.findUnique({ where: { id: rolId } });
      const anteriorRol = await prisma.rol.findUnique({ where: { id: anterior.rolId } });
      cambios.push({ campo: 'rol', valorAnterior: anteriorRol?.nombre, valorNuevo: nuevoRol?.nombre });
    }

    for (const cambio of cambios) {
      let descripcion = '';
      if (cambio.campo === 'rol') {
        descripcion = `Cambio de rol de ${actualizado.nombre} (${actualizado.usuario}): ${cambio.valorAnterior} → ${cambio.valorNuevo}`;
      } else if (cambio.campo === 'contrasena') {
        descripcion = `Cambio de contraseña de ${actualizado.nombre} (${actualizado.usuario})`;
      } else {
        descripcion = `Cambio en ${cambio.campo} de ${actualizado.nombre} (${actualizado.usuario}): ${cambio.valorAnterior || '—'} → ${cambio.valorNuevo || '—'}`;
      }

      await prisma.historialModificacion.create({
        data: {
          usuarioId: id,
          campo: cambio.campo,
          valorAnterior: cambio.valorAnterior,
          valorNuevo: cambio.valorNuevo,
          accion: descripcion,
          responsableId
        }
      });
    }

    const usuarioConRol = await prisma.usuario.findUnique({
  where: { id: actualizado.id },
  select: {
    id: true,
    nombre: true,
    usuario: true,
    correo: true,
    rol: { select: { nombre: true } }
  }
});

res.json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioConRol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
});

// Eliminar usuario (estado = false)
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const responsableId = 1;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });

    await prisma.usuario.update({
      where: { id },
      data: { estado: false }
    });

    await prisma.historialModificacion.create({
      data: {
        usuarioId: id,
        campo: 'estado',
        valorAnterior: 'activo',
        valorNuevo: 'eliminado',
        accion: `eliminación de ${usuario.nombre} (${usuario.usuario})`,
        responsableId
      }
    });

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario.' });
  }
});

module.exports = router;