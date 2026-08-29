import { RELATIONSHIP_TYPES } from "./relationship.constant.js";

const errors = {
  400: { $ref: "#/components/responses/ValidationError" },
  401: { $ref: "#/components/responses/UnauthorizedError" },
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
  "/relationships/submissions": {
    post: {
      tags: ["Relationships"],
      summary: "Submit a relationship suggestion as a community fan",
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
                relationshipType: { type: "string", enum: RELATIONSHIP_TYPES, example: "TRAINED_BY" },
                note: { type: "string", example: "Trained before Rescue Arc" },
                submittedBy: { type: "string", example: "KarakuraFan99" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Submission received and queued for review",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      sourceSlug: { type: "string" },
                      targetSlug: { type: "string" },
                      relationshipType: { type: "string" },
                      status: { type: "string", example: "PENDING" },
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
    get: {
      tags: ["Relationships"],
      summary: "List relationship submissions (Admin only)",
      security: [{ ApiKeyAuth: [] }],
      parameters: [
        { name: "status", in: "query", schema: { type: "string", enum: ["PENDING", "APPROVED", "REJECTED"] } },
        { name: "page", in: "query", schema: { type: "integer", default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
      ],
      responses: {
        200: {
          description: "List of submissions",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: { type: "array", items: { type: "object" } },
                  pagination: { type: "object" },
                },
              },
            },
          },
        },
        ...errors,
      },
    },
  },
  "/relationships/submissions/{id}/review": {
    patch: {
      tags: ["Relationships"],
      summary: "Approve or reject a relationship submission (Admin only)",
      security: [{ ApiKeyAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["status"],
              properties: {
                status: { type: "string", enum: ["APPROVED", "REJECTED"] },
                reviewerNotes: { type: "string", example: "Verified canon lore" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Submission reviewed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      submission: { type: "object" },
                      graphRelationship: { type: "object", nullable: true },
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
  "/relationships": {
    post: {
      tags: ["Relationships"],
      summary: "Create a graph relationship directly (Admin only)",
      security: [{ ApiKeyAuth: [] }],
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
