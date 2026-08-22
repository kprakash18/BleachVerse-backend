import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const eventSchemas = {
  EventType: {
    type: "string",
    enum: [
      "BATTLE",
      "DEATH",
      "REVEAL",
      "BETRAYAL",
      "TRANSFORMATION",
      "POWER_GAIN",
      "POWER_LOSS",
      "RESCUE",
      "INVASION",
      "OTHER",
    ],
    description: "Classification of historical/story event",
  },
  SourceMaterial: {
    type: "string",
    enum: ["MANGA", "ANIME", "MOVIE", "OVA", "NOVEL", "GAME"],
    description: "Source material origin of the event",
  },
  EventSummary: {
    type: "object",
    properties: {
      title: { type: "string", example: "Winter War Invasion" },
      slug: { type: "string", example: "winter-war-invasion" },
      type: { $ref: "#/components/schemas/EventType" },
      description: { type: "string", nullable: true },
      arc: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Fake Karakura Town Arc" },
          slug: { type: "string", example: "fake-karakura-town-arc" },
        },
      },
      location: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Karakura Town" },
          slug: { type: "string", example: "karakura-town" },
        },
      },
    },
  },
  EventDetail: {
    type: "object",
    properties: {
      title: { type: "string", example: "Winter War Invasion" },
      slug: { type: "string", example: "winter-war-invasion" },
      type: { $ref: "#/components/schemas/EventType" },
      description: { type: "string", nullable: true },
      isCanonical: { type: "boolean", example: true },
      sourceMaterial: { $ref: "#/components/schemas/SourceMaterial" },
      arc: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Fake Karakura Town Arc" },
          slug: { type: "string", example: "fake-karakura-town-arc" },
        },
      },
      location: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Karakura Town" },
          slug: { type: "string", example: "karakura-town" },
        },
      },
      episode: {
        type: "object",
        nullable: true,
        properties: {
          title: { type: "string", example: "Fierce Fighting! Soul Reaper vs. Espada" },
          slug: { type: "string", example: "fierce-fighting-soul-reaper-vs-espada" },
          episodeNumber: { type: "integer", example: 215 },
        },
      },
      participants: {
        type: "array",
        items: {
          type: "object",
          properties: {
            role: { type: "string", nullable: true, example: "Leader" },
            character: {
              type: "object",
              properties: {
                name: { type: "string", example: "Sosuke Aizen" },
                slug: { type: "string", example: "sosuke-aizen" },
              },
            },
          },
        },
      },
    },
  },
  EventListResponse: paginatedListSchema("#/components/schemas/EventSummary"),
  EventDetailResponse: singleItemSchema("#/components/schemas/EventDetail"),
};

export const eventPaths = {
  "/api/v1/events": {
    get: {
      tags: ["Events"],
      summary: "Get all events",
      description:
        "Retrieve a paginated list of events with optional title search, type filtering, source material filtering, arc filtering, and location filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search event title (case-insensitive substring)"),
        queryParam("type", "Filter by event type", "string", { $ref: "#/components/schemas/EventType" }),
        queryParam("sourceMaterial", "Filter by source material origin (MANGA, ANIME, MOVIE, OVA, NOVEL, GAME)", "string", {
          $ref: "#/components/schemas/SourceMaterial",
        }),
        queryParam("arcSlug", "Filter events by story arc slug"),
        queryParam("locationSlug", "Filter events by location slug"),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["title"], default: "title" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/EventListResponse", "A paginated list of events"),
    },
  },
  "/api/v1/events/{slug}": {
    get: {
      tags: ["Events"],
      summary: "Get event details by slug",
      description:
        "Retrieve comprehensive details for a single event including location, arc, episode, and key character participants.",
      parameters: [pathParam("slug", "The unique event slug (e.g. 'winter-war-invasion')")],
      responses: detailResponses("#/components/schemas/EventDetailResponse", "Detailed event information", "Event not found"),
    },
  },
};
