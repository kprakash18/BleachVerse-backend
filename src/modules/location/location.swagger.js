import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const locationSchemas = {
  LocationType: {
    type: "string",
    enum: ["WORLD", "REGION", "STRUCTURE", "OTHER"],
    description: "Classification of location",
  },
  LocationSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Society" },
      slug: { type: "string", example: "soul-society" },
      type: { $ref: "#/components/schemas/LocationType" },
      description: {
        type: "string",
        nullable: true,
        example: "The realm where Soul Reapers dwell and souls reside.",
      },
    },
  },
  LocationDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Society" },
      slug: { type: "string", example: "soul-society" },
      type: { $ref: "#/components/schemas/LocationType" },
      description: {
        type: "string",
        nullable: true,
        example: "The realm where Soul Reapers dwell and souls reside.",
      },
      parent: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Human World" },
          slug: { type: "string", example: "human-world" },
        },
      },
      subLocations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Seireitei" },
            slug: { type: "string", example: "seireitei" },
            type: { $ref: "#/components/schemas/LocationType" },
          },
        },
      },
      fights: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", example: "Ichigo Kurosaki vs. Kenpachi Zaraki" },
            slug: { type: "string", example: "ichigo-kurosaki-vs-kenpachi-zaraki" },
            type: { type: "string", example: "DUEL" },
          },
        },
      },
    },
  },
  LocationListResponse: paginatedListSchema("#/components/schemas/LocationSummary"),
  LocationDetailResponse: singleItemSchema("#/components/schemas/LocationDetail"),
};

export const locationPaths = {
  "/api/v1/locations": {
    get: {
      tags: ["Locations"],
      summary: "Get all locations",
      description: "Retrieve a paginated list of locations with optional name search and type filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search location by name (case-insensitive substring)"),
        queryParam("type", "Filter by location type (WORLD, REGION, STRUCTURE, OTHER)", "string", {
          $ref: "#/components/schemas/LocationType",
        }),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["name"], default: "name" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/LocationListResponse", "A paginated list of locations"),
    },
  },
  "/api/v1/locations/{slug}": {
    get: {
      tags: ["Locations"],
      summary: "Get location details by slug",
      description: "Retrieve comprehensive details for a single location including parent location, sub-locations, and battles fought there.",
      parameters: [pathParam("slug", "The unique location slug (e.g. 'soul-society')")],
      responses: detailResponses("#/components/schemas/LocationDetailResponse", "Detailed location information", "Location not found"),
    },
  },
};
