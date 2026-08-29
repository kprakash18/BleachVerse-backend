import { RELATIONSHIP_TYPES } from "./relationship.constant.js";

const errors = {
  400: { $ref: "#/components/responses/ValidationError" },
  404: { $ref: "#/components/responses/NotFoundError" },
  500: { $ref: "#/components/responses/InternalServerError" },
};

const slugParam = [{ $ref: "#/components/parameters/SlugParam" }];

const getEndpoint = (summary, key, schemaType = { type: "array", items: { type: "object" } }, extraParams = []) => ({
  get: {
    tags: ["Relationships"],
    summary,
    parameters: [...slugParam, ...extraParams],
    responses: {
      200: {
        description: summary,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    character: { type: "string" },
                    slug: { type: "string" },
                    [key]: schemaType,
                  },
                },
              },
            },
          },
        },
      },
      ...errors,
    },
  },
});

export const relationshipPaths = {
  "/relationships": {
    post: {
      tags: ["Relationships"],
      summary: "Create a graph relationship between entities",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["sourceSlug", "targetSlug", "relationshipType"],
              properties: {
                sourceSlug: { type: "string", example: "ichigo-kurosaki" },
                targetSlug: { type: "string", example: "kisuke-urahara" },
                relationshipType: {
                  type: "string",
                  enum: RELATIONSHIP_TYPES,
                  example: "TRAINED_BY",
                },
                metadata: { type: "object", example: { note: "Bankai training" } },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Relationship created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      source: { type: "object" },
                      relationship: { type: "string", example: "TRAINED_BY" },
                      target: { type: "object" },
                      metadata: { type: "object" },
                    },
                  },
                },
              },
            },
          },
        },
        ...errors,
      },
    },
  },
  "/characters/{slug}/relationships": getEndpoint("Get character direct relationships", "relationships", {
    type: "array",
    items: {
      type: "object",
      properties: {
        type: { type: "string", example: "TRAINED_BY" },
        target: {
          type: "object",
          properties: {
            label: { type: "string", example: "Character" },
            name: { type: "string", example: "Kisuke Urahara" },
            slug: { type: "string", example: "kisuke-urahara" },
          },
        },
        properties: { type: "object" },
      },
    },
  }, [
    {
      name: "type",
      in: "query",
      description: "Filter by relationship type",
      required: false,
      schema: { type: "string", enum: RELATIONSHIP_TYPES },
    },
  ]),
  "/characters/{slug}/trainers": getEndpoint("Get character trainers", "trainers"),
  "/characters/{slug}/betrayed": getEndpoint("Get characters betrayed by this character", "betrayed"),
  "/characters/{slug}/opponents": getEndpoint("Get character opponents", "opponents"),
  "/characters/{slug}/organizations": getEndpoint("Get organizations this character belongs to", "organizations"),
  "/graph/path": {
    get: {
      tags: ["Relationships"],
      summary: "Find shortest relationship path between two entities",
      parameters: [
        { name: "from", in: "query", required: true, schema: { type: "string", example: "ichigo-kurosaki" } },
        { name: "to", in: "query", required: true, schema: { type: "string", example: "byakuya-kuchiki" } },
        { name: "depth", in: "query", required: false, schema: { type: "integer", default: 2, minimum: 1, maximum: 3 } },
      ],
      responses: {
        200: {
          description: "Path traversal result",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      connected: { type: "boolean" },
                      from: { type: "string" },
                      to: { type: "string" },
                      length: { type: "integer" },
                      nodes: { type: "array", items: { type: "object" } },
                      relationships: { type: "array", items: { type: "string" } },
                    },
                  },
                },
              },
            },
          },
        },
        ...errors,
      },
    },
  },
};
