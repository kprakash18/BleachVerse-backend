import { z } from "zod";
import { QUOTE } from "./quote.constant.js";
import { basePaginationSchema, baseSearchSchema, slugSchema } from "../../common/utils/commonValidation.js";

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
      characterSlug: slugSchema.optional(),
      arcSlug: slugSchema.optional(),
      sortOrder: z.enum(QUOTE.SORT_ORDERS).default("asc"),
    })
    .strict(),
});

export const getQuoteByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid quote ID"),
  }),
});

export const getQuotesByCharacterSlugSchema = z.object({
  params: z.object({
    characterSlug: slugSchema,
  }),
  query: basePaginationSchema.strict(),
});
