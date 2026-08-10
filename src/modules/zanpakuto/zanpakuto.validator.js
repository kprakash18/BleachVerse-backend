import { z } from "zod";
import { ZANPAKUTO } from "./zanpakuto.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema } from "../../common/utils/commonValidation.js";

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
      wielderSlug: z.string().trim().optional(),
    }),
});

export const getZanpakutoBySlugSchema = slugParamSchema;
