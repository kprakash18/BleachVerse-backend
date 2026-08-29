import { z } from "zod";
import { slugSchema, slugParamSchema, basePaginationSchema } from "../../common/utils/commonValidation.js";
import { RELATIONSHIP_TYPES, TRAVERSAL_LIMITS } from "./relationship.constant.js";

export const createRelationshipSchema = z.object({
  body: z
    .object({
      sourceSlug: slugSchema,
      targetSlug: slugSchema,
      relationshipType: z.enum(RELATIONSHIP_TYPES),
      metadata: z.record(z.string(), z.any()).optional().default({}),
    })
    .refine((data) => data.sourceSlug !== data.targetSlug, {
      message: "Self-relationships are not allowed",
      path: ["targetSlug"],
    }),
});

export const submitRelationshipSchema = z.object({
  body: z
    .object({
      sourceSlug: slugSchema,
      targetSlug: slugSchema,
      relationshipType: z.enum(RELATIONSHIP_TYPES),
      note: z.string().trim().max(500).optional(),
      submittedBy: z.string().trim().max(100).optional().default("Anonymous Fan"),
    })
    .refine((data) => data.sourceSlug !== data.targetSlug, {
      message: "Self-relationships are not allowed",
      path: ["targetSlug"],
    }),
});

export const reviewSubmissionSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid submission ID format"),
  }),
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
    reviewerNotes: z.string().trim().max(500).optional(),
  }),
});

export const getSubmissionsSchema = z.object({
  query: basePaginationSchema
    .extend({
      status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    })
    .strict(),
});

export const getRelationshipsSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),
  query: z
    .object({
      type: z.enum(RELATIONSHIP_TYPES).optional(),
    })
    .strict(),
});

export const getPathSchema = z.object({
  query: z
    .object({
      from: slugSchema,
      to: slugSchema,
      depth: z.coerce
        .number({ invalid_type_error: "Depth must be a number" })
        .int("Depth must be an integer")
        .min(TRAVERSAL_LIMITS.MIN_DEPTH, `Depth must be between ${TRAVERSAL_LIMITS.MIN_DEPTH} and ${TRAVERSAL_LIMITS.MAX_DEPTH}`)
        .max(TRAVERSAL_LIMITS.MAX_DEPTH, `Depth must be between ${TRAVERSAL_LIMITS.MIN_DEPTH} and ${TRAVERSAL_LIMITS.MAX_DEPTH}`)
        .default(TRAVERSAL_LIMITS.DEFAULT_DEPTH),
    })
    .refine((data) => data.from !== data.to, {
      message: "'from' and 'to' slugs must be distinct",
      path: ["to"],
    })
    .strict(),
});

export const characterSlugSchema = slugParamSchema;
