export const episodeSchemas = {
  EpisodeType: {
    type: "string",
    enum: ["CANON", "FILLER", "MIXED", "RECAP"],
    description: "The canon or filler type classification of the episode",
  },
  EpisodeSummary: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "The Day I Became a Shinigami",
      },
      slug: {
        type: "string",
        example: "the-day-i-became-a-shinigami",
      },
      episodeNumber: {
        type: "integer",
        example: 1,
      },
      type: {
        $ref: "#/components/schemas/EpisodeType",
      },
    },
  },
  EpisodeArcSummary: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Substitute Shinigami Arc",
      },
      slug: {
        type: "string",
        example: "substitute-shinigami-arc",
      },
    },
  },
  EpisodeDetail: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "The Day I Became a Shinigami",
      },
      slug: {
        type: "string",
        example: "the-day-i-became-a-shinigami",
      },
      episodeNumber: {
        type: "integer",
        example: 1,
      },
      type: {
        $ref: "#/components/schemas/EpisodeType",
      },
      synopsis: {
        type: "string",
        nullable: true,
        example:
          "Ichigo Kurosaki meets Rukia Kuchiki, a Soul Reaper, and accidentally absorbs her powers to save his family from a monstrous Hollow.",
      },
      airDate: {
        type: "string",
        format: "date-time",
        nullable: true,
        example: "2004-10-05T00:00:00.000Z",
      },
      arc: {
        $ref: "#/components/schemas/EpisodeArcSummary",
        nullable: true,
      },
    },
  },
  EpisodeListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/EpisodeSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  EpisodeDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/EpisodeDetail",
      },
    },
  },
};

export const episodePaths = {
  "/api/v1/episodes": {
    get: {
      tags: ["Episodes"],
      summary: "Get all episodes",
      description:
        "Retrieve a paginated list of all episodes with optional filtering by arc slug and episode type.",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number for pagination",
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
          name: "arcSlug",
          in: "query",
          description: "Filter episodes by parent Arc slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter episodes by type (CANON, FILLER, MIXED, RECAP)",
          required: false,
          schema: {
            $ref: "#/components/schemas/EpisodeType",
          },
        },
      ],
      responses: {
        200: {
          description: "A paginated list of episodes",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EpisodeListResponse",
              },
            },
          },
        },
        400: {
          description: "Validation failed / Invalid query parameters",
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
  "/api/v1/episodes/number/{number}": {
    get: {
      tags: ["Episodes"],
      summary: "Get episode details by number",
      description:
        "Retrieve comprehensive details for a single episode using its unique episode number.",
      parameters: [
        {
          name: "number",
          in: "path",
          description: "The unique episode number (e.g. 1)",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed episode information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EpisodeDetailResponse",
              },
            },
          },
        },
        400: {
          description: "Invalid episode number parameter",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Episode not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Episode not found",
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
  "/api/v1/episodes/{slug}": {
    get: {
      tags: ["Episodes"],
      summary: "Get episode details by slug",
      description:
        "Retrieve comprehensive details for a single episode using its unique URL-friendly slug.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description:
            "The unique episode slug (e.g. 'the-day-i-became-a-shinigami')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed episode information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EpisodeDetailResponse",
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
          description: "Episode not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Episode not found",
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
