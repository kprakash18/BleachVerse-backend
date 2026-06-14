import slugify from "slugify";
import prisma from "../../../src/database/prisma.js";
import eventData from "../Data/event.data.js";
import { batchPromises } from "../utils.js";

// Consistent slug helper — same options used across all seed files
const toSlug = (name) => slugify(name, { lower: true, strict: true });

export async function seedEvents() {
  console.log("Seeding Event Data...");

  // 1. Fetch all referenced entities upfront
  const arcs = await prisma.arc.findMany({
    select: { id: true, slug: true },
  });
  const locations = await prisma.location.findMany({
    select: { id: true, slug: true },
  });
  const episodes = await prisma.episode.findMany({
    select: { id: true, number: true },
  });

  // 2. Build lookup maps keyed by slug (computed consistently via slugify)
  //    arcName / locationName in event.data.js are slugified at lookup time,
  //    so minor name differences (colons, casing) never cause mismatches.
  const arcMap = new Map(arcs.map((a) => [a.slug, a.id]));
  const locationMap = new Map(locations.map((l) => [l.slug, l.id]));
  const episodeMap = new Map(episodes.map((e) => [e.number, e.id]));

  // 3. Upsert events
  await batchPromises(eventData, async (item) => {
    const episodeId = item.episodeNumber
      ? (episodeMap.get(item.episodeNumber) ?? null)
      : null;
    const arcId = item.arcName
      ? (arcMap.get(toSlug(item.arcName)) ?? null)
      : null;
    const locationId = item.locationName
      ? (locationMap.get(toSlug(item.locationName)) ?? null)
      : null;

    if (item.episodeNumber && !episodeId) {
      console.warn(
        `Episode ${item.episodeNumber} not found for event "${item.title}".`
      );
    }
    if (item.arcName && !arcId) {
      console.warn(
        `Arc "${item.arcName}" (slug: ${toSlug(item.arcName)}) not found for event "${item.title}".`
      );
    }
    if (item.locationName && !locationId) {
      console.warn(
        `Location "${item.locationName}" (slug: ${toSlug(item.locationName)}) not found for event "${item.title}".`
      );
    }

    await prisma.event.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        type: item.type,
        description: item.description,
        isCanonical: item.isCanonical,
        sourceMaterial: item.sourceMaterial,
        episodeId,
        arcId,
        locationId,
      },
      create: {
        slug: item.slug,
        title: item.title,
        type: item.type,
        description: item.description,
        isCanonical: item.isCanonical,
        sourceMaterial: item.sourceMaterial,
        episodeId,
        arcId,
        locationId,
      },
    });
  });

  console.log("Event Data seeded successfully!");
}
