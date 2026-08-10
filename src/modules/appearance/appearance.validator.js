import { z } from "zod";

export const getAppearancesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    characterSlug: z.string().trim().optional(),

    episodeSlug: z.string().trim().optional(),

    isFirstAppearance: z
      .string()
      .toLowerCase()
      .transform((val) => val === "true")
      .optional(),
  }),
});

export const getAppearanceByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid appearance ID"),
  }),
});
