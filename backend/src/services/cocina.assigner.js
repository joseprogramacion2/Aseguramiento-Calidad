// backend/src/services/cocina.assigner.js
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const CAPACIDAD_POR_CHEF = 4;

// Promueve el ítem más antiguo ASIGNADO a PREPARANDO si el chef no tiene ninguno preparando
async function promoteNextForChef(chefId) {
  const enPrep = await prisma.ordenItem.count({
    where: { chefId, estado: "PREPARANDO" }
  });
  if (enPrep > 0) return;

  const siguiente = await prisma.ordenItem.findFirst({
    where: { chefId, estado: "ASIGNADO", tipo: "PLATILLO" },
    orderBy: { asignadoEn: "asc" }
  });
  if (!siguiente) return;

  await prisma.ordenItem.update({
    where: { id: siguiente.id },
    data: { estado: "PREPARANDO", asignadoEn: siguiente.asignadoEn ?? new Date() }
  });
}

// Reparte PLATILLOS PENDIENTES (más antiguos) entre chefs activos (o todos los cocineros habilitados como fallback)
// y luego garantiza que cada chef tenga 1 en PREPARANDO (si tiene cola).
async function rebalanceAssignments() {
  console.log("[REB] start");

  // 1) Chefs activos; si no hay, usar todos los cocineros habilitados (fallback)
  let chefIds = (await prisma.cocinaChef.findMany({ where: { activo: true } }))
    .map(c => c.chefId);

  if (!chefIds.length) {
    const cocineros = await prisma.usuario.findMany({
      where: { rol: { nombre: "COCINERO" }, estado: true },
      select: { id: true }
    });
    chefIds = cocineros.map(c => c.id);
    console.log("[REB] sin activos, usando cocineros:", chefIds);
  }
  if (!chefIds.length) {
    console.log("[REB] no hay cocineros disponibles");
    return;
  }

  // 2) Pool: PENDIENTE + PLATILLO + sin chef, prioriza los más antiguos
  const pool = await prisma.ordenItem.findMany({
    where: { estado: "PENDIENTE", chefId: null, tipo: "PLATILLO" },
    orderBy: { creadoEn: "asc" }
  });
  console.log("[REB] pendientes sin chef:", pool.length);

  // 3) Reparto 4 por chef (cuenta ASIGNADO|PREPARANDO como abiertos)
  for (const chefId of chefIds) {
    const abiertos = await prisma.ordenItem.count({
      where: { chefId, estado: { in: ["ASIGNADO", "PREPARANDO"] } }
    });
    const capacidad = Math.max(0, CAPACIDAD_POR_CHEF - abiertos);
    console.log(`[REB] chef ${chefId} abiertos=${abiertos} cap=${capacidad}`);
    if (capacidad <= 0) continue;

    const aAsignar = pool.splice(0, capacidad);
    for (const item of aAsignar) {
      await prisma.ordenItem.update({
        where: { id: item.id },
        data: { chefId, estado: "ASIGNADO", asignadoEn: new Date() }
      });
      console.log("[REB] asignado item", item.id, "-> chef", chefId);
    }
  }

  // 4) Auto-promoción: si un chef no tiene PREPARANDO pero sí cola, promueve el más antiguo
  for (const chefId of chefIds) {
    await promoteNextForChef(chefId);
  }

  console.log("[REB] end");
}

module.exports = { rebalanceAssignments, promoteNextForChef };
