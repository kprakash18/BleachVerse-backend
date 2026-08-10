import { Router } from "express";

import characterRoutes from "../modules/character/character.routes.js";
import arcRoutes from "../modules/arc/arc.routes.js";
import episodeRoutes from "../modules/episode/episode.router.js";
import fightRoutes from "../modules/fight/fight.router.js";
import organizationRoutes from "../modules/organization/organization.router.js";
import zanpakutoRoutes from "../modules/zanpakuto/zanpakuto.router.js";

const router = Router();

router.use("/", characterRoutes);
router.use("/", episodeRoutes);
router.use("/", fightRoutes);
router.use("/", organizationRoutes);
router.use("/", zanpakutoRoutes);
router.use("/arcs", arcRoutes);

export default router;
