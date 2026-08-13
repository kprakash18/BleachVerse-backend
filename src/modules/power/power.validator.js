import { z } from "zod";
import { POWER } from "./power.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugSchema } from "../../common/utils/commonValidation.js";

export const getPowersSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(POWER.SORT_FIELDS, "name"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(POWER.TYPES))
        .optional(),
      source: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(POWER.SOURCES))
        .optional(),
      sourceMaterial: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(POWER.SOURCE_MATERIALS))
        .optional(),
      characterSlug: slugSchema.optional(),
    })
    .strict(),
});

export const getPowerByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid power ID"),
  }),
});
