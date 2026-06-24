export const characterSchemas = {
  Sex: {
    type: "string",
    enum: ["MALE", "FEMALE", "UNKNOWN"],
    description: "The sex of the character",
  },
  CharacterStatus: {
    type: "string",
    enum: ["ALIVE", "DEAD", "UNKNOWN"],
    description: "The alive or dead status of the character",
  },
  Character: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      },
      slug: {
        type: "string",
        example: "ichigo-kurosaki",
      },
      name: {
        type: "string",
        example: "Ichigo Kurosaki",
      },
      sex: {
        $ref: "#/components/schemas/Sex",
      },
      status: {
        $ref: "#/components/schemas/CharacterStatus",
      },
      description: {
        type: "string",
        nullable: true,
        example: "The main protagonist of the series, a Substitute Soul Reaper.",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-06-24T10:00:00.000Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-06-24T10:00:00.000Z",
      },
    },
  },
  CharacterAlias: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
      characterId: {
        type: "string",
        format: "uuid",
      },
      alias: {
        type: "string",
        example: "Strawberry",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  Race: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
      name: {
        type: "string",
        example: "Soul Reaper",
      },
      category: {
        type: "string",
        enum: ["MAIN", "HYBRID", "SPECIAL", "COSMIC"],
        example: "MAIN",
      },
      description: {
        type: "string",
        nullable: true,
        example: "Spiritual beings who govern the flow of souls.",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  CharacterRace: {
    type: "object",
    properties: {
      characterId: {
        type: "string",
        format: "uuid",
      },
      raceId: {
        type: "string",
        format: "uuid",
      },
      race: {
        $ref: "#/components/schemas/Race",
      },
    },
  },
  Organization: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
      slug: {
        type: "string",
        example: "gotei-13",
      },
      name: {
        type: "string",
        example: "Gotei 13",
      },
      type: {
        type: "string",
        enum: ["MILITARY", "FACTION", "ROYAL", "ACADEMY", "OTHER"],
        example: "MILITARY",
      },
      description: {
        type: "string",
        nullable: true,
      },
      parentId: {
        type: "string",
        format: "uuid",
        nullable: true,
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  CharacterOrganization: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
      characterId: {
        type: "string",
        format: "uuid",
      },
      organizationId: {
        type: "string",
        format: "uuid",
      },
      role: {
        type: "string",
        nullable: true,
        example: "Substitute Soul Reaper",
      },
      joinedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },
      leftAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },
      organization: {
        $ref: "#/components/schemas/Organization",
      },
    },
  },
  CharacterDetails: {
    allOf: [
      { $ref: "#/components/schemas/Character" },
      {
        type: "object",
        properties: {
          aliases: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CharacterAlias",
            },
          },
          races: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CharacterRace",
            },
          },
          organizations: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CharacterOrganization",
            },
          },
        },
      },
    ],
  },
  PaginationMeta: {
    type: "object",
    properties: {
      page: { type: "integer", example: 1 },
      limit: { type: "integer", example: 10 },
      total: { type: "integer", example: 45 },
      totalPages: { type: "integer", example: 5 },
    },
  },
  CharacterListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Character",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  CharacterDetailsResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/CharacterDetails",
      },
    },
  },
  ValidationErrorDetail: {
    type: "object",
    properties: {
      code: { type: "string" },
      minimum: { type: "integer" },
      type: { type: "string" },
      inclusive: { type: "boolean" },
      exact: { type: "boolean" },
      message: { type: "string" },
      path: {
        type: "array",
        items: { type: "string" },
        example: ["query", "page"],
      },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      error: {
        type: "object",
        properties: {
          code: { type: "string", example: "VALIDATION_ERROR" },
          message: { type: "string", example: "Validation failed" },
          details: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ValidationErrorDetail",
            },
            nullable: true,
          },
        },
      },
    },
  },
};

export const characterPaths = {
  "/api/v1/characters": {
    get: {
      tags: ["Characters"],
      summary: "Get all characters",
      description: "Retrieve a paginated list of all characters with optional filtering and search.",
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
          description: "Search character by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "status",
          in: "query",
          description: "Filter characters by status",
          required: false,
          schema: {
            type: "string",
            enum: ["ALIVE", "DEAD", "UNKNOWN"],
          },
        },
        {
          name: "sex",
          in: "query",
          description: "Filter characters by sex",
          required: false,
          schema: {
            type: "string",
            enum: ["MALE", "FEMALE", "UNKNOWN"],
          },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort the results by",
          required: false,
          schema: {
            type: "string",
            enum: ["name", "createdAt", "updatedAt"],
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
          description: "A paginated list of characters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CharacterListResponse",
              },
            },
          },
        },
        400: {
          description: "Validation failed / Invalid parameters",
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
  "/api/v1/character/{slug}": {
    get: {
      tags: ["Characters"],
      summary: "Get character details by slug",
      description: "Retrieve comprehensive details for a single character using their unique URL-friendly slug.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique character slug (e.g. 'ichigo-kurosaki')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed character information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CharacterDetailsResponse",
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
          description: "Character not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Character not found",
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
