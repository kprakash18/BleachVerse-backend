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

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "BleachVerse API Documentation",
    version: "1.0.0",
    description:
      "Comprehensive API endpoints for BleachVerse, exposing character, arc, episode, and fight resources.",
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
  },
  components: {
    schemas: {
      ...characterSchemas,
      ...arcSchemas,
      ...episodeSchemas,
      ...fightSchemas,
    },
  },
};

export default swaggerSpec;
