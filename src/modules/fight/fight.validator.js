import { z } from "zod";
import { FIGHT } from "./fight.constant.js";

export const getFightsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(FIGHT.TYPES))
      .optional(),

    winnerSlug: z.string().trim().optional(),

    arcSlug: z.string().trim().optional(),

    locationSlug: z.string().trim().optional(),

    sortBy: z.enum(FIGHT.SORT_FIELDS).default("title"),

    sortOrder: z.enum(FIGHT.SORT_ORDERS).default("asc"),
  }),
});

export const getFightBySlugSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-zA-Z0-9\s-]+$/,
        "Slug can only contain letters, numbers, spaces and hyphens",
      ),
  }),
});
