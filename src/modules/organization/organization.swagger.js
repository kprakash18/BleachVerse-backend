export const organizationSchemas = {
  OrganizationType: {
    type: "string",
    enum: ["MILITARY", "FACTION", "ROYAL", "ACADEMY", "OTHER"],
    description: "Classification of organization",
  },
  OrganizationSummary: {
    type: "object",
    properties: {
      name: { type: "string", example: "Gotei 13" },
      slug: { type: "string", example: "gotei-13" },
      type: { $ref: "#/components/schemas/OrganizationType" },
      description: {
        type: "string",
        nullable: true,
        example: "The primary military branch of Soul Society.",
      },
    },
  },
  OrganizationMember: {
    type: "object",
    properties: {
      role: { type: "string", nullable: true, example: "Captain of Squad 1" },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Genryusai Shigekuni Yamamoto" },
          slug: { type: "string", example: "genryusai-shigekuni-yamamoto" },
        },
      },
    },
  },
  OrganizationDetail: {
    type: "object",
    properties: {
      name: { type: "string", example: "Gotei 13" },
      slug: { type: "string", example: "gotei-13" },
      type: { $ref: "#/components/schemas/OrganizationType" },
      description: {
        type: "string",
        nullable: true,
        example: "The primary military branch of Soul Society.",
      },
      parent: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Central 46" },
          slug: { type: "string", example: "central-46" },
        },
      },
      subOrganizations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Squad 1" },
            slug: { type: "string", example: "squad-1" },
            type: { $ref: "#/components/schemas/OrganizationType" },
          },
        },
      },
      members: {
        type: "array",
        items: {
          $ref: "#/components/schemas/OrganizationMember",
        },
      },
    },
  },
  OrganizationListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/OrganizationSummary",
        },
      },
      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
  OrganizationDetailResponse: {
    type: "object",
    properties: {
      data: {
        $ref: "#/components/schemas/OrganizationDetail",
      },
    },
  },
};

export const organizationPaths = {
  "/api/v1/organizations": {
    get: {
      tags: ["Organizations"],
      summary: "Get all organizations",
      description:
        "Retrieve a paginated list of all organizations with optional name search and type filtering.",
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
          description: "Search organization by name (case-insensitive substring)",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          description: "Filter by organization type",
          required: false,
          schema: {
            $ref: "#/components/schemas/OrganizationType",
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
          description: "A paginated list of organizations",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrganizationListResponse",
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
  "/api/v1/organizations/{slug}": {
    get: {
      tags: ["Organizations"],
      summary: "Get organization details by slug",
      description:
        "Retrieve comprehensive details for a single organization including parent organization, child divisions, and roster members.",
      parameters: [
        {
          name: "slug",
          in: "path",
          description: "The unique organization slug (e.g. 'gotei-13')",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Detailed organization information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrganizationDetailResponse",
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
          description: "Organization not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
                example: {
                  error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "Organization not found",
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
