import prisma from "../src/database/prisma.js";
import { seedOrganization } from "./seed/seeders/organization.seeder.js";
import { seedRace } from "./seed/seeders/race.seeder.js";
import { seedLocations } from "./seed/seeders/location.seeder.js";
import { seedArcs } from "./seed/seeders/arc.seeder.js";
import { seedEpisodes } from "./seed/seeders/episode.seeder.js";
import { seedCharacter } from "./seed/seeders/character.seeder.js";
async function main() {
  await seedOrganization();
  await seedRace();
  await seedLocations();
  await seedArcs();
  await seedEpisodes();
  await seedCharacter();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
