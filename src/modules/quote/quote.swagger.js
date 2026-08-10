export const quoteSchemas = {
  QuoteCategory: {
    type: "string",
    enum: [
      "MOTIVATIONAL",
      "PHILOSOPHICAL",
      "COMEDY",
      "THREAT",
      "BATTLE",
      "EMOTIONAL",
      "OTHER",
    ],
    description: "Category classification of the quote",
  },
  QuoteSummary: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      text: { type: "string", example: "If I was the rain, that binds together the Earth and the Sky..." },
      category: { $ref: "#/components/schemas/QuoteCategory" },
      isCanonical: { type: "boolean", example: true },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Orihime Inoue" },
          slug: { type: "string", example: "orihime-inoue" },
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
  QuoteDetail: {
    allOf: [
      { $ref: "#/components/schemas/QuoteSummary" },
      {
        type: "object",
        properties: {
          sourceMaterial: { type: "string", example: "MANGA" },
        },
      },
    ],
  },
  QuoteListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/QuoteSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  QuoteDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/QuoteDetail",
      },
    },
  },
};

export const quotePaths = {
  "/api/v1/quotes": {
    get: {
      tags: ["Quotes"],
      summary: "Get all quotes",
      description:
        "Retrieve a paginated list of famous quotes with optional search, category, character, and arc filtering.",
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
          description: "Search quote text (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "category",
          in: "query",
          description: "Filter by quote category",
          required: false,
          schema: {
            $ref: "#/components/schemas/QuoteCategory",
          },
        },
        {
          name: "characterSlug",
          in: "query",
          description: "Filter quotes by character slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "arcSlug",
          in: "query",
          description: "Filter quotes by story arc slug",
          required: false,
          schema: { type: "string" },
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
          description: "A paginated list of quotes",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/QuoteListResponse",
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
  "/api/v1/quotes/character/{characterSlug}": {
    get: {
      tags: ["Quotes"],
      summary: "Get quotes by character slug",
      description: "Retrieve a paginated list of famous quotes uttered by a specific character.",
      parameters: [
        {
          name: "characterSlug",
          in: "path",
          description: "The unique character slug (e.g. 'ichigo-kurosaki')",
          required: true,
          schema: {
            type: "string",
          },
        },
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
      ],
      responses: {
        200: {
          description: "A paginated list of character quotes",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/QuoteListResponse",
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
        404: {
          description: "Character not found",
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
  "/api/v1/quotes/{id}": {
    get: {
      tags: ["Quotes"],
      summary: "Get quote details by ID",
      description: "Retrieve comprehensive details for a single quote by its UUID.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "The quote UUID",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed quote information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/QuoteDetailResponse",
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
          description: "Quote not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Quote not found",
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
