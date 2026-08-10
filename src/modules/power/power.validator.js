import { z } from "zod";
import { POWER } from "./power.constant.js";

export const getPowersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(POWER.TYPES))
      .optional(),

    source: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(POWER.SOURCES))
      .optional(),

    sourceMaterial: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(POWER.SOURCE_MATERIALS))
      .optional(),

    characterSlug: z.string().trim().optional(),

    sortBy: z.enum(POWER.SORT_FIELDS).default("name"),

    sortOrder: z.enum(POWER.SORT_ORDERS).default("asc"),
  }),
});

export const getPowerByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid power ID"),
  }),
});
