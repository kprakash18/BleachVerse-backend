import { z } from "zod";
import { RACE } from "./race.constant.js";

export const getRacesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    category: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(RACE.CATEGORIES))
      .optional(),

    sortBy: z.enum(RACE.SORT_FIELDS).default("name"),

    sortOrder: z.enum(RACE.SORT_ORDERS).default("asc"),
  }),
});

export const getRaceByNameSchema = z.object({
  params: z.object({
    name: z.string().trim().min(1, "Race name is required"),
  }),
});
