import { Router } from "express";

import characterRoutes from "../modules/character/character.routes.js";
import arcRoutes from "../modules/arc/arc.routes.js";
import episodeRoutes from "../modules/episode/episode.router.js";
import fightRoutes from "../modules/fight/fight.router.js";
import organizationRoutes from "../modules/organization/organization.router.js";
import zanpakutoRoutes from "../modules/zanpakuto/zanpakuto.router.js";
import locationRoutes from "../modules/location/location.router.js";
import raceRoutes from "../modules/race/race.router.js";
import quoteRoutes from "../modules/quote/quote.router.js";
import eventRoutes from "../modules/event/event.router.js";
import powerRoutes from "../modules/power/power.router.js";
import transformationRoutes from "../modules/transformation/transformation.router.js";
import appearanceRoutes from "../modules/appearance/appearance.router.js";

const router = Router();

router.use("/", characterRoutes);
router.use("/", episodeRoutes);
router.use("/", fightRoutes);
router.use("/", organizationRoutes);
router.use("/", zanpakutoRoutes);
router.use("/", locationRoutes);
router.use("/", raceRoutes);
router.use("/", quoteRoutes);
router.use("/", eventRoutes);
router.use("/", powerRoutes);
router.use("/", transformationRoutes);
router.use("/", appearanceRoutes);
router.use("/arcs", arcRoutes);

export default router;
