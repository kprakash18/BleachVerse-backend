import prisma from "../../../src/database/prisma.js";
import characterAliases from "../Data/characterAlias.data.js";
import { batchPromises } from "../utils.js";

export async function seedCharacterAliases() {
  console.log("Seeding Character Aliases...");

  // 1. Fetch all characters (id and name) from the database
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });

  // 2. Map names to their corresponding database IDs
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));

  // 3. Map into flat tasks
  const tasks = [];
  for (const item of characterAliases) {
    const characterId = characterMap.get(item.characterName);
    if (!characterId) {
      console.warn(`Character with name "${item.characterName}" not found in database.`);
      continue;
    }

    for (const alias of item.aliases) {
      tasks.push({ characterId, alias });
    }
  }

  // 4. Batch query in parallel chunks
  await batchPromises(tasks, async ({ characterId, alias }) => {
    await prisma.characterAlias.upsert({
      where: {
        characterId_alias: {
          characterId,
          alias,
        },
      },
      update: {},
      create: {
        characterId,
        alias,
      },
    });
  });

  console.log("Character Aliases seeded successfully!");
}
