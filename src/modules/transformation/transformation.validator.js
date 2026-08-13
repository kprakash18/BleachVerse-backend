import { z } from "zod";
import { TRANSFORMATION } from "./transformation.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugSchema } from "../../common/utils/commonValidation.js";

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
      characterSlug: slugSchema.optional(),
      zanpakutoSlug: slugSchema.optional(),
      sourceMaterial: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(TRANSFORMATION.SOURCE_MATERIALS))
        .optional(),
    })
    .strict(),
});

export const getTransformationByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid transformation ID"),
  }),
});
