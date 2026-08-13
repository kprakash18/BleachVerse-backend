import { z } from "zod";
import { LOCATION } from "./location.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema } from "../../common/utils/commonValidation.js";

export const getLocationsSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(LOCATION.SORT_FIELDS, "name"))
    .extend({
      type: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(LOCATION.TYPES))
        .optional(),
    })
    .strict(),
});

export const getLocationBySlugSchema = slugParamSchema;
