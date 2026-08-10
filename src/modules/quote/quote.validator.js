import { z } from "zod";
import { QUOTE } from "./quote.constant.js";
import { basePaginationSchema, baseSearchSchema } from "../../common/utils/commonValidation.js";

export const getQuotesSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .extend({
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
  query: basePaginationSchema,
});
