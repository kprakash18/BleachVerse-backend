import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const episodeSchemas = {
  EpisodeType: {
    type: "string",
    enum: ["CANON", "FILLER", "MIXED", "RECAP"],
    description: "The canon or filler type classification of the episode",
  },
  EpisodeSummary: {
    type: "object",
    properties: {
      title: { type: "string", example: "The Day I Became a Shinigami" },
      slug: { type: "string", example: "the-day-i-became-a-shinigami" },
      episodeNumber: { type: "integer", example: 1 },
      type: { $ref: "#/components/schemas/EpisodeType" },
    },
  },
  EpisodeArcSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Substitute Shinigami Arc" },
      slug: { type: "string", example: "substitute-shinigami-arc" },
    },
  },
  EpisodeDetail: {
    type: "object",
    properties: {
      title: { type: "string", example: "The Day I Became a Shinigami" },
      slug: { type: "string", example: "the-day-i-became-a-shinigami" },
      episodeNumber: { type: "integer", example: 1 },
      type: { $ref: "#/components/schemas/EpisodeType" },
      synopsis: {
        type: "string",
        nullable: true,
        example:
          "Ichigo Kurosaki meets Rukia Kuchiki, a Soul Reaper, and accidentally absorbs her powers to save his family from a monstrous Hollow.",
      },
      airDate: { type: "string", format: "date-time", nullable: true, example: "2004-10-05T00:00:00.000Z" },
      arc: { $ref: "#/components/schemas/EpisodeArcSummary", nullable: true },
    },
  },
  EpisodeListResponse: paginatedListSchema("#/components/schemas/EpisodeSummary"),
  EpisodeDetailResponse: singleItemSchema("#/components/schemas/EpisodeDetail"),
};

export const episodePaths = {
  "/api/v1/episodes": {
    get: {
      tags: ["Episodes"],
      summary: "Get all episodes",
      description: "Retrieve a paginated list of all episodes with optional filtering by arc slug and episode type.",
      parameters: [
        ...paginationParams,
        queryParam("arcSlug", "Filter episodes by parent Arc slug"),
        queryParam("type", "Filter episodes by type (CANON, FILLER, MIXED, RECAP)", "string", {
          $ref: "#/components/schemas/EpisodeType",
        }),
      ],
      responses: collectionResponses("#/components/schemas/EpisodeListResponse", "A paginated list of episodes"),
    },
  },
  "/api/v1/episodes/number/{number}": {
    get: {
      tags: ["Episodes"],
      summary: "Get episode details by number",
      description: "Retrieve comprehensive details for a single episode using its unique episode number.",
      parameters: [pathParam("number", "The unique episode number (e.g. 1)", { type: "integer" })],
      responses: detailResponses("#/components/schemas/EpisodeDetailResponse", "Detailed episode information", "Episode not found"),
    },
  },
  "/api/v1/episodes/{slug}": {
    get: {
      tags: ["Episodes"],
      summary: "Get episode details by slug",
      description: "Retrieve comprehensive details for a single episode using its unique URL-friendly slug.",
      parameters: [pathParam("slug", "The unique episode slug (e.g. 'the-day-i-became-a-shinigami')")],
      responses: detailResponses("#/components/schemas/EpisodeDetailResponse", "Detailed episode information", "Episode not found"),
    },
  },
};
