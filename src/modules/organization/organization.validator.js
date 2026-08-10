import { z } from "zod";
import { ORGANIZATION } from "./organization.constant.js";

export const getOrganizationsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    type: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(ORGANIZATION.TYPES))
      .optional(),

    sortBy: z.enum(ORGANIZATION.SORT_FIELDS).default("name"),

    sortOrder: z.enum(ORGANIZATION.SORT_ORDERS).default("asc"),
  }),
});

export const getOrganizationBySlugSchema = z.object({
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
