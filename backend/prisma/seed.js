// prisma/seed.js
const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

const PERMISOS = [
  // Administración
  { clave: 'CONFIGURAR_USUARIOS', nombre: 'CONFIGURAR_USUARIOS', descripcion: 'Gestionar usuarios' },
  { clave: 'CONFIGURAR_PLATILLOS', nombre: 'CONFIGURAR_PLATILLOS', descripcion: 'Gestionar platillos' },
  { clave: 'GESTIONAR_CATEGORIAS', nombre: 'GESTIONAR_CATEGORIAS', descripcion: 'Gestionar categorías' },
  { clave: 'GESTIONAR_ROLES', nombre: 'GESTIONAR_ROLES', descripcion: 'Gestionar roles y permisos' },
  { clave: 'VER_MENU', nombre: 'VER_MENU', descripcion: 'Ver menú' },
  { clave: 'VER_HISTORIAL', nombre: 'VER_HISTORIAL', descripcion: 'Ver historial' },

  // Mesero / Órdenes
  { clave: 'GENERAR_ORDEN', nombre: 'GENERAR_ORDEN', descripcion: 'Crear órdenes' },
  { clave: 'VER_ORDENES', nombre: 'VER_ORDENES', descripcion: 'Ver historial de órdenes' },
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

  // Mesero -> solo los de órdenes e historial
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
