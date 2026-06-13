import prisma from "../../../src/database/prisma.js";
import characters from "../Data/character.data.js";

export async function seedCharacter() {
  console.log("Seeding Character Data....");

  for (const character of characters) {
    await prisma.character.upsert({
      where: {
        slug: character.slug,
      },
      update: character,
      create: character,
    });
  }

  console.log("Character Data seeded");
}
