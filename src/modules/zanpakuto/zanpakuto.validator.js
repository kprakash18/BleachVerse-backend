import { z } from "zod";
import { ZANPAKUTO } from "./zanpakuto.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema, slugSchema } from "../../common/utils/commonValidation.js";

export const getZanpakutosSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(ZANPAKUTO.SORT_FIELDS, "name"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(ZANPAKUTO.TYPES))
        .optional(),
      wielderSlug: slugSchema.optional(),
    })
    .strict(),
});

export const getZanpakutoBySlugSchema = slugParamSchema;
