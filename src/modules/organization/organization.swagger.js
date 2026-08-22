import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

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
  OrganizationListResponse: paginatedListSchema("#/components/schemas/OrganizationSummary"),
  OrganizationDetailResponse: singleItemSchema("#/components/schemas/OrganizationDetail"),
};

export const organizationPaths = {
  "/api/v1/organizations": {
    get: {
      tags: ["Organizations"],
      summary: "Get all organizations",
      description: "Retrieve a paginated list of all organizations with optional name search and type filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search organization by name (case-insensitive substring)"),
        queryParam("type", "Filter by organization type", "string", {
          $ref: "#/components/schemas/OrganizationType",
        }),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["name"], default: "name" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses(
        "#/components/schemas/OrganizationListResponse",
        "A paginated list of organizations"
      ),
    },
  },
  "/api/v1/organizations/{slug}": {
    get: {
      tags: ["Organizations"],
      summary: "Get organization details by slug",
      description: "Retrieve comprehensive details for a single organization including parent organization, child divisions, and roster members.",
      parameters: [pathParam("slug", "The unique organization slug (e.g. 'gotei-13')")],
      responses: detailResponses(
        "#/components/schemas/OrganizationDetailResponse",
        "Detailed organization information",
        "Organization not found"
      ),
    },
  },
};
