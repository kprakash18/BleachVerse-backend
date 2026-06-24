import { z } from "zod";
import { ARC_TYPES, ARC_SORT_FIELDS, SORT_ORDERS } from "./arc.constants.js";

export const getArcsSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).default(1),

      limit: z.coerce.number().int().min(1).max(100).default(10),

      search: z.preprocess((value) => {
        if (typeof value !== "string") return undefined;

        const trimmed = value.trim();

        return trimmed.length > 0 ? trimmed : undefined;
      }, z.string().optional()),

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
    slug: z.string().trim().min(1, "Arc slug is required"),
  }),
});
// Child node validation: Schema for validating request parameters and query for episodes of an Arc
export const getEpisodesByArcSlugSchema = z.object({
  params: z.object({
    slug: z.string().trim().min(1, "Arc slug is required"),
  }),

  query: z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
});
