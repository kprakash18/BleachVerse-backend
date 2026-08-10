import { characterPaths, characterSchemas } from "../modules/character/character.swagger.js";
import { arcPaths, arcSchemas } from "../modules/arc/arc.swagger.js";
import { episodePaths, episodeSchemas } from "../modules/episode/episode.swagger.js";
import { fightPaths, fightSchemas } from "../modules/fight/fight.swagger.js";
import { organizationPaths, organizationSchemas } from "../modules/organization/organization.swagger.js";
import { zanpakutoPaths, zanpakutoSchemas } from "../modules/zanpakuto/zanpakuto.swagger.js";
import { locationPaths, locationSchemas } from "../modules/location/location.swagger.js";
import { racePaths, raceSchemas } from "../modules/race/race.swagger.js";
import { quotePaths, quoteSchemas } from "../modules/quote/quote.swagger.js";
import { eventPaths, eventSchemas } from "../modules/event/event.swagger.js";
import { powerPaths, powerSchemas } from "../modules/power/power.swagger.js";
import { transformationPaths, transformationSchemas } from "../modules/transformation/transformation.swagger.js";
import { appearancePaths, appearanceSchemas } from "../modules/appearance/appearance.swagger.js";

const commonParameters = {
  PageParam: {
    name: "page",
    in: "query",
    description: "Page number for pagination",
    required: false,
    schema: { type: "integer", default: 1, minimum: 1 },
  },
  LimitParam: {
    name: "limit",
    in: "query",
    description: "Number of records per page (max: 100)",
    required: false,
    schema: { type: "integer", default: 10, minimum: 1, maximum: 100 },
  },
  SortByParam: {
    name: "sortBy",
    in: "query",
    description: "Field name to sort results by",
    required: false,
    schema: { type: "string" },
  },
  SortOrderParam: {
    name: "sortOrder",
    in: "query",
    description: "Order direction for sorting (asc or desc)",
    required: false,
    schema: { type: "string", enum: ["asc", "desc"], default: "asc" },
  },
  SearchParam: {
    name: "search",
    in: "query",
    description: "Text search query string",
    required: false,
    schema: { type: "string" },
  },
  SlugParam: {
    name: "slug",
    in: "path",
    description: "Resource slug identifier",
    required: true,
    schema: { type: "string" },
  },
  UUIDParam: {
    name: "id",
    in: "path",
    description: "UUID v4 resource identifier",
    required: true,
    schema: { type: "string", format: "uuid" },
  },
};

const commonSchemas = {
  PaginationMeta: {
    type: "object",
    required: ["page", "limit", "totalItems", "totalPages"],
    properties: {
      page: { type: "integer", example: 1 },
      limit: { type: "integer", example: 10 },
      totalItems: { type: "integer", example: 169 },
      totalPages: { type: "integer", example: 17 },
    },
  },
  ErrorResponse: {
    type: "object",
    required: ["error"],
    properties: {
      error: {
        type: "object",
        required: ["code", "message"],
        properties: {
          code: { type: "string", example: "VALIDATION_ERROR" },
          message: { type: "string", example: "Invalid parameter" },
        },
      },
    },
  },
};

const commonResponses = {
  ValidationError: {
    description: "Validation error (Zod schema rejection)",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  },
  NotFoundError: {
    description: "Resource not found",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  },
  InternalServerError: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  },
};

const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "BleachVerse REST API",
    version: "1.0.0",
    description:
      "Comprehensive API documentation for BleachVerse — exposing 32 GET endpoints across 13 modules.",
  },
  servers: [
    {
      url: "/api/v1",
      description: "BleachVerse API v1 Base Route",
    },
  ],
  tags: [
    { name: "Characters", description: "Character profiles and relationships" },
    { name: "Arcs", description: "Story arcs and sub-resources" },
    { name: "Episodes", description: "Anime episode catalog" },
    { name: "Fights", description: "Combat encounters and participants" },
    { name: "Organizations", description: "Factions and military divisions" },
    { name: "Zanpakutos", description: "Zanpakutō weapons and releases" },
    { name: "Locations", description: "Worlds, regions, and structures" },
    { name: "Races", description: "Races and character groupings" },
    { name: "Quotes", description: "Famous quotes and character quotes" },
    { name: "Events", description: "Major historical events" },
    { name: "Powers", description: "Abilities and techniques" },
    { name: "Transformations", description: "Forms and Bankai releases" },
    { name: "Appearances", description: "Character debut tracking" },
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
    ...eventPaths,
    ...powerPaths,
    ...transformationPaths,
    ...appearancePaths,
  },
  components: {
    parameters: commonParameters,
    responses: commonResponses,
    schemas: {
      ...commonSchemas,
      ...characterSchemas,
      ...arcSchemas,
      ...episodeSchemas,
      ...fightSchemas,
      ...organizationSchemas,
      ...zanpakutoSchemas,
      ...locationSchemas,
      ...raceSchemas,
      ...quoteSchemas,
      ...eventSchemas,
      ...powerSchemas,
      ...transformationSchemas,
      ...appearanceSchemas,
    },
  },
};

export default swaggerSpec;
