import { z } from "zod";
import { QUOTE } from "./quote.constant.js";

export const getQuotesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    category: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(QUOTE.CATEGORIES))
      .optional(),

    characterSlug: z.string().trim().optional(),

    arcSlug: z.string().trim().optional(),

    sortOrder: z.enum(QUOTE.SORT_ORDERS).default("asc"),
  }),
});

export const getQuoteByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid quote ID"),
  }),
});

export const getQuotesByCharacterSlugSchema = z.object({
  params: z.object({
    characterSlug: z.string().trim().min(1, "Character slug is required"),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  }),
});
