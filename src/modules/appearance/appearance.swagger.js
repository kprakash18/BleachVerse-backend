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
  AppearanceListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/AppearanceSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  AppearanceDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/AppearanceDetail",
      },
    },
  },
};

export const appearancePaths = {
  "/api/v1/appearances": {
    get: {
      tags: ["Appearances"],
      summary: "Get all character episode appearances",
      description:
        "Retrieve a paginated list of character appearances in anime episodes with optional character, episode, and first-appearance filtering.",
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
          name: "characterSlug",
          in: "query",
          description: "Filter appearances by character slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "episodeSlug",
          in: "query",
          description: "Filter appearances by episode slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "isFirstAppearance",
          in: "query",
          description: "Filter specifically for character debut/first appearances",
          required: false,
          schema: { type: "boolean" },
        },
      ],
      responses: {
        200: {
          description: "A paginated list of character appearances",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AppearanceListResponse",
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
  "/api/v1/appearances/{id}": {
    get: {
      tags: ["Appearances"],
      summary: "Get appearance detail by ID",
      description: "Retrieve detailed information for a single character appearance record by UUID.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "The appearance UUID",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed appearance information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AppearanceDetailResponse",
              },
            },
          },
        },
        400: {
          description: "Invalid UUID parameter validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Appearance record not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Appearance record not found",
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
