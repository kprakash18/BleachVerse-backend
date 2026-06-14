import prisma from "../../../src/database/prisma.js";
import fightParticipants from "../Data/fightParticipant.data.js";
import { batchPromises } from "../utils.js";

export async function seedFightParticipants() {
  console.log("Seeding Fight Participant Data...");

  // 1. Fetch referenced entities
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });
  const fights = await prisma.fight.findMany({
    select: { id: true, slug: true },
  });

  // 2. Build mapping lookup maps
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));
  const fightMap = new Map(fights.map((f) => [f.slug, f.id]));

  // 3. Seed participants
  await batchPromises(fightParticipants, async (item) => {
    const fightId = fightMap.get(item.fightSlug);
    const characterId = characterMap.get(item.characterName);

    if (!fightId) {
      console.warn(`Fight slug "${item.fightSlug}" not found for participant seeding.`);
      return;
    }
    if (!characterId) {
      console.warn(`Character "${item.characterName}" not found for participant seeding.`);
      return;
    }

    await prisma.fightParticipant.upsert({
      where: {
        fightId_characterId: {
          fightId,
          characterId,
        },
      },
      update: {
        outcome: item.outcome,
      },
      create: {
        fightId,
        characterId,
        outcome: item.outcome,
      },
    });
  });

  console.log("Fight Participants seeded successfully!");
}
