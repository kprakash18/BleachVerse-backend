import prisma from "../../../src/database/prisma.js";
import powers from "../Data/power.data.js";
import { batchPromises } from "../utils.js";

export async function seedPower() {
  console.log("Seeding Power Data...");

  // 1. Fetch relations to map names/references to database IDs
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));

  const transformations = await prisma.transformation.findMany({
    select: { id: true, name: true, characterId: true },
  });
  // Map compound key `${characterId}_${transformationName}` to transformationId
  const transformationMap = new Map(
    transformations.map((t) => [`${t.characterId}_${t.name}`, t.id])
  );

  // 2. Map seed items into tasks and resolve relations
  const tasks = [];
  for (const item of powers) {
    const characterId = characterMap.get(item.characterName);
    if (!characterId) {
      console.warn(
        `Character with name "${item.characterName}" not found in database. Skipping Power "${item.name}".`
      );
      continue;
    }

    let transformationId = null;
    if (item.transformationName) {
      transformationId =
        transformationMap.get(`${characterId}_${item.transformationName}`) ||
        null;

      if (!transformationId) {
        console.warn(
          `Transformation "${item.transformationName}" not found for character "${item.characterName}". Proceeding with null transformationId for Power "${item.name}".`
        );
      }
    }

    tasks.push({ item, characterId, transformationId });
  }

  // 3. Clean up any Power records that are no longer in the seed data
  const seedPairs = tasks.map((t) => `${t.characterId}_${t.item.name}`);
  const seedPairKeys = new Set(seedPairs);

  const dbPowers = await prisma.power.findMany({
    select: { id: true, characterId: true, name: true },
  });

  const toDelete = dbPowers
    .filter((p) => !seedPairKeys.has(`${p.characterId}_${p.name}`))
    .map((p) => p.id);

  if (toDelete.length > 0) {
    console.log(`Cleaning up ${toDelete.length} stale Power records...`);
    await prisma.power.deleteMany({
      where: {
        id: { in: toDelete },
      },
    });
  }

  // 4. Batch run the upsert queries in parallel chunks using our utility
  await batchPromises(tasks, async ({ item, characterId, transformationId }) => {
    const dataPayload = {
      type: item.type,
      source: item.source,
      description: item.description,
      isCanonical: item.isCanonical !== undefined ? item.isCanonical : true,
      sourceMaterial: item.sourceMaterial,
      transformationId,
    };

    await prisma.power.upsert({
      where: {
        characterId_name: {
          characterId,
          name: item.name,
        },
      },
      update: dataPayload,
      create: {
        characterId,
        name: item.name,
        ...dataPayload,
      },
    });
  });

  console.log("Power seeded successfully!");
}
