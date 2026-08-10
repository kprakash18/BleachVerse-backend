export const transformationSchemas = {
  TransformationType: {
    type: "string",
    enum: [
      "SHIKAI",
      "BANKAI",
      "RESURRECCION",
      "SEGUNDA_ETAPA",
      "HOLLOWFICATION",
      "VOLLSTANDIG",
      "FULLBRING",
      "FINAL_FORM",
      "OTHER",
    ],
    description: "Classification of transformation form",
  },
  TransformationSummary: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string", example: "Bankai: Tensa Zangetsu" },
      type: { $ref: "#/components/schemas/TransformationType" },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo's Bankai form, compressing his spiritual power into a sleek black katana.",
      },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
      zanpakuto: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Zangetsu" },
          slug: { type: "string", example: "zangetsu" },
        },
      },
    },
  },
  TransformationDetail: {
    allOf: [
      { $ref: "#/components/schemas/TransformationSummary" },
      {
        type: "object",
        properties: {
          isCanonical: { type: "boolean", example: true },
          sourceMaterial: { $ref: "#/components/schemas/SourceMaterial" },
          firstEpisode: {
            type: "object",
            nullable: true,
            properties: {
              title: { type: "string", example: "Byakuya Enters! The Shinigami's Blade" },
              slug: { type: "string", example: "byakuya-enters-the-shinigamis-blade" },
              episodeNumber: { type: "integer", example: 58 },
            },
          },
          firstFight: {
            type: "object",
            nullable: true,
            properties: {
              title: { type: "string", example: "Ichigo Kurosaki vs. Byakuya Kuchiki" },
              slug: { type: "string", example: "ichigo-kurosaki-vs-byakuya-kuchiki" },
              type: { type: "string", example: "DUEL" },
            },
          },
          powers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", example: "Black Getsuga Tensho" },
                type: { type: "string", example: "OFFENSIVE" },
                description: { type: "string", nullable: true },
              },
            },
          },
        },
      },
    ],
  },
  TransformationListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/TransformationSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  TransformationDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/TransformationDetail",
      },
    },
  },
};

export const transformationPaths = {
  "/api/v1/transformations": {
    get: {
      tags: ["Transformations"],
      summary: "Get all transformations",
      description:
        "Retrieve a paginated list of transformations (Shikai, Bankai, Resurreccion, etc.) with optional name search and filtering.",
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
          description: "Search transformation by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by transformation type (SHIKAI, BANKAI, RESURRECCION, etc.)",
          required: false,
          schema: {
            $ref: "#/components/schemas/TransformationType",
          },
        },
        {
          name: "characterSlug",
          in: "query",
          description: "Filter transformations by character slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "zanpakutoSlug",
          in: "query",
          description: "Filter transformations by Zanpakutō slug",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "sourceMaterial",
          in: "query",
          description: "Filter by source material origin",
          required: false,
          schema: {
            $ref: "#/components/schemas/SourceMaterial",
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
          description: "A paginated list of transformations",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransformationListResponse",
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
  "/api/v1/transformations/{id}": {
    get: {
      tags: ["Transformations"],
      summary: "Get transformation details by ID",
      description:
        "Retrieve comprehensive details for a single transformation including character, Zanpakuto, debut episode, debut fight, and powers.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "The transformation UUID",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed transformation information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransformationDetailResponse",
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
          description: "Transformation not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Transformation not found",
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
