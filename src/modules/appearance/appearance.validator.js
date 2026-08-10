import { z } from "zod";
import { basePaginationSchema } from "../../common/utils/commonValidation.js";

export const getAppearancesSchema = z.object({
  query: basePaginationSchema.extend({
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
