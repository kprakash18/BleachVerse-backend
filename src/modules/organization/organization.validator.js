import { z } from "zod";
import { ORGANIZATION } from "./organization.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema } from "../../common/utils/commonValidation.js";

export const getOrganizationsSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(ORGANIZATION.SORT_FIELDS, "name"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(ORGANIZATION.TYPES))
        .optional(),
    })
    .strict(),
});

export const getOrganizationBySlugSchema = slugParamSchema;
