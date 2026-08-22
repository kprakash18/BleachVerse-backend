import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const zanpakutoSchemas = {
  ZanpakutoType: {
    type: "string",
    enum: ["NORMAL", "DUAL", "HYBRID"],
    description: "Type or form classification of the Zanpakutō",
  },
  ZanpakutoSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Zangetsu" },
      slug: { type: "string", example: "zangetsu" },
      type: { $ref: "#/components/schemas/ZanpakutoType" },
      releaseCommand: { type: "string", nullable: true, example: "Getsuga Tensho" },
      spiritName: { type: "string", nullable: true, example: "Old Man Zangetsu" },
      wielder: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
    },
  },
  ZanpakutoDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Zangetsu" },
      slug: { type: "string", example: "zangetsu" },
      type: { $ref: "#/components/schemas/ZanpakutoType" },
      releaseCommand: { type: "string", nullable: true, example: "Getsuga Tensho" },
      spiritName: { type: "string", nullable: true, example: "Old Man Zangetsu" },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo Kurosaki's Zanpakutō, taking the form of a large cleaver.",
      },
      wielder: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
      aliases: {
        type: "array",
        items: { type: "string", example: "Slay the Moon" },
      },
      transformations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Bankai: Tensa Zangetsu" },
            type: { type: "string", example: "BANKAI" },
            description: { type: "string", nullable: true },
          },
        },
      },
    },
  },
  ZanpakutoListResponse: paginatedListSchema("#/components/schemas/ZanpakutoSummary"),
  ZanpakutoDetailResponse: singleItemSchema("#/components/schemas/ZanpakutoDetail"),
};

export const zanpakutoPaths = {
  "/api/v1/zanpakutos": {
    get: {
      tags: ["Zanpakutos"],
      summary: "Get all Zanpakutos",
      description: "Retrieve a paginated list of Zanpakutō weapons with optional search, type filtering, and wielder filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search Zanpakutō by name (case-insensitive substring)"),
        queryParam("type", "Filter by Zanpakutō type (NORMAL, DUAL, HYBRID)", "string", {
          $ref: "#/components/schemas/ZanpakutoType",
        }),
        queryParam("wielderSlug", "Filter Zanpakutō by wielder character slug"),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["name"], default: "name" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/ZanpakutoListResponse", "A paginated list of Zanpakutos"),
    },
  },
  "/api/v1/zanpakutos/{slug}": {
    get: {
      tags: ["Zanpakutos"],
      summary: "Get Zanpakuto details by slug",
      description: "Retrieve comprehensive details for a single Zanpakutō including spirit name, wielder, release command, and transformations.",
      parameters: [pathParam("slug", "The unique Zanpakuto slug (e.g. 'zangetsu')")],
      responses: detailResponses("#/components/schemas/ZanpakutoDetailResponse", "Detailed Zanpakuto information", "Zanpakutō not found"),
    },
  },
};
