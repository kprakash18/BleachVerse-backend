import { describe, it, expect } from "vitest";
import {
  createRelationshipSchema,
  getRelationshipsSchema,
  getPathSchema,
} from "../../../src/modules/relationship/relationship.validator.js";

describe("Relationship Validator Unit Tests", () => {
  describe("createRelationshipSchema", () => {
    it("should validate a valid relationship payload", () => {
      const result = createRelationshipSchema.safeParse({
        body: {
          sourceSlug: "ichigo-kurosaki",
          targetSlug: "kisuke-urahara",
          relationshipType: "TRAINED_BY",
          metadata: { note: "bankai training" },
        },
      });
      expect(result.success).toBe(true);
    });

    it("should reject an invalid relationship type not in allowlist", () => {
      const result = createRelationshipSchema.safeParse({
        body: {
          sourceSlug: "ichigo-kurosaki",
          targetSlug: "kisuke-urahara",
          relationshipType: "INVALID_RELATIONSHIP",
        },
      });
      expect(result.success).toBe(false);
    });

    it("should reject self-relationships where source equals target", () => {
      const result = createRelationshipSchema.safeParse({
        body: {
          sourceSlug: "ichigo-kurosaki",
          targetSlug: "ichigo-kurosaki",
          relationshipType: "TRAINED_BY",
        },
      });
      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toContain("Self-relationships are not allowed");
    });
  });

  describe("getPathSchema", () => {
    it("should accept valid from, to, and depth within 1..3", () => {
      const result = getPathSchema.safeParse({
        query: {
          from: "ichigo-kurosaki",
          to: "byakuya-kuchiki",
          depth: 2,
        },
      });
      expect(result.success).toBe(true);
    });

    it("should reject depth greater than 3", () => {
      const result = getPathSchema.safeParse({
        query: {
          from: "ichigo-kurosaki",
          to: "byakuya-kuchiki",
          depth: 5,
        },
      });
      expect(result.success).toBe(false);
    });

    it("should reject depth less than 1 or negative", () => {
      const result = getPathSchema.safeParse({
        query: {
          from: "ichigo-kurosaki",
          to: "byakuya-kuchiki",
          depth: 0,
        },
      });
      expect(result.success).toBe(false);
    });

    it("should reject when from equals to", () => {
      const result = getPathSchema.safeParse({
        query: {
          from: "ichigo-kurosaki",
          to: "ichigo-kurosaki",
          depth: 2,
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe("getRelationshipsSchema", () => {
    it("should accept valid slug with optional allowlisted filter type", () => {
      const result = getRelationshipsSchema.safeParse({
        params: { slug: "ichigo-kurosaki" },
        query: { type: "FOUGHT" },
      });
      expect(result.success).toBe(true);
    });

    it("should reject disallowed filter type", () => {
      const result = getRelationshipsSchema.safeParse({
        params: { slug: "ichigo-kurosaki" },
        query: { type: "HATES" },
      });
      expect(result.success).toBe(false);
    });
  });
});
