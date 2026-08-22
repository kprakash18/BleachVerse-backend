import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const powerSchemas = {
  PowerType: {
    type: "string",
    enum: ["OFFENSIVE", "DEFENSIVE", "SUPPORT", "HEALING", "MOVEMENT", "PASSIVE", "OTHER"],
    description: "Type of power technique",
  },
  PowerSource: {
    type: "string",
    enum: ["ZANPAKUTO", "KIDO", "HOLLOW", "QUINCY", "FULLBRING", "NATURAL", "OTHER"],
    description: "Source material classification of power",
  },
  PowerSummary: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string", example: "Getsuga Tensho" },
      type: { $ref: "#/components/schemas/PowerType" },
      source: { $ref: "#/components/schemas/PowerSource" },
      description: {
        type: "string",
        nullable: true,
        example: "Fires a concentrated energy blast from the tip of the blade.",
      },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
      transformation: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Bankai: Tensa Zangetsu" },
          type: { type: "string", example: "BANKAI" },
        },
      },
    },
  },
  PowerDetail: {
    allOf: [
      { $ref: "#/components/schemas/PowerSummary" },
      {
        type: "object",
        properties: {
          isCanonical: { type: "boolean", example: true },
          sourceMaterial: { $ref: "#/components/schemas/SourceMaterial" },
        },
      },
    ],
  },
  PowerListResponse: paginatedListSchema("#/components/schemas/PowerSummary"),
  PowerDetailResponse: singleItemSchema("#/components/schemas/PowerDetail"),
};

export const powerPaths = {
  "/api/v1/powers": {
    get: {
      tags: ["Powers"],
      summary: "Get all powers",
      description:
        "Retrieve a paginated list of special powers and techniques with optional name search, type filtering, source filtering, and character filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search power by name (case-insensitive substring)"),
        queryParam("type", "Filter by power type", "string", { $ref: "#/components/schemas/PowerType" }),
        queryParam("source", "Filter by power source (ZANPAKUTO, KIDO, HOLLOW, etc.)", "string", {
          $ref: "#/components/schemas/PowerSource",
        }),
        queryParam("sourceMaterial", "Filter by source material origin (MANGA, ANIME, MOVIE, etc.)", "string", {
          $ref: "#/components/schemas/SourceMaterial",
        }),
        queryParam("characterSlug", "Filter powers by character slug"),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["name"], default: "name" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/PowerListResponse", "A paginated list of powers"),
    },
  },
  "/api/v1/powers/{id}": {
    get: {
      tags: ["Powers"],
      summary: "Get power details by ID",
      description: "Retrieve comprehensive details for a single power technique by its UUID.",
      parameters: [pathParam("id", "The power UUID", { type: "string", format: "uuid" })],
      responses: detailResponses("#/components/schemas/PowerDetailResponse", "Detailed power information", "Power not found"),
    },
  },
};
