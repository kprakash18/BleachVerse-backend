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

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "BleachVerse API Documentation",
    version: "1.0.0",
    description:
      "Comprehensive API endpoints for BleachVerse, exposing character, arc, episode, fight, organization, and zanpakuto resources.",
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
  },
  components: {
    schemas: {
      ...characterSchemas,
      ...arcSchemas,
      ...episodeSchemas,
      ...fightSchemas,
      ...organizationSchemas,
      ...zanpakutoSchemas,
    },
  },
};

export default swaggerSpec;
