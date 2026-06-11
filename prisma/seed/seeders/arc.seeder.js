import prisma from "../../../src/database/prisma.js";
import ArcData from "../Data/arc.data.js";

export async function seedArcs() {
  console.log("Seeding Arc Data.....");

  for (const arc of ArcData) {
    await prisma.arc.upsert({
      where: {
        slug: arc.slug,
      },
      update: arc,
      create: arc,
    });
  }

  console.log("Arc Data seeded");
}
