export const raceSchemas = {
  RaceCategory: {
    type: "string",
    enum: ["MAIN", "HYBRID", "SPECIAL", "COSMIC"],
    description: "Race category classification",
  },
  RaceSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Reaper" },
      category: { $ref: "#/components/schemas/RaceCategory" },
      description: {
        type: "string",
        nullable: true,
        example: "Spiritual beings who govern the flow of souls.",
      },
    },
  },
  RaceDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Reaper" },
      category: { $ref: "#/components/schemas/RaceCategory" },
      description: {
        type: "string",
        nullable: true,
        example: "Spiritual beings who govern the flow of souls.",
      },
      characters: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Ichigo Kurosaki" },
            slug: { type: "string", example: "ichigo-kurosaki" },
          },
        },
      },
    },
  },
  RaceListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/RaceSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  RaceDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/RaceDetail",
      },
    },
  },
};

export const racePaths = {
  "/api/v1/races": {
    get: {
      tags: ["Races"],
      summary: "Get all races",
      description:
        "Retrieve a paginated list of races with optional search and category filtering.",
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
          description: "Search race by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "category",
          in: "query",
          description: "Filter by race category (MAIN, HYBRID, SPECIAL, COSMIC)",
          required: false,
          schema: {
            $ref: "#/components/schemas/RaceCategory",
          },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort the results by",
          required: false,
          schema: {
            type: "string",
            enum: ["name"],
            default: "name",
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
          description: "A paginated list of races",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RaceListResponse",
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
  "/api/v1/races/{name}": {
    get: {
      tags: ["Races"],
      summary: "Get race details by name",
      description:
        "Retrieve comprehensive details for a single race including characters belonging to that race.",
      parameters: [
        {
          name: "name",
          in: "path",
          description: "The race name (e.g. 'Soul Reaper' or 'soul-reaper')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed race information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RaceDetailResponse",
              },
            },
          },
        },
        400: {
          description: "Invalid name parameter validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Race not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Race not found",
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
