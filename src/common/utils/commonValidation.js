import { z } from "zod";

export const basePaginationSchema = z.object({
  page: z.coerce.number().int().positive().max(100).default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const baseSearchSchema = z.object({
  search: z.string().trim().max(500).optional(),
});

export const createSortSchema = (allowedFields, defaultSortBy) => {
  const sortBySchema = defaultSortBy
    ? z.enum(allowedFields).default(defaultSortBy)
    : z.enum(allowedFields);

  return z.object({
    sortBy: sortBySchema,
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
  });
};

export const slugParamSchema = z.object({
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
