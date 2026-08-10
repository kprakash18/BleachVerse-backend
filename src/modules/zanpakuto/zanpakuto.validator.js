import { z } from "zod";
import { ZANPAKUTO } from "./zanpakuto.constant.js";

export const getZanpakutosSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(ZANPAKUTO.TYPES))
      .optional(),

    wielderSlug: z.string().trim().optional(),

    sortBy: z.enum(ZANPAKUTO.SORT_FIELDS).default("name"),

    sortOrder: z.enum(ZANPAKUTO.SORT_ORDERS).default("asc"),
  }),
});

export const getZanpakutoBySlugSchema = z.object({
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
