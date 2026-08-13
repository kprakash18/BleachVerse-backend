import { z } from "zod";
import { basePaginationSchema, slugSchema } from "../../common/utils/commonValidation.js";

export const getAppearancesSchema = z.object({
  query: basePaginationSchema.extend({
    characterSlug: slugSchema.optional(),
    episodeSlug: slugSchema.optional(),
    isFirstAppearance: z
      .string()
      .toLowerCase()
      .transform((val) => val === "true")
      .optional(),
  }).strict(),
});

export const getAppearanceByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid appearance ID"),
  }),
});
