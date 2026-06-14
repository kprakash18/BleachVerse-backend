import prisma from "../../../src/database/prisma.js";
import eventParticipants from "../Data/eventParticipant.data.js";
import { batchPromises } from "../utils.js";

export async function seedEventParticipants() {
  console.log("Seeding Event Participant Data...");

  // 1. Fetch referenced entities
  //    Characters are looked up by slug (safer than name — slugs never change)
  const characters = await prisma.character.findMany({
    select: { id: true, slug: true },
  });
  const events = await prisma.event.findMany({
    select: { id: true, slug: true },
  });

  // 2. Build lookup maps keyed by slug
  const characterMap = new Map(characters.map((c) => [c.slug, c.id]));
  const eventMap = new Map(events.map((e) => [e.slug, e.id]));

  // 3. Upsert event participants — fail fast on bad seed data
  let seededCount = 0;

  await batchPromises(eventParticipants, async (item) => {
    const eventId = eventMap.get(item.eventSlug);
    const characterId = characterMap.get(item.characterSlug);

    if (!eventId) {
      throw new Error(
        `Event not found: "${item.eventSlug}" (from eventTitle: "${item.eventTitle}")`
      );
    }
    if (!characterId) {
      throw new Error(
        `Character not found: "${item.characterSlug}" (from characterName: "${item.characterName}")`
      );
    }

    await prisma.eventParticipant.upsert({
      where: {
        eventId_characterId: {
          eventId,
          characterId,
        },
      },
      update: {
        role: item.role,
      },
      create: {
        eventId,
        characterId,
        role: item.role,
      },
    });

    seededCount++;
  });

  console.log(`Event Participants seeded successfully! (${seededCount})`);
}
