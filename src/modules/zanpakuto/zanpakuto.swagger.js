export const zanpakutoSchemas = {
  ZanpakutoType: {
    type: "string",
    enum: ["NORMAL", "DUAL", "HYBRID"],
    description: "Type or form classification of the Zanpakutō",
  },
  ZanpakutoSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Zangetsu" },
      slug: { type: "string", example: "zangetsu" },
      type: { $ref: "#/components/schemas/ZanpakutoType" },
      releaseCommand: {
        type: "string",
        nullable: true,
        example: "Getsuga Tensho",
      },
      spiritName: { type: "string", nullable: true, example: "Old Man Zangetsu" },
      wielder: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
    },
  },
  ZanpakutoDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Zangetsu" },
      slug: { type: "string", example: "zangetsu" },
      type: { $ref: "#/components/schemas/ZanpakutoType" },
      releaseCommand: {
        type: "string",
        nullable: true,
        example: "Getsuga Tensho",
      },
      spiritName: { type: "string", nullable: true, example: "Old Man Zangetsu" },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo Kurosaki's Zanpakutō, taking the form of a large cleaver.",
      },
      wielder: {
        type: "object",
        properties: {
          name: { type: "string", example: "Ichigo Kurosaki" },
          slug: { type: "string", example: "ichigo-kurosaki" },
        },
      },
      aliases: {
        type: "array",
        items: { type: "string", example: "Slay the Moon" },
      },
      transformations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Bankai: Tensa Zangetsu" },
            type: { type: "string", example: "BANKAI" },
            description: { type: "string", nullable: true },
          },
        },
      },
    },
  },
  ZanpakutoListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ZanpakutoSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  ZanpakutoDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/ZanpakutoDetail",
      },
    },
  },
};

export const zanpakutoPaths = {
  "/api/v1/zanpakutos": {
    get: {
      tags: ["Zanpakutos"],
      summary: "Get all Zanpakutos",
      description:
        "Retrieve a paginated list of Zanpakutō weapons with optional search, type filtering, and wielder filtering.",
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
          description: "Search Zanpakutō by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by Zanpakutō type (NORMAL, DUAL, HYBRID)",
          required: false,
          schema: {
            $ref: "#/components/schemas/ZanpakutoType",
          },
        },
        {
          name: "wielderSlug",
          in: "query",
          description: "Filter Zanpakutō by wielder character slug",
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
          description: "A paginated list of Zanpakutos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ZanpakutoListResponse",
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
  "/api/v1/zanpakutos/{slug}": {
    get: {
      tags: ["Zanpakutos"],
      summary: "Get Zanpakuto details by slug",
      description:
        "Retrieve comprehensive details for a single Zanpakutō including spirit name, wielder, release command, and transformations.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique Zanpakuto slug (e.g. 'zangetsu')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed Zanpakuto information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ZanpakutoDetailResponse",
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
          description: "Zanpakutō not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Zanpakutō not found",
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
