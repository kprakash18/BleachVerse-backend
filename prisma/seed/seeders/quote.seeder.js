import slugify from "slugify";
import prisma from "../../../src/database/prisma.js";
import quoteData from "../Data/quote.data.js";
import { batchPromises } from "../utils.js";

const toSlug = (name) => slugify(name, { lower: true, strict: true });

export async function seedQuotes() {
  console.log("Seeding Quote Data...");

  // 1. Fetch referenced entities
  const characters = await prisma.character.findMany({
    select: { id: true, slug: true },
  });
  const arcs = await prisma.arc.findMany({
    select: { id: true, slug: true },
  });
  const episodes = await prisma.episode.findMany({
    select: { id: true, number: true },
  });

  // 2. Build slug-keyed lookup maps
  const characterMap = new Map(characters.map((c) => [c.slug, c.id]));
  const arcMap = new Map(arcs.map((a) => [a.slug, a.id]));
  const episodeMap = new Map(episodes.map((e) => [e.number, e.id]));

  // 3. Seed quotes
  //    Quote has no @@unique beyond id, so we check for an existing record
  //    by (characterId + text) before inserting to keep the seeder idempotent.
  let createdCount = 0;
  let skippedCount = 0;

  await batchPromises(quoteData, async (item) => {
    const characterId = characterMap.get(toSlug(item.characterName));
    const arcId = item.arcName
      ? (arcMap.get(toSlug(item.arcName)) ?? null)
      : null;
    const episodeId = item.episodeId
      ? (episodeMap.get(item.episodeId) ?? null)
      : null;

    if (!characterId) {
      throw new Error(
        `Character not found: "${item.characterName}" (slug: ${toSlug(item.characterName)})`,
      );
    }
    if (item.arcName && !arcId) {
      console.warn(
        `Arc "${item.arcName}" not found for quote by "${item.characterName}".`,
      );
    }

    // Idempotency check — skip if the exact same quote already exists for this character
    const existing = await prisma.quote.findFirst({
      where: { characterId, text: item.text },
      select: { id: true },
    });

    if (existing) {
      skippedCount++;
      return;
    }

    await prisma.quote.create({
      data: {
        text: item.text,
        category: item.category,
        isCanonical: item.isCanonical,
        sourceMaterial: item.sourceMaterial,
        characterId,
        arcId,
        episodeId,
      },
    });

    createdCount++;
  });

  console.log(
    `Quote Data seeded successfully! (created: ${createdCount}, skipped: ${skippedCount})`,
  );
}
