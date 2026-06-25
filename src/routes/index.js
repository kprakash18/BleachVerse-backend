import { Router } from "express";

import characterRoutes from "../modules/character/character.routes.js";
import arcRoutes from "../modules/arc/arc.routes.js";

// Central API router: mount every module's routes here (app.js prefixes them with /api/v1)
const router = Router();

// Character: /characters, /character/:slug
router.use("/", characterRoutes);

// Arc (+ child resources): /arcs, /arcs/:slug, /arcs/:slug/episodes ...
router.use("/arcs", arcRoutes);

// Add new modules above this line, e.g. router.use("/fights", fightRoutes);

export default router;
