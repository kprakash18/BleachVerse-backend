import prisma from "../../../src/database/prisma.js";
import transformations from "../Data/transformation.data.js";
import { batchPromises } from "../utils.js";

export async function seedTransformation() {
  console.log("Seeding Transformation Data...");

  // Clean up any Transformation records that are no longer in the seed data
  const seedNames = transformations.map((t) => t.name);
  await prisma.transformation.deleteMany({
    where: {
      name: {
        notIn: seedNames,
      },
    },
  });

  // 1. Fetch relations to map names/numbers to database IDs
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));

  const zanpakutos = await prisma.zanpakuto.findMany({
    select: { id: true, name: true },
  });
  const zanpakutoMap = new Map(zanpakutos.map((z) => [z.name, z.id]));

  const episodes = await prisma.episode.findMany({
    select: { id: true, number: true },
  });
  const episodeMap = new Map(episodes.map((e) => [e.number, e.id]));

  const fights = await prisma.fight.findMany({
    select: { id: true, slug: true },
  });
  const fightMap = new Map(fights.map((f) => [f.slug, f.id]));

  // 2. Loop through the transformation data and build tasks
  const tasks = [];
  for (const item of transformations) {
    const characterId = characterMap.get(item.characterName);
    if (!characterId) {
      console.warn(
        `Character with name "${item.characterName}" not found in database. Skipping Transformation "${item.name}".`
      );
      continue;
    }

    const zanpakutoId = item.zanpakutoName
      ? zanpakutoMap.get(item.zanpakutoName) || null
      : null;

    if (item.zanpakutoName && !zanpakutoId) {
      console.warn(
        `Zanpakuto with name "${item.zanpakutoName}" not found in database for Transformation "${item.name}". Proceeding with null zanpakutoId.`
      );
    }

    const firstEpisodeId = item.firstEpisodeNumber
      ? episodeMap.get(item.firstEpisodeNumber) || null
      : null;

    if (item.firstEpisodeNumber && !firstEpisodeId) {
      console.warn(
        `Episode with number "${item.firstEpisodeNumber}" not found in database for Transformation "${item.name}". Proceeding with null firstEpisodeId.`
      );
    }

    const firstFightId = item.firstFightSlug
      ? fightMap.get(item.firstFightSlug) || null
      : null;

    if (item.firstFightSlug && !firstFightId) {
      console.warn(
        `Fight with slug "${item.firstFightSlug}" not found in database for Transformation "${item.name}". Proceeding with null firstFightId.`
      );
    }

    tasks.push({ item, characterId, zanpakutoId, firstEpisodeId, firstFightId });
  }

  // 3. Batch run the upsert queries in parallel chunks
  await batchPromises(tasks, async ({ item, characterId, zanpakutoId, firstEpisodeId, firstFightId }) => {
    // Check if the transformation already exists for this character
    const existing = await prisma.transformation.findFirst({
      where: {
        name: item.name,
        characterId,
      },
    });

    const dataPayload = {
      type: item.type,
      description: item.description,
      isCanonical: item.isCanonical !== undefined ? item.isCanonical : true,
      sourceMaterial: item.sourceMaterial,
      zanpakutoId,
      firstEpisodeId,
      firstFightId,
    };

    if (existing) {
      await prisma.transformation.update({
        where: { id: existing.id },
        data: dataPayload,
      });
    } else {
      await prisma.transformation.create({
        data: {
          name: item.name,
          characterId,
          ...dataPayload,
        },
      });
    }
  });

  console.log("Transformation seeded successfully!");
}
