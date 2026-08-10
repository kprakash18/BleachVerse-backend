export const powerSchemas = {
  PowerType: {
    type: "string",
    enum: [
      "OFFENSIVE",
      "DEFENSIVE",
      "SUPPORT",
      "HEALING",
      "MOVEMENT",
      "PASSIVE",
      "OTHER",
    ],
    description: "Type of power technique",
  },
  PowerSource: {
    type: "string",
    enum: [
      "ZANPAKUTO",
      "KIDO",
      "HOLLOW",
      "QUINCY",
      "FULLBRING",
      "NATURAL",
      "OTHER",
    ],
    description: "Source material classification of power",
  },
  PowerSummary: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string", example: "Getsuga Tensho" },
      type: { $ref: "#/components/schemas/PowerType" },
      source: { $ref: "#/components/schemas/PowerSource" },
      description: {
        type: "string",
        nullable: true,
        example: "Fires a concentrated energy blast from the tip of the blade.",
      },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
      transformation: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Bankai: Tensa Zangetsu" },
          type: { type: "string", example: "BANKAI" },
        },
      },
    },
  },
  PowerDetail: {
    allOf: [
      { $ref: "#/components/schemas/PowerSummary" },
      {
        type: "object",
        properties: {
          isCanonical: { type: "boolean", example: true },
          sourceMaterial: { $ref: "#/components/schemas/SourceMaterial" },
        },
      },
    ],
  },
  PowerListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/PowerSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  PowerDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/PowerDetail",
      },
    },
  },
};

export const powerPaths = {
  "/api/v1/powers": {
    get: {
      tags: ["Powers"],
      summary: "Get all powers",
      description:
        "Retrieve a paginated list of special powers and techniques with optional name search, type filtering, source filtering, and character filtering.",
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
          description: "Search power by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by power type",
          required: false,
          schema: {
            $ref: "#/components/schemas/PowerType",
          },
        },
        {
          name: "source",
          in: "query",
          description: "Filter by power source (ZANPAKUTO, KIDO, HOLLOW, etc.)",
          required: false,
          schema: {
            $ref: "#/components/schemas/PowerSource",
          },
        },
        {
          name: "sourceMaterial",
          in: "query",
          description: "Filter by source material origin (MANGA, ANIME, MOVIE, etc.)",
          required: false,
          schema: {
            $ref: "#/components/schemas/SourceMaterial",
          },
        },
        {
          name: "characterSlug",
          in: "query",
          description: "Filter powers by character slug",
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
          description: "A paginated list of powers",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PowerListResponse",
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
  "/api/v1/powers/{id}": {
    get: {
      tags: ["Powers"],
      summary: "Get power details by ID",
      description: "Retrieve comprehensive details for a single power technique by its UUID.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "The power UUID",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed power information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PowerDetailResponse",
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
          description: "Power not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Power not found",
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
