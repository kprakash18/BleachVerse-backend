import prisma from "../../../src/database/prisma.js";
import locations from "../Data/location.data.js";

export async function seedLocations() {
  // Create/Update locations
  for (const { parentSlug, ...location } of locations) {
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
  }

  // Create hierarchy
  for (const location of locations) {
    if (!location.parentSlug) continue;

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
  }

  console.log("Locations seeded");
}
