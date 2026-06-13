import prisma from "../src/database/prisma.js";
import { seedOrganization } from "./seed/seeders/organization.seeder.js";
import { seedRace } from "./seed/seeders/race.seeder.js";
import { seedLocations } from "./seed/seeders/location.seeder.js";
import { seedArcs } from "./seed/seeders/arc.seeder.js";
import { seedEpisodes } from "./seed/seeders/episode.seeder.js";
import { seedCharacter } from "./seed/seeders/character.seeder.js";
import { seedCharacterRaces } from "./seed/seeders/characterRace.seeder.js";
import { seedCharacterOrganizations } from "./seed/seeders/characterOrganization.seeder.js";
import { seedCharacterAliases } from "./seed/seeders/characterAlias.seeder.js";
import { seedZanpakuto } from "./seed/seeders/zanpakuto.seeder.js";

async function main() {
  // await seedOrganization();
  // await seedRace();
  // await seedLocations();
  // await seedArcs();
  // await seedEpisodes();
  await seedCharacter();
  // await seedCharacterRaces();
  // await seedCharacterOrganizations();
  // await seedCharacterAliases();
  await seedZanpakuto();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
