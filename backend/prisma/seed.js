// prisma/seed.js
const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

const PERMISOS = [
  // Administración
  { nombre: 'CONFIGURAR_USUARIOS', descripcion: 'Gestionar usuarios' },
  { nombre: 'CONFIGURAR_PLATILLOS', descripcion: 'Gestionar platillos' },
  { nombre: 'GESTIONAR_CATEGORIAS', descripcion: 'Gestionar categorías' },
  { nombre: 'GESTIONAR_ROLES', descripcion: 'Gestionar roles y permisos' },
  { nombre: 'VER_MENU', descripcion: 'Ver menú' },
  { nombre: 'VER_HISTORIAL', descripcion: 'Ver historial' },

  // Mesero / Órdenes
  { nombre: 'GENERAR_ORDEN', descripcion: 'Crear órdenes' },
  { nombre: 'VER_ORDENES', descripcion: 'Ver historial de órdenes' },

  // 👨‍🍳 Cocina
  { nombre: 'COCINA_VIEW', descripcion: 'Acceso a vista de cocina' },
];

async function main() {
  // --- Permisos ---
  for (const p of PERMISOS) {
    await prisma.permiso.upsert({
      where: { nombre: p.nombre },
      update: { descripcion: p.descripcion },
      create: { nombre: p.nombre, descripcion: p.descripcion },
    });
  }

  // --- Roles ---
  const admin = await prisma.rol.upsert({
    where: { nombre: 'Administrador' },
    update: {},
    create: { nombre: 'Administrador' },
  });

  const mesero = await prisma.rol.upsert({
    where: { nombre: 'Mesero' },
    update: {},
    create: { nombre: 'Mesero' },
  });

  const cocinero = await prisma.rol.upsert({
    where: { nombre: 'Cocinero' },
    update: {},
    create: { nombre: 'Cocinero' },
  });

  // --- Vincular permisos a roles ---
  const todosPermisos = await prisma.permiso.findMany();
  const mapPerm = Object.fromEntries(todosPermisos.map(p => [p.nombre, p.id]));

  // Admin -> todos
  for (const p of todosPermisos) {
    await prisma.permisoPorRol.upsert({
      where: { permisoId_rolId: { permisoId: p.id, rolId: admin.id } },
      update: {},
      create: { permisoId: p.id, rolId: admin.id },
    });
  }

  // Mesero -> solo los de órdenes
  const permisosMesero = ['GENERAR_ORDEN', 'VER_ORDENES'];
  for (const nombre of permisosMesero) {
    const pid = mapPerm[nombre];
    if (!pid) continue;
    await prisma.permisoPorRol.upsert({
      where: { permisoId_rolId: { permisoId: pid, rolId: mesero.id } },
      update: {},
      create: { permisoId: pid, rolId: mesero.id },
    });
  }

  // Cocinero -> acceso a vista de cocina
  const permisosCocinero = ['COCINA_VIEW'];
  for (const nombre of permisosCocinero) {
    const pid = mapPerm[nombre];
    if (!pid) continue;
    await prisma.permisoPorRol.upsert({
      where: { permisoId_rolId: { permisoId: pid, rolId: cocinero.id } },
      update: {},
      create: { permisoId: pid, rolId: cocinero.id },
    });
  }

  // --- Usuarios de prueba ---
  // Admin
  await prisma.usuario.upsert({
    where: { usuario: 'admin' },
    update: { estado: true, rolId: admin.id },
    create: {
      nombre: 'Admin',
      usuario: 'admin',
      correo: 'admin@demo.com',
      contrasena: 'admin123',
      rolId: admin.id,
      estado: true,
    },
  });

  // Mesero demo
  await prisma.usuario.upsert({
    where: { usuario: 'mesero1' },
    update: { estado: true, rolId: mesero.id },
    create: {
      nombre: 'Mesero Demo',
      usuario: 'mesero1',
      correo: 'mesero1@demo.com',
      contrasena: 'mesero123',
      rolId: mesero.id,
      estado: true,
    },
  });

  // Cocinero demo
  await prisma.usuario.upsert({
    where: { usuario: 'cocinero1' },
    update: { estado: true, rolId: cocinero.id },
    create: {
      nombre: 'Cocinero Demo',
      usuario: 'cocinero1',
      correo: 'cocinero1@demo.com',
      contrasena: 'cocina123',
      rolId: cocinero.id,
      estado: true,
    },
  });

  console.log('✅ Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
