export const arcSchemas = {
  ArcType: {
    type: "string",
    enum: ["CANON", "MOVIE", "FILLER", "OVA"],
    description: "The canon status or media type of the story arc",
  },
  Arc: {
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
      type: {
        $ref: "#/components/schemas/ArcType",
      },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo Kurosaki gains Soul Reaper powers and begins protecting Karakura Town.",
      },
      episodeCount: {
        type: "integer",
        example: 20,
      },
    },
  },
  ArcCoverageInfo: {
    type: "object",
    properties: {
      startEpisode: { type: "integer", example: 1 },
      endEpisode: { type: "integer", example: 20 },
      episodeCount: { type: "integer", example: 20 },
    },
  },
  MangaCoverageInfo: {
    type: "object",
    properties: {
      startChapter: { type: "integer", example: 1 },
      endChapter: { type: "integer", example: 70 },
      chapterCount: { type: "integer", example: 70 },
    },
  },
  ArcDetails: {
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
      type: {
        $ref: "#/components/schemas/ArcType",
      },
      description: {
        type: "string",
        nullable: true,
        example: "Ichigo Kurosaki gains Soul Reaper powers and begins protecting Karakura Town.",
      },
      coverage: {
        type: "object",
        properties: {
          anime: {
            $ref: "#/components/schemas/ArcCoverageInfo",
          },
          manga: {
            $ref: "#/components/schemas/MangaCoverageInfo",
          },
        },
      },
    },
  },
  Episode: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "The Day I Became a Shinigami",
      },
      number: {
        type: "integer",
        example: 1,
      },
    },
  },
  ArcListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Arc",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  ArcDetailsResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/ArcDetails",
      },
    },
  },
  ArcEpisodesResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Episode",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
};

export const arcPaths = {
  "/api/v1/arcs": {
    get: {
      tags: ["Arcs"],
      summary: "Get all arcs",
      description: "Retrieve a paginated list of all story arcs with optional search and type filtering.",
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
          description: "Search arc by name or slug (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter arcs by type",
          required: false,
          schema: {
            type: "string",
            enum: ["CANON", "MOVIE", "FILLER", "OVA"],
          },
        },
        {
          name: "sortBy",
          in: "query",
          description: "Field to sort the results by",
          required: false,
          schema: {
            type: "string",
            enum: ["name", "startEpisodeNumber"],
            default: "startEpisodeNumber",
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
          description: "A paginated list of story arcs",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ArcListResponse",
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
  "/api/v1/arcs/{slug}": {
    get: {
      tags: ["Arcs"],
      summary: "Get arc details by slug",
      description: "Retrieve details and coverage information for a single story arc by its unique slug.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique story arc slug (e.g. 'substitute-shinigami-arc')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed arc information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ArcDetailsResponse",
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
          description: "Arc not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Arc not found",
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
  "/api/v1/arcs/{slug}/episodes": {
    get: {
      tags: ["Arcs"],
      summary: "Get episodes of an arc",
      description: "Retrieve a paginated list of episodes belonging to a specific story arc.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique story arc slug (e.g. 'substitute-shinigami-arc')",
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
          description: "A paginated list of episodes belonging to the arc",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ArcEpisodesResponse",
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
        404: {
          description: "Arc not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Arc not found",
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
