const scoreProperties = {
  semantic: { type: "number", nullable: true, example: 0.7821 },
  graph: { type: "number", nullable: true, example: 1 },
  structured: { type: "number", nullable: true, example: 1 },
  final: { type: "number", example: 0.9821 },
};

export const searchSchemas = {
  SearchCandidate: {
    type: "object",
    required: ["entityId", "entityType", "matchedBy", "scores"],
    properties: {
      entityId: { type: "string", format: "uuid" },
      entityType: { type: "string", example: "CHARACTER" },
      matchedBy: {
        type: "array",
        items: { type: "string", enum: ["SEMANTIC", "GRAPH", "STRUCTURED"] },
      },
      scores: { type: "object", properties: scoreProperties },
      metadata: { type: "object", additionalProperties: true },
      entity: { type: "object", nullable: true, additionalProperties: true },
    },
  },
  SearchExecution: {
    type: "object",
    properties: {
      mode: { type: "string", enum: ["SEMANTIC", "GRAPH", "HYBRID"] },
      semanticUsed: { type: "boolean" },
      graphUsed: { type: "boolean" },
      structuredUsed: { type: "boolean" },
      aggregationMode: { type: "string", enum: ["UNION", "INTERSECTION"] },
      sourcesUsed: {
        type: "array",
        items: { type: "string", enum: ["PGVECTOR", "NEO4J", "POSTGRES"] },
      },
      detected: {
        type: "object",
        properties: {
          graphConstraints: { type: "array", items: { type: "object", additionalProperties: true } },
          unresolvedGraphMentions: { type: "array", items: { type: "object", additionalProperties: true } },
          structuredFilters: { type: "object", additionalProperties: true },
        },
      },
    },
  },
};

const commonSearchParameters = [
  {
    name: "q",
    in: "query",
    required: true,
    description: "Natural-language search query",
    schema: { type: "string", minLength: 2, maxLength: 200 },
    example: "Espada who fought Ichigo and are brutal",
  },
  {
    name: "limit",
    in: "query",
    schema: { type: "integer", minimum: 1, maximum: 50, default: 10 },
  },
  {
    name: "threshold",
    in: "query",
    description: "Minimum semantic cosine similarity",
    schema: { type: "number", minimum: 0, maximum: 1 },
  },
  {
    name: "hydrate",
    in: "query",
    description: "Include complete relational entity records",
    schema: { type: "boolean", default: true },
  },
];

export const searchPaths = {
  "/search": {
    get: {
      tags: ["Search"],
      summary: "Run unified semantic, graph, and structured search",
      description: "Classifies the query, executes the relevant stores, combines candidates, ranks them, and optionally hydrates full entities.",
      parameters: [
        ...commonSearchParameters,
        {
          name: "mode",
          in: "query",
          description: "AUTO uses deterministic intent classification. Explicit modes are intended for diagnostics.",
          schema: { type: "string", enum: ["AUTO", "SEMANTIC", "GRAPH", "HYBRID"], default: "AUTO" },
        },
      ],
      responses: {
        200: {
          description: "Ranked search results and execution metadata",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      query: { type: "string" },
                      execution: { $ref: "#/components/schemas/SearchExecution" },
                      count: { type: "integer" },
                      results: { type: "array", items: { $ref: "#/components/schemas/SearchCandidate" } },
                    },
                  },
                },
              },
            },
          },
        },
        400: { $ref: "#/components/responses/ValidationError" },
        429: { $ref: "#/components/responses/RateLimitExceededError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/search/semantic": {
    get: {
      tags: ["Search"],
      summary: "Run semantic vector search directly",
      parameters: [
        ...commonSearchParameters,
        {
          name: "type",
          in: "query",
          schema: { type: "string", enum: ["CHARACTER", "FIGHT", "QUOTE", "ARC", "ORGANIZATION", "POWER", "TRANSFORMATION"] },
        },
      ],
      responses: {
        200: { description: "Semantic search results" },
        400: { $ref: "#/components/responses/ValidationError" },
        429: { $ref: "#/components/responses/RateLimitExceededError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
};
