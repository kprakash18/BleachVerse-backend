import { z } from "zod";
import { RACE } from "./race.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, nameSchema } from "../../common/utils/commonValidation.js";

export const getRacesSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(RACE.SORT_FIELDS, "name"))
    .extend({
      category: z
        .string()
        .trim()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(RACE.CATEGORIES))
        .optional(),
    })
    .strict(),
});

export const getRaceByNameSchema = z.object({
  params: z.object({
    name: nameSchema,
  }),
});
