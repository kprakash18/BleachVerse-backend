import prisma from "../../../src/database/prisma.js";
import characterOrganizations from "../Data/characterOrganization.data.js";

export async function seedCharacterOrganizations() {
  console.log("Seeding Character Organizations...");

  // 1. Fetch all characters (id and name) and organizations (id and slug) from the database
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });
  const organizations = await prisma.organization.findMany({
    select: { id: true, slug: true },
  });

  // 2. Map names and slugs to their corresponding database IDs
  const characterMap = new Map(characters.map((c) => [c.name, c.id]));
  const organizationMap = new Map(organizations.map((o) => [o.slug, o.id]));

  // 3. Loop through organization relationships and create them
  for (const item of characterOrganizations) {
    const characterId = characterMap.get(item.characterName);
    if (!characterId) {
      console.warn(`Character "${item.characterName}" not found in database.`);
      continue;
    }

    const organizationId = organizationMap.get(item.organizationSlug);
    if (!organizationId) {
      console.warn(`Organization slug "${item.organizationSlug}" not found in database.`);
      continue;
    }

    // 4. Check if the relationship already exists to prevent duplicate seeds
    const existingRelation = await prisma.characterOrganization.findFirst({
      where: {
        characterId,
        organizationId,
        role: item.role,
      },
    });

    if (!existingRelation) {
      await prisma.characterOrganization.create({
        data: {
          characterId,
          organizationId,
          role: item.role,
        },
      });
    }
  }

  console.log("Character Organizations seeded successfully!");
}
