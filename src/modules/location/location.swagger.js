export const locationSchemas = {
  LocationType: {
    type: "string",
    enum: ["WORLD", "REGION", "STRUCTURE", "OTHER"],
    description: "Classification of location",
  },
  LocationSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Society" },
      slug: { type: "string", example: "soul-society" },
      type: { $ref: "#/components/schemas/LocationType" },
      description: {
        type: "string",
        nullable: true,
        example: "The realm where Soul Reapers dwell and souls reside.",
      },
    },
  },
  LocationDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Soul Society" },
      slug: { type: "string", example: "soul-society" },
      type: { $ref: "#/components/schemas/LocationType" },
      description: {
        type: "string",
        nullable: true,
        example: "The realm where Soul Reapers dwell and souls reside.",
      },
      parent: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Human World" },
          slug: { type: "string", example: "human-world" },
        },
      },
      subLocations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Seireitei" },
            slug: { type: "string", example: "seireitei" },
            type: { $ref: "#/components/schemas/LocationType" },
          },
        },
      },
      fights: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", example: "Ichigo Kurosaki vs. Kenpachi Zaraki" },
            slug: { type: "string", example: "ichigo-kurosaki-vs-kenpachi-zaraki" },
            type: { type: "string", example: "DUEL" },
          },
        },
      },
    },
  },
  LocationListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/LocationSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  LocationDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/LocationDetail",
      },
    },
  },
};

export const locationPaths = {
  "/api/v1/locations": {
    get: {
      tags: ["Locations"],
      summary: "Get all locations",
      description:
        "Retrieve a paginated list of locations with optional name search and type filtering.",
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
          description: "Search location by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by location type (WORLD, REGION, STRUCTURE, OTHER)",
          required: false,
          schema: {
            $ref: "#/components/schemas/LocationType",
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
          description: "A paginated list of locations",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LocationListResponse",
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
  "/api/v1/locations/{slug}": {
    get: {
      tags: ["Locations"],
      summary: "Get location details by slug",
      description:
        "Retrieve comprehensive details for a single location including parent location, sub-locations, and battles fought there.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique location slug (e.g. 'soul-society')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed location information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LocationDetailResponse",
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
          description: "Location not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Location not found",
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
