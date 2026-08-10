import { z } from "zod";
import { TRANSFORMATION } from "./transformation.constant.js";

export const getTransformationsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(TRANSFORMATION.TYPES))
      .optional(),

    characterSlug: z.string().trim().optional(),

    zanpakutoSlug: z.string().trim().optional(),

    sourceMaterial: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(TRANSFORMATION.SOURCE_MATERIALS))
      .optional(),

    sortBy: z.enum(TRANSFORMATION.SORT_FIELDS).default("name"),

    sortOrder: z.enum(TRANSFORMATION.SORT_ORDERS).default("asc"),
  }),
});

export const getTransformationByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().uuid("Invalid transformation ID"),
  }),
});
