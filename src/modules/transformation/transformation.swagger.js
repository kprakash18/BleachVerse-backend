import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

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
  TransformationListResponse: paginatedListSchema("#/components/schemas/TransformationSummary"),
  TransformationDetailResponse: singleItemSchema("#/components/schemas/TransformationDetail"),
};

export const transformationPaths = {
  "/api/v1/transformations": {
    get: {
      tags: ["Transformations"],
      summary: "Get all transformations",
      description:
        "Retrieve a paginated list of transformations (Shikai, Bankai, Resurreccion, etc.) with optional name search and filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search transformation by name (case-insensitive substring)"),
        queryParam("type", "Filter by transformation type (SHIKAI, BANKAI, RESURRECCION, etc.)", "string", {
          $ref: "#/components/schemas/TransformationType",
        }),
        queryParam("characterSlug", "Filter transformations by character slug"),
        queryParam("zanpakutoSlug", "Filter transformations by Zanpakutō slug"),
        queryParam("sourceMaterial", "Filter by source material origin", "string", {
          $ref: "#/components/schemas/SourceMaterial",
        }),
        queryParam("sortBy", "Field to sort the results by", "string", { enum: ["name"], default: "name" }),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses(
        "#/components/schemas/TransformationListResponse",
        "A paginated list of transformations"
      ),
    },
  },
  "/api/v1/transformations/{id}": {
    get: {
      tags: ["Transformations"],
      summary: "Get transformation details by ID",
      description:
        "Retrieve comprehensive details for a single transformation including character, Zanpakuto, debut episode, debut fight, and powers.",
      parameters: [pathParam("id", "The transformation UUID", { type: "string", format: "uuid" })],
      responses: detailResponses(
        "#/components/schemas/TransformationDetailResponse",
        "Detailed transformation information",
        "Transformation not found"
      ),
    },
  },
};
