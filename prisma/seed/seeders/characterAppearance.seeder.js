import prisma from "../../../src/database/prisma.js";
import characterAppearances from "../Data/characterAppearance.data.js";
import { batchPromises } from "../utils.js";

export async function seedCharacterAppearances() {
  console.log("Seeding Character Appearance Data...");

  // 1. Fetch referenced entities
  const characters = await prisma.character.findMany({
    select: { id: true, slug: true },
  });
  const episodes = await prisma.episode.findMany({
    select: { id: true, number: true },
  });

  // 2. Build lookup maps
  const characterMap = new Map(characters.map((c) => [c.slug, c.id]));
  const episodeMap = new Map(episodes.map((e) => [e.number, e.id]));

  // 3. Flatten and perform batch upsert
  let seededCount = 0;

  await batchPromises(characterAppearances, async (item) => {
    const characterId = characterMap.get(item.characterSlug);
    const episodeId = episodeMap.get(item.episodeNumber);

    if (!characterId) {
      throw new Error(
        `Character not found: "${item.characterSlug}"`
      );
    }
    if (!episodeId) {
      throw new Error(
        `Episode number not found: ${item.episodeNumber}`
      );
    }

    await prisma.characterAppearance.upsert({
      where: {
        characterId_episodeId: {
          characterId,
          episodeId,
        },
      },
      update: {
        isFirstAppearance: item.isFirstAppearance,
      },
      create: {
        characterId,
        episodeId,
        isFirstAppearance: item.isFirstAppearance,
      },
    });

    seededCount++;
  });

  console.log(`Character Appearances seeded successfully! (${seededCount})`);
}
