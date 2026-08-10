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
  EventListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/EventSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  EventDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/EventDetail",
      },
    },
  },
};

export const eventPaths = {
  "/api/v1/events": {
    get: {
      tags: ["Events"],
      summary: "Get all events",
      description:
        "Retrieve a paginated list of events with optional title search, type filtering, source material filtering, arc filtering, and location filtering.",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number",
          required: false,
          schema: { type: "integer", default: 1 },
        },
        {
          name: "limit",
          in: "query",
          description: "Number of records per page (max: 100)",
          required: false,
          schema: { type: "integer", default: 10 },
        },
        {
          name: "search",
          in: "query",
          description: "Search event title (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by event type",
          required: false,
          schema: {
            $ref: "#/components/schemas/EventType",
          },
        },
        {
          name: "sourceMaterial",
          in: "query",
          description: "Filter by source material origin (MANGA, ANIME, MOVIE, OVA, NOVEL, GAME)",
          required: false,
          schema: {
            $ref: "#/components/schemas/SourceMaterial",
          },
        },
        {
          name: "arcSlug",
          in: "query",
          description: "Filter events by story arc slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "locationSlug",
          in: "query",
          description: "Filter events by location slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort the results by",
          required: false,
          schema: {
            type: "string",
            enum: ["title"],
            default: "title",
          },
        },
        {
          name: "sortOrder",
          in: "query",
          description: "Sort order (ascending or descending)",
          required: false,
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "asc",
          },
        },
      ],
      responses: {
        200: {
          description: "A paginated list of events",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EventListResponse",
              },
            },
          },
        },
        400: {
          description: "Validation error / invalid parameters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/events/{slug}": {
    get: {
      tags: ["Events"],
      summary: "Get event details by slug",
      description:
        "Retrieve comprehensive details for a single event including location, arc, episode, and key character participants.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique event slug (e.g. 'winter-war-invasion')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed event information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EventDetailResponse",
              },
            },
          },
        },
        400: {
          description: "Invalid slug parameter validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Event not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Event not found",
                    details: null,
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};
