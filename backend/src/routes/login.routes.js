// login
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../src/generated/prisma'); // ajusta si usas @prisma/client

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const user = await prisma.usuario.findFirst({
      where: {
        estado: true, // ✅ Solo usuarios activos
        OR: [
          { usuario },
          { correo: usuario }
        ]
      },
      include: { rol: true }
    });

    if (!user || user.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    const { contrasena: _, ...usuarioSinClave } = user;

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: usuarioSinClave
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;