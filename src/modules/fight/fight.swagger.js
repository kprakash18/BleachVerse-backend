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
      outcome: {
        $ref: "#/components/schemas/FightOutcome",
      },
      character: {
        $ref: "#/components/schemas/FightNamedSummary",
      },
    },
  },
  FightSummary: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Ichigo Kurosaki vs. Ulquiorra Cifer",
      },
      slug: {
        type: "string",
        example: "ichigo-kurosaki-vs-ulquiorra-cifer",
      },
      type: {
        $ref: "#/components/schemas/FightType",
      },
      winner: {
        $ref: "#/components/schemas/FightNamedSummary",
        nullable: true,
      },
      arc: {
        $ref: "#/components/schemas/FightNamedSummary",
        nullable: true,
      },
      location: {
        $ref: "#/components/schemas/FightNamedSummary",
        nullable: true,
      },
    },
  },
  FightDetail: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Ichigo Kurosaki vs. Ulquiorra Cifer",
      },
      slug: {
        type: "string",
        example: "ichigo-kurosaki-vs-ulquiorra-cifer",
      },
      type: {
        $ref: "#/components/schemas/FightType",
      },
      summary: {
        type: "string",
        nullable: true,
        example:
          "Ichigo battles Cifer atop Las Noches, unleashing his full Vasto Lorde Hollow form after dying.",
      },
      winner: {
        $ref: "#/components/schemas/FightNamedSummary",
        nullable: true,
      },
      arc: {
        $ref: "#/components/schemas/FightNamedSummary",
        nullable: true,
      },
      location: {
        $ref: "#/components/schemas/FightNamedSummary",
        nullable: true,
      },
      episode: {
        $ref: "#/components/schemas/FightEpisodeSummary",
        nullable: true,
      },
      participants: {
        type: "array",
        items: {
          $ref: "#/components/schemas/FightParticipant",
        },
      },
    },
  },
  FightListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/FightSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  FightDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/FightDetail",
      },
    },
  },
};

export const fightPaths = {
  "/api/v1/fights": {
    get: {
      tags: ["Fights"],
      summary: "Get all fights",
      description:
        "Retrieve a paginated list of fights with optional search and filters for type, winner, arc, and location.",
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
          description: "Search fight title (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter fights by type (DUEL, TEAM_BATTLE, WAR, TRAINING)",
          required: false,
          schema: {
            $ref: "#/components/schemas/FightType",
          },
        },
        {
          name: "winnerSlug",
          in: "query",
          description: "Filter fights won by a specific character slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "arcSlug",
          in: "query",
          description: "Filter fights belonging to a specific story arc slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "locationSlug",
          in: "query",
          description: "Filter fights taking place in a specific location slug",
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
          description: "A paginated list of fights",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FightListResponse",
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
  "/api/v1/fights/{slug}": {
    get: {
      tags: ["Fights"],
      summary: "Get fight details by slug",
      description:
        "Retrieve comprehensive details for a single fight including winner, participants, episode, arc, and location.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique fight slug (e.g. 'ichigo-kurosaki-vs-ulquiorra-cifer')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed fight information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FightDetailResponse",
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
          description: "Fight not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Fight not found",
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
