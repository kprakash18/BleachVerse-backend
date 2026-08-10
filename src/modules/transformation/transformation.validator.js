import { z } from "zod";
import { TRANSFORMATION } from "./transformation.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema } from "../../common/utils/commonValidation.js";

export const getTransformationsSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(TRANSFORMATION.SORT_FIELDS, "name"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(TRANSFORMATION.TYPES))
        .optional(),
      characterSlug: z.string().trim().optional(),
      zanpakutoSlug: z.string().trim().optional(),
      sourceMaterial: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(TRANSFORMATION.SOURCE_MATERIALS))
        .optional(),
    }),
});

export const getTransformationByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid transformation ID"),
  }),
});
