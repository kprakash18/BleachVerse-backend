import { z } from "zod";
import { CHARACTER } from "./character.constant.js";

export const getCharactersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    status: z.enum(CHARACTER.STATUSES).optional(),

    sex: z.enum(CHARACTER.SEXES).optional(),

    sortBy: z.enum(CHARACTER.SORT_FIELDS).default("name"),

    sortOrder: z.enum(CHARACTER.SORT_ORDERS).default("asc"),
  }),
});

// validate the slug
export const getCharacterBySlugSchema = z.object({
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
