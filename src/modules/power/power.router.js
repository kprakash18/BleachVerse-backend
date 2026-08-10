import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { getPowersSchema, getPowerByIdSchema } from "./power.validator.js";
import * as powerController from "./power.controller.js";

const router = Router();

router.get("/powers", validateRequest(getPowersSchema), powerController.getPowers);

router.get(
  "/powers/:id",
  validateRequest(getPowerByIdSchema),
  powerController.getPowerById,
);

export default router;
