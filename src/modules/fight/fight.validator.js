import { z } from "zod";
import { FIGHT } from "./fight.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema, slugSchema } from "../../common/utils/commonValidation.js";

export const getFightsSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(FIGHT.SORT_FIELDS, "title"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(FIGHT.TYPES))
        .optional(),
      winnerSlug: slugSchema.optional(),
      arcSlug: slugSchema.optional(),
      locationSlug: slugSchema.optional(),
    })
    .strict(),
});

export const getFightBySlugSchema = slugParamSchema;
