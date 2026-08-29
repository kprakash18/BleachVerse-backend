import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { requireAdmin } from "../../common/middleware/auth.js";
import * as relationshipController from "./relationship.controller.js";
import {
  createRelationshipSchema,
  submitRelationshipSchema,
  reviewSubmissionSchema,
  getSubmissionsSchema,
  getRelationshipsSchema,
  getPathSchema,
  characterSlugSchema,
} from "./relationship.validator.js";

const router = Router();

// Community Submissions (Public) & Moderation Queue (Admin)
router.post(
  "/relationships/submissions",
  validateRequest(submitRelationshipSchema),
  relationshipController.submitRelationship,
);

router.get(
  "/relationships/submissions",
  requireAdmin,
  validateRequest(getSubmissionsSchema),
  relationshipController.getSubmissions,
);

router.patch(
  "/relationships/submissions/:id/review",
  requireAdmin,
  validateRequest(reviewSubmissionSchema),
  relationshipController.reviewSubmission,
);

// Admin Direct Graph Mutation
router.post(
  "/relationships",
  requireAdmin,
  validateRequest(createRelationshipSchema),
  relationshipController.createRelationship,
);

// Graph Path Traversal (Public)
router.get(
  "/graph/path",
  validateRequest(getPathSchema),
  relationshipController.getShortestPath,
);

// Character Direct Relationships & Specific Traversals (Public)
router.get(
  "/characters/:slug/relationships",
  validateRequest(getRelationshipsSchema),
  relationshipController.getCharacterRelationships,
);

router.get(
  "/characters/:slug/trainers",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterTrainers,
);

router.get(
  "/characters/:slug/betrayed",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterBetrayed,
);

router.get(
  "/characters/:slug/opponents",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterOpponents,
);

router.get(
  "/characters/:slug/organizations",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterOrganizations,
);

export default router;
