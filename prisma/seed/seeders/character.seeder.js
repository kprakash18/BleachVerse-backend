import prisma from "../../../src/database/prisma.js";
import characters from "../Data/character.data.js";
import { batchPromises } from "../utils.js";

export async function seedCharacter() {
  console.log("Seeding Character Data....");

  await batchPromises(characters, async (character) => {
    await prisma.character.upsert({
      where: {
        slug: character.slug,
      },
      update: character,
      create: character,
    });
  });

  console.log("Character Data seeded");
}
