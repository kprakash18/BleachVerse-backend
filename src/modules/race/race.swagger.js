import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const raceSchemas = {
  RaceCategory: {
    type: "string",
    enum: ["MAIN", "HYBRID", "SPECIAL", "COSMIC"],
    description: "Race category classification",
  },
  RaceSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Reaper" },
      category: { $ref: "#/components/schemas/RaceCategory" },
      description: {
        type: "string",
        nullable: true,
        example: "Spiritual beings who govern the flow of souls.",
      },
    },
  },
  RaceDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Reaper" },
      category: { $ref: "#/components/schemas/RaceCategory" },
      description: {
        type: "string",
        nullable: true,
        example: "Spiritual beings who govern the flow of souls.",
      },
      characters: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Ichigo Kurosaki" },
            slug: { type: "string", example: "ichigo-kurosaki" },
          },
        },
      },
    },
  },
  RaceListResponse: paginatedListSchema("#/components/schemas/RaceSummary"),
  RaceDetailResponse: singleItemSchema("#/components/schemas/RaceDetail"),
};

export const racePaths = {
  "/api/v1/races": {
    get: {
      tags: ["Races"],
      summary: "Get all races",
      description: "Retrieve a paginated list of races with optional search and category filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search race by name (case-insensitive substring)"),
        queryParam("category", "Filter by race category (MAIN, HYBRID, SPECIAL, COSMIC)", "string", {
          $ref: "#/components/schemas/RaceCategory",
        }),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["name"], default: "name" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/RaceListResponse", "A paginated list of races"),
    },
  },
  "/api/v1/races/{name}": {
    get: {
      tags: ["Races"],
      summary: "Get race details by name",
      description: "Retrieve comprehensive details for a single race including characters belonging to that race.",
      parameters: [pathParam("name", "The race name (e.g. 'Soul Reaper' or 'soul-reaper')")],
      responses: detailResponses("#/components/schemas/RaceDetailResponse", "Detailed race information", "Race not found"),
    },
  },
};
