import prisma from "../../../src/database/prisma.js";
import fightData from "../Data/fight.data.js";
import { batchPromises } from "../utils.js";

export async function seedFights() {
  console.log("Seeding Fight Data...");

  // 1. Fetch referenced entities
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });
  const locations = await prisma.location.findMany({
    select: { id: true, slug: true },
  });
  const episodes = await prisma.episode.findMany({
    select: { id: true, number: true },
  });
  const arcs = await prisma.arc.findMany({
    select: { id: true, slug: true },
  });

  // 2. Build mapping lookup maps
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));
  const locationMap = new Map(locations.map((l) => [l.slug, l.id]));
  const episodeMap = new Map(episodes.map((e) => [e.number, e.id]));
  const arcMap = new Map(arcs.map((a) => [a.slug, a.id]));

  // 3. Seed fights and related entities
  await batchPromises(fightData, async (item) => {
    const episodeId = item.episodeNumber ? episodeMap.get(item.episodeNumber) : null;
    const arcId = item.arcSlug ? arcMap.get(item.arcSlug) : null;
    const locationId = item.locationSlug ? locationMap.get(item.locationSlug) : null;
    const winnerId = item.winnerName ? characterMap.get(item.winnerName) : null;

    if (item.episodeNumber && !episodeId) {
      console.warn(`Episode number "${item.episodeNumber}" not found for fight "${item.title}".`);
    }
    if (item.arcSlug && !arcId) {
      console.warn(`Arc slug "${item.arcSlug}" not found for fight "${item.title}".`);
    }
    if (item.locationSlug && !locationId) {
      console.warn(`Location slug "${item.locationSlug}" not found for fight "${item.title}".`);
    }
    if (item.winnerName && !winnerId) {
      console.warn(`Winner name "${item.winnerName}" not found for fight "${item.title}".`);
    }

    // Upsert the fight
    const fight = await prisma.fight.upsert({
      where: {
        slug: item.slug,
      },
      update: {
        title: item.title,
        type: item.type,
        summary: item.summary,
        episodeId,
        arcId,
        locationId,
        winnerId,
      },
      create: {
        slug: item.slug,
        title: item.title,
        type: item.type,
        summary: item.summary,
        episodeId,
        arcId,
        locationId,
        winnerId,
      },
    });
  });

  console.log("Fight Data seeded successfully!");
}
