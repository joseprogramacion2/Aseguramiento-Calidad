const { PrismaClient } = require('../src/generated/prisma'); // o @prisma/client
const prisma = new PrismaClient();

async function main() {
  const roles = ['Administrador', 'Mesero', 'Cocinero', 'Repartidor'];

  for (const nombre of roles) {
    const existe = await prisma.rol.findUnique({ where: { nombre } });
    if (!existe) {
      await prisma.rol.create({ data: { nombre } });
      console.log('✅ Rol "${nombre}" creado');
    } else {
      console.log('ℹ️ Rol "${nombre}" ya existe');
    }
  }

  // Crear administrador si no existe
  const adminRol = await prisma.rol.findUnique({ where: { nombre: 'Administrador' } });
  const existeAdmin = await prisma.usuario.findUnique({ where: { usuario: 'admin' } });

  if (!existeAdmin) {
    await prisma.usuario.create({
      data: {
        nombre: 'Administrador General',
        usuario: 'admin',
        correo: 'admin@restaurante.com',
        contrasena: 'admin123',
        rolId: adminRol.id,
      },
    });
    console.log('✅ Administrador creado');
  } else {
    console.log('ℹ️ El administrador ya existe');
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });