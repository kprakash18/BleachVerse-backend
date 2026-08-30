import { z } from "zod";

const VALID_SEARCH_MODES = ["AUTO", "SEMANTIC", "GRAPH", "HYBRID"];

export const unifiedSearchSchema = z.object({
  query: z.object({
    q: z
      .string({ required_error: "Search query 'q' is required" })
      .trim()
      .min(2, "Search query must be at least 2 characters")
      .max(200, "Search query cannot exceed 200 characters"),

    mode: z
      .string()
      .trim()
      .toUpperCase()
      .refine((val) => !val || VALID_SEARCH_MODES.includes(val), {
        message: `Search mode must be one of: ${VALID_SEARCH_MODES.join(", ")}`,
      })
      .default("AUTO"),

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
      .default(0.4),

    hydrate: z
      .union([z.boolean(), z.enum(["true", "false"])])
      .transform((val) => (typeof val === "boolean" ? val : val === "true"))
      .default(true),
  }),
});
