import prisma from "../../../src/database/prisma.js";
import characterRaces from "../Data/characterRace.data.js";
import { batchPromises } from "../utils.js";

export async function seedCharacterRaces() {
  console.log("Seeding Character Races...");

  // 1. Fetch all characters (id and name) and races (id and name) from the database
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });
  const races = await prisma.race.findMany({
    select: { id: true, name: true },
  });

  // 2. Map names to their corresponding database IDs
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));
  const raceMap = new Map(races.map((r) => [r.name, r.id]));

  // 3. Flatten relationships into tasks
  const tasks = [];
  for (const item of characterRaces) {
    const characterId = characterMap.get(item.characterName);
    if (!characterId) {
      console.warn(`Character with name "${item.characterName}" not found in database.`);
      continue;
    }

    for (const raceName of item.races) {
      const raceId = raceMap.get(raceName);
      if (!raceId) {
        console.warn(`Race with name "${raceName}" not found in database.`);
        continue;
      }
      tasks.push({ characterId, raceId });
    }
  }

  // 4. Batch run the upsert queries in parallel chunks
  await batchPromises(tasks, async ({ characterId, raceId }) => {
    await prisma.characterRace.upsert({
      where: {
        characterId_raceId: {
          characterId,
          raceId,
        },
      },
      update: {},
      create: {
        characterId,
        raceId,
      },
    });
  });

  console.log("Character Races seeded successfully!");
}
