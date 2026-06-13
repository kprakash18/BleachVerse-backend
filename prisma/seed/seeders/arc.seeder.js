import prisma from "../../../src/database/prisma.js";
import ArcData from "../Data/arc.data.js";
import { batchPromises } from "../utils.js";

export async function seedArcs() {
  console.log("Seeding Arc Data.....");

  await batchPromises(ArcData, async (arc) => {
    await prisma.arc.upsert({
      where: {
        slug: arc.slug,
      },
      update: arc,
      create: arc,
    });
  });

  console.log("Arc Data seeded");
}
