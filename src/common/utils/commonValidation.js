import { z } from "zod";

export const basePaginationSchema = z.object({
  page: z.coerce.number().finite("Page must be a finite number").int().positive().max(100).default(1),
  limit: z.coerce.number().finite("Limit must be a finite number").int().positive().max(100).default(10),
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

export const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(100, "Slug cannot exceed 100 characters")
  .regex(
    /^[a-zA-Z0-9\s-]+$/,
    "Slug can only contain letters, numbers, spaces and hyphens",
  );

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name cannot exceed 100 characters")
  .regex(
    /^[\p{L}\p{N}\s'()_-]+$/u,
    "Name contains invalid characters",
  );

export const slugParamSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),
});
