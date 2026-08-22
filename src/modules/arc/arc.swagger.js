import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const arcSchemas = {
  ArcType: {
    type: "string",
    enum: ["CANON", "MOVIE", "FILLER", "OVA"],
    description: "The canon status or media type of the story arc",
  },
  Arc: {
    type: "object",
    properties: {
      name: { type: "string", example: "Substitute Shinigami Arc" },
      slug: { type: "string", example: "substitute-shinigami-arc" },
      type: { $ref: "#/components/schemas/ArcType" },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo Kurosaki gains Soul Reaper powers and begins protecting Karakura Town.",
      },
      episodeCount: { type: "integer", example: 20 },
    },
  },
  ArcCoverageInfo: {
    type: "object",
    properties: {
      startEpisode: { type: "integer", example: 1 },
      endEpisode: { type: "integer", example: 20 },
      episodeCount: { type: "integer", example: 20 },
    },
  },
  MangaCoverageInfo: {
    type: "object",
    properties: {
      startChapter: { type: "integer", example: 1 },
      endChapter: { type: "integer", example: 70 },
      chapterCount: { type: "integer", example: 70 },
    },
  },
  ArcDetails: {
    type: "object",
    properties: {
      name: { type: "string", example: "Substitute Shinigami Arc" },
      slug: { type: "string", example: "substitute-shinigami-arc" },
      type: { $ref: "#/components/schemas/ArcType" },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo Kurosaki gains Soul Reaper powers and begins protecting Karakura Town.",
      },
      coverage: {
        type: "object",
        properties: {
          anime: { $ref: "#/components/schemas/ArcCoverageInfo" },
          manga: { $ref: "#/components/schemas/MangaCoverageInfo" },
        },
      },
    },
  },
  Episode: {
    type: "object",
    properties: {
      title: { type: "string", example: "The Day I Became a Shinigami" },
      number: { type: "integer", example: 1 },
    },
  },
  Fight: {
    type: "object",
    properties: {
      title: { type: "string", example: "Ichigo Kurosaki vs. Byakuya Kuchiki" },
      slug: { type: "string", example: "ichigo-kurosaki-vs-byakuya-kuchiki" },
      type: { type: "string", enum: ["DUEL", "TEAM_BATTLE", "WAR", "TRAINING"], example: "DUEL" },
    },
  },
  Event: {
    type: "object",
    properties: {
      title: { type: "string", example: "Aizen's Betrayal" },
      slug: { type: "string", example: "aizens-betrayal" },
      type: {
        type: "string",
        enum: ["BATTLE", "DEATH", "REVEAL", "BETRAYAL", "TRANSFORMATION", "POWER_GAIN", "POWER_LOSS", "RESCUE", "INVASION", "OTHER"],
        example: "BETRAYAL",
      },
    },
  },
  ArcCharacter: {
    type: "object",
    properties: {
      name: { type: "string", example: "Ichigo Kurosaki" },
      slug: { type: "string", example: "ichigo-kurosaki" },
    },
  },
  ArcListResponse: paginatedListSchema("#/components/schemas/Arc"),
  ArcDetailsResponse: singleItemSchema("#/components/schemas/ArcDetails"),
  ArcEpisodesResponse: paginatedListSchema("#/components/schemas/Episode"),
  ArcFightsResponse: paginatedListSchema("#/components/schemas/Fight"),
  ArcEventsResponse: paginatedListSchema("#/components/schemas/Event"),
  ArcCharactersResponse: paginatedListSchema("#/components/schemas/ArcCharacter"),
};

export const arcPaths = {
  "/api/v1/arcs": {
    get: {
      tags: ["Arcs"],
      summary: "Get all arcs",
      description: "Retrieve a paginated list of all story arcs with optional search and type filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search arc by name or slug (case-insensitive substring)"),
        queryParam("type", "Filter arcs by type", "string", { enum: ["CANON", "MOVIE", "FILLER", "OVA"] }),
        queryParam("sortBy", "Field to sort the results by", "string", {
          enum: ["name", "startEpisodeNumber"],
          default: "startEpisodeNumber",
        }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/ArcListResponse", "A paginated list of story arcs"),
    },
  },
  "/api/v1/arcs/{slug}": {
    get: {
      tags: ["Arcs"],
      summary: "Get arc details by slug",
      description: "Retrieve details and coverage information for a single story arc by its unique slug.",
      parameters: [pathParam("slug", "The unique story arc slug (e.g. 'substitute-shinigami-arc')")],
      responses: detailResponses("#/components/schemas/ArcDetailsResponse", "Detailed arc information", "Arc not found"),
    },
  },
  "/api/v1/arcs/{slug}/episodes": {
    get: {
      tags: ["Arcs"],
      summary: "Get episodes of an arc",
      description: "Retrieve a paginated list of episodes belonging to a specific story arc.",
      parameters: [
        pathParam("slug", "The unique story arc slug (e.g. 'substitute-shinigami-arc')"),
        ...paginationParams,
        queryParam("all", "Set to true to retrieve all episodes in the arc without pagination limits (capped at a maximum of 1000 episodes)", "boolean", { default: false }),
      ],
      responses: detailResponses("#/components/schemas/ArcEpisodesResponse", "A paginated list of episodes belonging to the arc", "Arc not found"),
    },
  },
  "/api/v1/arcs/{slug}/fights": {
    get: {
      tags: ["Arcs"],
      summary: "Get fights of an arc",
      description: "Retrieve a paginated list of fights belonging to a specific story arc, ordered by title ascending.",
      parameters: [
        pathParam("slug", "The unique story arc slug (e.g. 'substitute-shinigami-arc')"),
        ...paginationParams,
      ],
      responses: detailResponses("#/components/schemas/ArcFightsResponse", "A paginated list of fights belonging to the arc", "Arc not found"),
    },
  },
  "/api/v1/arcs/{slug}/events": {
    get: {
      tags: ["Arcs"],
      summary: "Get events of an arc",
      description: "Retrieve a paginated list of events belonging to a specific story arc, ordered by title ascending.",
      parameters: [
        pathParam("slug", "The unique story arc slug (e.g. 'substitute-shinigami-arc')"),
        ...paginationParams,
      ],
      responses: detailResponses("#/components/schemas/ArcEventsResponse", "A paginated list of events belonging to the arc", "Arc not found"),
    },
  },
  "/api/v1/arcs/{slug}/characters": {
    get: {
      tags: ["Arcs"],
      summary: "Get distinct characters of an arc",
      description: "Retrieve a paginated list of distinct characters appearing in the episodes of a specific story arc, ordered alphabetically by name.",
      parameters: [
        pathParam("slug", "The unique story arc slug (e.g. 'substitute-shinigami-arc')"),
        ...paginationParams,
      ],
      responses: detailResponses("#/components/schemas/ArcCharactersResponse", "A paginated list of distinct characters belonging to the arc", "Arc not found"),
    },
  },
};
