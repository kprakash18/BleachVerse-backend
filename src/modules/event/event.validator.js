import { z } from "zod";
import { EVENT } from "./event.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema } from "../../common/utils/commonValidation.js";

export const getEventsSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(EVENT.SORT_FIELDS, "title"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(EVENT.TYPES))
        .optional(),
      sourceMaterial: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(EVENT.SOURCE_MATERIALS))
        .optional(),
      arcSlug: z.string().trim().optional(),
      locationSlug: z.string().trim().optional(),
    }),
});

export const getEventBySlugSchema = slugParamSchema;
