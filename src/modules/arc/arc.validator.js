import { z } from "zod";
import { ARC_TYPES, ARC_SORT_FIELDS, SORT_ORDERS } from "./arc.constants.js";
import { basePaginationSchema, slugSchema } from "../../common/utils/commonValidation.js";

export const getArcsSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().finite("Page must be a finite number").int().min(1).max(100).default(1),

      limit: z.coerce.number().finite("Limit must be a finite number").int().min(1).max(100).default(10),

      search: z.preprocess((value) => {
        if (typeof value !== "string") return undefined;

        const trimmed = value.trim();

        return trimmed.length > 0 ? trimmed : undefined;
      }, z.string().max(500).optional()),

      type: z.preprocess((value) => {
        if (typeof value !== "string") return undefined;

        const trimmed = value.trim();

        return trimmed.length > 0 ? trimmed.toUpperCase() : undefined;
      }, z.enum(ARC_TYPES).optional()),

      sortBy: z.enum(ARC_SORT_FIELDS).default("startEpisodeNumber"),

      sortOrder: z.enum(SORT_ORDERS).default("asc"),
    })
    .strict(),
});

export const getArcBySlugSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),
});

// Child node validation: Schema for validating request parameters and query for episodes of an Arc
export const getEpisodesByArcSlugSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),

  query: basePaginationSchema.extend({
    all: z.preprocess((val) => {
      if (typeof val === "string") return val.toLowerCase() === "true";
      return Boolean(val);
    }, z.boolean().optional().default(false)),
  }).strict(),
});

// Child node validation: Schema for validating request parameters and query for fights of an Arc
export const getFightsByArcSlugSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),

  query: basePaginationSchema.strict(),
});

// Child node validation: Schema for validating request parameters and query for events of an Arc
export const getEventsByArcSlugSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),

  query: basePaginationSchema.strict(),
});

// Child node validation: Schema for validating request parameters and query for characters of an Arc
export const getCharactersByArcSlugSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),

  query: basePaginationSchema.strict(),
});

