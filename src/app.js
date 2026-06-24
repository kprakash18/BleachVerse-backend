import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import characterRoute from "./modules/character/character.routes.js";
import ArcRoutes from "./modules/arc/arc.routes.js";
const app = express();

app.use(express.json());

// API Documentation UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes here
app.use("/api/v1", characterRoute);
app.use("/api/v1/arcs", ArcRoutes);

app.use(errorHandler); // must come after routes

export default app;
