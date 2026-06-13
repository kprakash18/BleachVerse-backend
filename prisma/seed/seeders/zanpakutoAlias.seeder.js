import prisma from "../../../src/database/prisma.js";
import zanpakutoAliases from "../Data/zanpakutoAlias.data.js";

export async function seedZanpakutoAliases() {
  console.log("Seeding Zanpakuto Aliases...");

  // 1. Fetch all zanpakutos (id and name) from the database
  const zanpakutos = await prisma.zanpakuto.findMany({
    select: { id: true, name: true },
  });

  // 2. Map names to their corresponding database IDs
  const zanpakutoMap = new Map(zanpakutos.map((z) => [z.name, z.id]));

  // 3. Loop through your zanpakutoAlias data and insert relationships
  for (const item of zanpakutoAliases) {
    const zanpakutoId = zanpakutoMap.get(item.zanpakutoName);
    if (!zanpakutoId) {
      console.warn(`Zanpakuto with name "${item.zanpakutoName}" not found in database.`);
      continue;
    }

    for (const alias of item.aliases) {
      // Upsert the alias relationship using the compound unique key zanpakutoId_alias
      await prisma.zanpakutoAlias.upsert({
        where: {
          zanpakutoId_alias: {
            zanpakutoId,
            alias,
          },
        },
        update: {},
        create: {
          zanpakutoId,
          alias,
        },
      });
    }
  }

  console.log("Zanpakuto Aliases seeded successfully!");
}
