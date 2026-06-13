import prisma from "../../../src/database/prisma.js";
import races from "../Data/race.data.js";
import { batchPromises } from "../utils.js";

export async function seedRace() {
  console.log("Seeding Race Data....");

  await batchPromises(races, async (r) => {
    await prisma.race.upsert({
      where: {
        name: r.name,
      },
      update: r,
      create: r,
    });
  });

  console.log("Race Seeded");
}
