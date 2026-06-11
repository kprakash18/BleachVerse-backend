import prisma from "../../../src/database/prisma.js";
import races from "../Data/race.data.js";

export async function seedRace() {
  console.log("Seeding Race Data....");

  for (const r of races) {
    await prisma.race.upsert({
      where: {
        name: r.name,
      },
      update: r,
      create: r,
    });
  }

  console.log("Race Seeded");
}
