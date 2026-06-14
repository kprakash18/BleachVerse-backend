import prisma from "../../../src/database/prisma.js";
import locations from "../Data/location.data.js";
import { batchPromises } from "../utils.js";

export async function seedLocations() {
  console.log("Seeding location Data......");
  
  // Create/Update locations
  await batchPromises(locations, async ({ parentSlug, parentName, ...location }) => {
    await prisma.location.upsert({
      where: {
        slug: location.slug,
      },
      update: {
        name: location.name,
        type: location.type,
        description: location.description,
      },
      create: location,
    });
  });

  // Create hierarchy
  await batchPromises(locations, async (location) => {
    if (!location.parentSlug) return;

    const parent = await prisma.location.findUnique({
      where: {
        slug: location.parentSlug,
      },
      select: {
        id: true,
      },
    });

    if (!parent) {
      throw new Error(`Parent location '${location.parentSlug}' not found`);
    }

    await prisma.location.update({
      where: {
        slug: location.slug,
      },
      data: {
        parentId: parent.id,
      },
    });
  });

  console.log("Locations seeded");
}
