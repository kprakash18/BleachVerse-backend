import { z } from "zod";
import { EPISODE } from "./episode.constant.js";
import { basePaginationSchema, slugParamSchema, slugSchema } from "../../common/utils/commonValidation.js";

export const getEpisodesSchema = z.object({
  query: basePaginationSchema.extend({
    arcSlug: slugSchema.optional(),
    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(EPISODE.TYPES))
      .optional(),
  }).strict(),
});

export const getEpisodeBySlugSchema = slugParamSchema;

export const getEpisodeByNumberSchema = z.object({
  params: z.object({
    number: z.coerce.number().finite("Episode number must be a finite number").int().positive("Episode number must be a positive integer").max(2147483647),
  }),
});
