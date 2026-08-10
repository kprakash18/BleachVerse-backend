import { z } from "zod";
import { CHARACTER } from "./character.constant.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema, slugParamSchema } from "../../common/utils/commonValidation.js";

export const getCharactersSchema = z.object({
  query: basePaginationSchema
    .merge(baseSearchSchema)
    .merge(createSortSchema(CHARACTER.SORT_FIELDS, "name"))
    .extend({
      status: z.enum(CHARACTER.STATUSES).optional(),
      sex: z.enum(CHARACTER.SEXES).optional(),
    }),
});

// validate the slug
export const getCharacterBySlugSchema = slugParamSchema;
