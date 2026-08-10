import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { getRacesSchema, getRaceByNameSchema } from "./race.validator.js";
import * as raceController from "./race.controller.js";

const router = Router();

router.get("/races", validateRequest(getRacesSchema), raceController.getRaces);

router.get(
  "/races/:name",
  validateRequest(getRaceByNameSchema),
  raceController.getRaceByName,
);

export default router;
