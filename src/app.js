import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./docs/swagger.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./common/errors/errorHandler.js";

const app = express();

// Global middlewares (add cors, helmet, rate limiting, auth here)
app.use(express.json());

// API documentation (Swagger UI)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes (all versioned under /api/v1)
app.use("/api/v1", apiRoutes);

// Global error handler (must come after routes)
app.use(errorHandler);

export default app;
