import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const fightSchemas = {
  FightType: {
    type: "string",
    enum: ["DUEL", "TEAM_BATTLE", "WAR", "TRAINING"],
    description: "The type of battle or combat scenario",
  },
  FightOutcome: {
    type: "string",
    enum: ["WIN", "LOSS", "DRAW", "INTERRUPTED", "UNKNOWN"],
    description: "Outcome of a participant in the fight",
  },
  FightNamedSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Ichigo Kurosaki" },
      slug: { type: "string", example: "ichigo-kurosaki" },
    },
  },
  FightEpisodeSummary: {
    type: "object",
    properties: {
      title: { type: "string", example: "Ichigo Dies! Orihime's Crying Scream!" },
      slug: { type: "string", example: "ichigo-dies-orihimes-crying-scream" },
      episodeNumber: { type: "integer", example: 271 },
    },
  },
  FightParticipant: {
    type: "object",
    properties: {
      outcome: { $ref: "#/components/schemas/FightOutcome" },
      character: { $ref: "#/components/schemas/FightNamedSummary" },
    },
  },
  FightSummary: {
    type: "object",
    properties: {
      title: { type: "string", example: "Ichigo Kurosaki vs. Ulquiorra Cifer" },
      slug: { type: "string", example: "ichigo-kurosaki-vs-ulquiorra-cifer" },
      type: { $ref: "#/components/schemas/FightType" },
      winner: { $ref: "#/components/schemas/FightNamedSummary", nullable: true },
      arc: { $ref: "#/components/schemas/FightNamedSummary", nullable: true },
      location: { $ref: "#/components/schemas/FightNamedSummary", nullable: true },
    },
  },
  FightDetail: {
    type: "object",
    properties: {
      title: { type: "string", example: "Ichigo Kurosaki vs. Ulquiorra Cifer" },
      slug: { type: "string", example: "ichigo-kurosaki-vs-ulquiorra-cifer" },
      type: { $ref: "#/components/schemas/FightType" },
      summary: {
        type: "string",
        nullable: true,
        example: "Ichigo battles Cifer atop Las Noches, unleashing his full Vasto Lorde Hollow form after dying.",
      },
      winner: { $ref: "#/components/schemas/FightNamedSummary", nullable: true },
      arc: { $ref: "#/components/schemas/FightNamedSummary", nullable: true },
      location: { $ref: "#/components/schemas/FightNamedSummary", nullable: true },
      episode: { $ref: "#/components/schemas/FightEpisodeSummary", nullable: true },
      participants: {
        type: "array",
        items: { $ref: "#/components/schemas/FightParticipant" },
      },
    },
  },
  FightListResponse: paginatedListSchema("#/components/schemas/FightSummary"),
  FightDetailResponse: singleItemSchema("#/components/schemas/FightDetail"),
};

export const fightPaths = {
  "/api/v1/fights": {
    get: {
      tags: ["Fights"],
      summary: "Get all fights",
      description: "Retrieve a paginated list of fights with optional search and filters for type, winner, arc, and location.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search fight title (case-insensitive substring)"),
        queryParam("type", "Filter fights by type (DUEL, TEAM_BATTLE, WAR, TRAINING)", "string", {
          $ref: "#/components/schemas/FightType",
        }),
        queryParam("winnerSlug", "Filter fights won by a specific character slug"),
        queryParam("arcSlug", "Filter fights belonging to a specific story arc slug"),
        queryParam("locationSlug", "Filter fights taking place in a specific location slug"),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["title"], default: "title" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/FightListResponse", "A paginated list of fights"),
    },
  },
  "/api/v1/fights/{slug}": {
    get: {
      tags: ["Fights"],
      summary: "Get fight details by slug",
      description: "Retrieve comprehensive details for a single fight including winner, participants, episode, arc, and location.",
      parameters: [pathParam("slug", "The unique fight slug (e.g. 'ichigo-kurosaki-vs-ulquiorra-cifer')")],
      responses: detailResponses("#/components/schemas/FightDetailResponse", "Detailed fight information", "Fight not found"),
    },
  },
};
