import { Router } from "express";

import characterRoutes from "../modules/character/character.routes.js";
import arcRoutes from "../modules/arc/arc.routes.js";
import episodeRoutes from "../modules/episode/episode.router.js";
import fightRoutes from "../modules/fight/fight.router.js";

const router = Router();

router.use("/", characterRoutes);
router.use("/", episodeRoutes);
router.use("/", fightRoutes);
router.use("/arcs", arcRoutes);

export default router;
