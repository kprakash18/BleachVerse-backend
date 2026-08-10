import {
  characterPaths,
  characterSchemas,
} from "../modules/character/character.swagger.js";
import { arcPaths, arcSchemas } from "../modules/arc/arc.swagger.js";
import {
  episodePaths,
  episodeSchemas,
} from "../modules/episode/episode.swagger.js";
import {
  fightPaths,
  fightSchemas,
} from "../modules/fight/fight.swagger.js";
import {
  organizationPaths,
  organizationSchemas,
} from "../modules/organization/organization.swagger.js";
import {
  zanpakutoPaths,
  zanpakutoSchemas,
} from "../modules/zanpakuto/zanpakuto.swagger.js";
import {
  locationPaths,
  locationSchemas,
} from "../modules/location/location.swagger.js";
import {
  racePaths,
  raceSchemas,
} from "../modules/race/race.swagger.js";
import {
  quotePaths,
  quoteSchemas,
} from "../modules/quote/quote.swagger.js";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "BleachVerse API Documentation",
    version: "1.0.0",
    description:
      "Comprehensive API endpoints for BleachVerse, exposing character, arc, episode, fight, organization, zanpakuto, location, race, and quote resources.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development Server",
    },
  ],
  paths: {
    ...characterPaths,
    ...arcPaths,
    ...episodePaths,
    ...fightPaths,
    ...organizationPaths,
    ...zanpakutoPaths,
    ...locationPaths,
    ...racePaths,
    ...quotePaths,
  },
  components: {
    schemas: {
      ...characterSchemas,
      ...arcSchemas,
      ...episodeSchemas,
      ...fightSchemas,
      ...organizationSchemas,
      ...zanpakutoSchemas,
      ...locationSchemas,
      ...raceSchemas,
      ...quoteSchemas,
    },
  },
};

export default swaggerSpec;
