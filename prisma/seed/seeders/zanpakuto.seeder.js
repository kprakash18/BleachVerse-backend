import prisma from "../../../src/database/prisma.js";
import slugify from "slugify";
import zanpakutos from "../Data/zanpakuto.data.js";
import { batchPromises } from "../utils.js";

export async function seedZanpakuto() {
  console.log("Seeding Zanpakuto Data...");

  // Clean up any Zanpakuto records that are no longer in the seed data
  const seedNames = zanpakutos.map((z) => z.name);
  await prisma.zanpakuto.deleteMany({
    where: {
      name: {
        notIn: seedNames,
      },
    },
  });

  // 1. Fetch all characters to map characterName to characterId
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });

  const characterMap = new Map(characters.map((c) => [c.name, c.id]));

  // 2. Map into tasks
  const tasks = [];
  for (const item of zanpakutos) {
    const characterId = characterMap.get(item.characterName);
    if (!characterId) {
      console.warn(
        `Character with name "${item.characterName}" not found in database. Skipping Zanpakuto "${item.name}".`,
      );
      continue;
    }

    const slug = slugify(item.name, { lower: true, strict: true });
    tasks.push({ item, characterId, slug });
  }

  // 3. Batch query in parallel chunks
  await batchPromises(tasks, async ({ item, characterId, slug }) => {
    await prisma.zanpakuto.upsert({
      where: {
        name: item.name,
      },
      update: {
        slug,
        type: item.type,
        releaseCommand: item.releaseCommand,
        spiritName: item.spiritName,
        description: item.description,
        characterId,
      },
      create: {
        name: item.name,
        slug,
        type: item.type,
        releaseCommand: item.releaseCommand,
        spiritName: item.spiritName,
        description: item.description,
        characterId,
      },
    });
  });

  console.log("Zanpakuto seeded successfully!");
}
