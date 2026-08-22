import {
  collectionResponses,
  detailResponses,
  paginatedListSchema,
  singleItemSchema,
  paginationParams,
  queryParam,
  pathParam,
} from "../../docs/swagger.helper.js";

export const quoteSchemas = {
  QuoteCategory: {
    type: "string",
    enum: ["MOTIVATIONAL", "PHILOSOPHICAL", "COMEDY", "THREAT", "BATTLE", "EMOTIONAL", "OTHER"],
    description: "Category classification of the quote",
  },
  QuoteSummary: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      text: { type: "string", example: "If I was the rain, that binds together the Earth and the Sky..." },
      category: { $ref: "#/components/schemas/QuoteCategory" },
      isCanonical: { type: "boolean", example: true },
      character: {
        type: "object",
        properties: {
          name: { type: "string", example: "Orihime Inoue" },
          slug: { type: "string", example: "orihime-inoue" },
        },
      },
      episode: {
        type: "object",
        nullable: true,
        properties: {
          title: { type: "string", example: "The Day I Became a Shinigami" },
          slug: { type: "string", example: "the-day-i-became-a-shinigami" },
          episodeNumber: { type: "integer", example: 1 },
        },
      },
      arc: {
        type: "object",
        nullable: true,
        properties: {
          name: { type: "string", example: "Substitute Shinigami Arc" },
          slug: { type: "string", example: "substitute-shinigami-arc" },
        },
      },
    },
  },
  QuoteDetail: {
    allOf: [
      { $ref: "#/components/schemas/QuoteSummary" },
      {
        type: "object",
        properties: {
          sourceMaterial: { type: "string", example: "MANGA" },
        },
      },
    ],
  },
  QuoteListResponse: paginatedListSchema("#/components/schemas/QuoteSummary"),
  QuoteDetailResponse: singleItemSchema("#/components/schemas/QuoteDetail"),
};

export const quotePaths = {
  "/api/v1/quotes": {
    get: {
      tags: ["Quotes"],
      summary: "Get all quotes",
      description: "Retrieve a paginated list of famous quotes with optional search, category, character, and arc filtering.",
      parameters: [
        ...paginationParams,
        queryParam("search", "Search quote text (case-insensitive substring)"),
        queryParam("category", "Filter by quote category", "string", { $ref: "#/components/schemas/QuoteCategory" }),
        queryParam("characterSlug", "Filter quotes by character slug"),
        queryParam("arcSlug", "Filter quotes by story arc slug"),
        queryParam("sortOrder", "Sort order (ascending or descending)", "string", {
          enum: ["asc", "desc"],
          default: "asc",
        }),
      ],
      responses: collectionResponses("#/components/schemas/QuoteListResponse", "A paginated list of quotes"),
    },
  },
  "/api/v1/quotes/character/{characterSlug}": {
    get: {
      tags: ["Quotes"],
      summary: "Get quotes by character slug",
      description: "Retrieve a paginated list of famous quotes uttered by a specific character.",
      parameters: [
        pathParam("characterSlug", "The unique character slug (e.g. 'ichigo-kurosaki')"),
        ...paginationParams,
      ],
      responses: detailResponses("#/components/schemas/QuoteListResponse", "A paginated list of character quotes", "Character not found"),
    },
  },
  "/api/v1/quotes/{id}": {
    get: {
      tags: ["Quotes"],
      summary: "Get quote details by ID",
      description: "Retrieve comprehensive details for a single quote by its UUID.",
      parameters: [pathParam("id", "The quote UUID", { type: "string", format: "uuid" })],
      responses: detailResponses("#/components/schemas/QuoteDetailResponse", "Detailed quote information", "Quote not found"),
    },
  },
};
