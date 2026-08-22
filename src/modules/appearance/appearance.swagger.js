import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const appearanceSchemas = {
  AppearanceSummary: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      isFirstAppearance: { type: "boolean", example: true },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
      episode: {
        type: "object",
        nullable: true,
        properties: {
          title: { type: "string", example: "The Day I Became a Shinigami" },
          slug: { type: "string", example: "the-day-i-became-a-shinigami" },
          episodeNumber: { type: "integer", example: 1 },
        },
      },
    },
  },
  AppearanceDetail: {
    allOf: [
      { $ref: "#/components/schemas/AppearanceSummary" },
      {
        type: "object",
        properties: {
          episode: {
            type: "object",
            nullable: true,
            properties: {
              title: { type: "string", example: "The Day I Became a Shinigami" },
              slug: { type: "string", example: "the-day-i-became-a-shinigami" },
              episodeNumber: { type: "integer", example: 1 },
              synopsis: { type: "string", nullable: true },
              airDate: { type: "string", format: "date-time", nullable: true },
              arc: {
                type: "object",
                nullable: true,
                properties: {
                  name: { type: "string", example: "Substitute Shinigami Arc" },
                  slug: { type: "string", example: "substitute-shinigami-arc" },
                },
              },
            },
          },
        },
      },
    ],
  },
  AppearanceListResponse: paginatedListSchema("#/components/schemas/AppearanceSummary"),
  AppearanceDetailResponse: singleItemSchema("#/components/schemas/AppearanceDetail"),
};

export const appearancePaths = {
  "/api/v1/appearances": {
    get: {
      tags: ["Appearances"],
      summary: "Get all character episode appearances",
      description:
        "Retrieve a paginated list of character appearances in anime episodes with optional character, episode, and first-appearance filtering.",
      parameters: [
        ...paginationParams,
        queryParam("characterSlug", "Filter appearances by character slug"),
        queryParam("episodeSlug", "Filter appearances by episode slug"),
        queryParam("isFirstAppearance", "Filter specifically for character debut/first appearances", "boolean"),
      ],
      responses: collectionResponses(
        "#/components/schemas/AppearanceListResponse",
        "A paginated list of character appearances"
      ),
    },
  },
  "/api/v1/appearances/{id}": {
    get: {
      tags: ["Appearances"],
      summary: "Get appearance detail by ID",
      description: "Retrieve detailed information for a single character appearance record by UUID.",
      parameters: [pathParam("id", "The appearance UUID", { type: "string", format: "uuid" })],
      responses: detailResponses(
        "#/components/schemas/AppearanceDetailResponse",
        "Detailed appearance information",
        "Appearance record not found"
      ),
    },
  },
};
