import { z } from "zod";
import { EPISODE } from "./episode.constant.js";

export const getEpisodesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    arcSlug: z.string().trim().optional(),
    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(EPISODE.TYPES))
      .optional(),
  }),
});

export const getEpisodeBySlugSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-zA-Z0-9\s-]+$/,
        "Slug can only contain letters, numbers, spaces and hyphens",
      ),
  }),
});

export const getEpisodeByNumberSchema = z.object({
  params: z.object({
    number: z.coerce.number().int().positive("Episode number must be a positive integer"),
  }),
});
