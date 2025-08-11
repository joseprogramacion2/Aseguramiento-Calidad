// src/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// =========================
// GET /usuarios  (activos o inactivos)
//   /usuarios           -> solo activos (por defecto)
//   /usuarios?inactivos=1 -> solo inactivos
// =========================
router.get('/', async (req, res) => {
  try {
    const inactivos = req.query.inactivos === '1';
    const usuarios = await prisma.usuario.findMany({
      where: { estado: inactivos ? false : true },
      select: {
        id: true,
        nombre: true,
        usuario: true,
        correo: true,
        rol: { select: { nombre: true } }
      },
      orderBy: { id: 'asc' }
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

// =========================
// POST /usuarios  (crear)
// =========================
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

    // evita duplicados entre activos (permite reusar si hay uno eliminado)
    const existente = await prisma.usuario.findFirst({
      where: {
        estado: true,
        OR: [{ usuario }, { correo }]
      }
    });
    if (existente) return res.status(409).json({ error: 'El usuario o correo ya existe.' });

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, usuario, correo, contrasena, rolId, estado: true }
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

// =========================
/** PUT /usuarios/:id (actualizar) */
// =========================
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

    // validar duplicados SOLO entre activos distintos del actual
    const existente = await prisma.usuario.findFirst({
      where: {
        estado: true,
        AND: [
          { id: { not: id } },
          { OR: [{ usuario }, { correo }] }
        ]
      }
    });
    if (existente) {
      return res.status(409).json({ error: 'El usuario o correo ya existe.' });
    }

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
      const descripcion =
        cambio.campo === 'rol'
          ? `Cambio de rol de ${actualizado.nombre} (${actualizado.usuario}): ${cambio.valorAnterior} → ${cambio.valorNuevo}`
          : cambio.campo === 'contrasena'
          ? `Cambio de contraseña de ${actualizado.nombre} (${actualizado.usuario})`
          : `Cambio en ${cambio.campo} de ${actualizado.nombre} (${actualizado.usuario}): ${cambio.valorAnterior || '—'} → ${cambio.valorNuevo || '—'}`;

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

// =========================
/** DELETE /usuarios/:id  (borrado lógico) */
// =========================
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

// =========================
/** PUT /usuarios/:id/restaurar  (reactivar) */
// =========================
router.put('/:id/restaurar', async (req, res) => {
  const id = parseInt(req.params.id);
  const { responsableId } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    if (usuario.estado === true) return res.status(400).json({ error: 'El usuario ya está activo.' });

    const reactivado = await prisma.usuario.update({
      where: { id },
      data: { estado: true }
    });

    await prisma.historialModificacion.create({
      data: {
        usuarioId: id,
        campo: 'estado',
        valorAnterior: 'eliminado',
        valorNuevo: 'activo',
        accion: `restauración de ${reactivado.nombre} (${reactivado.usuario})`,
        responsableId: parseInt(responsableId) || 1
      }
    });

    res.json({ mensaje: 'Usuario restaurado', usuario: reactivado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al restaurar usuario.' });
  }
});

module.exports = router;