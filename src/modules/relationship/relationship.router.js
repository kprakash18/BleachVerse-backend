import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import * as relationshipController from "./relationship.controller.js";
import {
  createRelationshipSchema,
  getRelationshipsSchema,
  getPathSchema,
  characterSlugSchema,
} from "./relationship.validator.js";

const router = Router();

// Mutation
router.post(
  "/relationships",
  validateRequest(createRelationshipSchema),
  relationshipController.createRelationship
);

// Graph Path Traversal
router.get(
  "/graph/path",
  validateRequest(getPathSchema),
  relationshipController.getShortestPath
);

// Character Direct Relationships & Specific Traversals
router.get(
  "/characters/:slug/relationships",
  validateRequest(getRelationshipsSchema),
  relationshipController.getCharacterRelationships
);

router.get(
  "/characters/:slug/trainers",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterTrainers
);

router.get(
  "/characters/:slug/betrayed",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterBetrayed
);

router.get(
  "/characters/:slug/opponents",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterOpponents
);

router.get(
  "/characters/:slug/organizations",
  validateRequest(characterSlugSchema),
  relationshipController.getCharacterOrganizations
);

export default router;
