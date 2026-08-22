import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const characterSchemas = {
  Sex: {
    type: "string",
    enum: ["MALE", "FEMALE", "UNKNOWN"],
    description: "The sex of the character",
  },
  CharacterStatus: {
    type: "string",
    enum: ["ALIVE", "DEAD", "UNKNOWN"],
    description: "The alive or dead status of the character",
  },
  Character: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid", example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" },
      slug: { type: "string", example: "ichigo-kurosaki" },
      name: { type: "string", example: "Ichigo Kurosaki" },
      sex: { $ref: "#/components/schemas/Sex" },
      status: { $ref: "#/components/schemas/CharacterStatus" },
      description: {
        type: "string",
        nullable: true,
        example: "The main protagonist of the series, a Substitute Soul Reaper.",
      },
      createdAt: { type: "string", format: "date-time", example: "2026-06-24T10:00:00.000Z" },
      updatedAt: { type: "string", format: "date-time", example: "2026-06-24T10:00:00.000Z" },
    },
  },
  CharacterAlias: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      characterId: { type: "string", format: "uuid" },
      alias: { type: "string", example: "Strawberry" },
      createdAt: { type: "string", format: "date-time" },
    },
  },
  Race: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string", example: "Soul Reaper" },
      category: { type: "string", enum: ["MAIN", "HYBRID", "SPECIAL", "COSMIC"], example: "MAIN" },
      description: {
        type: "string",
        nullable: true,
        example: "Spiritual beings who govern the flow of souls.",
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  CharacterRace: {
    type: "object",
    properties: {
      characterId: { type: "string", format: "uuid" },
      raceId: { type: "string", format: "uuid" },
      race: { $ref: "#/components/schemas/Race" },
    },
  },
  Organization: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      slug: { type: "string", example: "gotei-13" },
      name: { type: "string", example: "Gotei 13" },
      type: { type: "string", enum: ["MILITARY", "FACTION", "ROYAL", "ACADEMY", "OTHER"], example: "MILITARY" },
      description: { type: "string", nullable: true },
      parentId: { type: "string", format: "uuid", nullable: true },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  CharacterOrganization: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      characterId: { type: "string", format: "uuid" },
      organizationId: { type: "string", format: "uuid" },
      role: { type: "string", nullable: true, example: "Substitute Soul Reaper" },
      joinedAt: { type: "string", format: "date-time", nullable: true },
      leftAt: { type: "string", format: "date-time", nullable: true },
      organization: { $ref: "#/components/schemas/Organization" },
    },
  },
  CharacterDetails: {
    allOf: [
      { $ref: "#/components/schemas/Character" },
      {
        type: "object",
        properties: {
          aliases: {
            type: "array",
            items: { $ref: "#/components/schemas/CharacterAlias" },
          },
          races: {
            type: "array",
            items: { $ref: "#/components/schemas/CharacterRace" },
          },
          organizations: {
            type: "array",
            items: { $ref: "#/components/schemas/CharacterOrganization" },
          },
        },
      },
    ],
  },
  CharacterListResponse: paginatedListSchema("#/components/schemas/Character"),
  CharacterDetailsResponse: singleItemSchema("#/components/schemas/CharacterDetails"),
};

export const characterPaths = {
  "/api/v1/characters": {
    get: {
      tags: ["Characters"],
      summary: "Get all characters",
      description: "Retrieve a paginated list of all characters with optional filtering and search.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search character by name (case-insensitive substring)"),
        queryParam("status", "Filter characters by status", "string", { enum: ["ALIVE", "DEAD", "UNKNOWN"] }),
        queryParam("sex", "Filter characters by sex", "string", { enum: ["MALE", "FEMALE", "UNKNOWN"] }),
        queryParam("sortBy", "Field to sort the results by", "string", {
          enum: ["name", "createdAt", "updatedAt"],
          default: "name",
        }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses(
        "#/components/schemas/CharacterListResponse",
        "A paginated list of characters"
      ),
    },
  },
  "/api/v1/characters/{slug}": {
    get: {
      tags: ["Characters"],
      summary: "Get character details by slug",
      description: "Retrieve comprehensive details for a single character using their unique URL-friendly slug.",
      parameters: [pathParam("slug", "The unique character slug (e.g. 'ichigo-kurosaki')")],
      responses: detailResponses(
        "#/components/schemas/CharacterDetailsResponse",
        "Detailed character information",
        "Character not found"
      ),
    },
  },
};
