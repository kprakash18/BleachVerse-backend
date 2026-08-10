import { z } from "zod";
import { EPISODE } from "./episode.constant.js";
import { basePaginationSchema, slugParamSchema } from "../../common/utils/commonValidation.js";

export const getEpisodesSchema = z.object({
  query: basePaginationSchema.extend({
    arcSlug: z.string().trim().optional(),
    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(EPISODE.TYPES))
      .optional(),
  }),
});

export const getEpisodeBySlugSchema = slugParamSchema;

export const getEpisodeByNumberSchema = z.object({
  params: z.object({
    number: z.coerce.number().int().positive("Episode number must be a positive integer"),
  }),
});
