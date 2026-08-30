import { z } from "zod";

const VALID_ENTITY_TYPES = [
  "CHARACTER",
  "FIGHT",
  "QUOTE",
  "ARC",
  "ORGANIZATION",
  "POWER",
  "TRANSFORMATION",
];

export const semanticSearchSchema = z.object({
  query: z.object({
    q: z
      .string({ required_error: "Search query 'q' is required" })
      .trim()
      .min(2, "Search query must be at least 2 characters")
      .max(200, "Search query cannot exceed 200 characters"),

    type: z
      .string()
      .trim()
      .toUpperCase()
      .refine((val) => !val || VALID_ENTITY_TYPES.includes(val), {
        message: `Entity type must be one of: ${VALID_ENTITY_TYPES.join(", ")}`,
      })
      .optional(),

    limit: z
      .coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(50, "Limit cannot exceed 50")
      .default(10),

    threshold: z
      .coerce
      .number()
      .min(0.0, "Threshold must be between 0.0 and 1.0")
      .max(1.0, "Threshold must be between 0.0 and 1.0")
      .default(0.5),

    hydrate: z
      .union([z.boolean(), z.enum(["true", "false"])])
      .transform((val) => (typeof val === "boolean" ? val : val === "true"))
      .default(true),
  }),
});
