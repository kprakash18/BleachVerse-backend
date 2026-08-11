import express from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import swaggerSpec from "./docs/swagger.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./common/errors/errorHandler.js";

const app = express();

// Global middlewares (add cors, helmet, rate limiting, auth here)
app.use(helmet({
    frameguard : {
        action : 'deny' ,
    },
    referrerPolicy : {
        policy : 'no-referrer' ,
    },
    strictTransportSecurity: process.env.NODE_ENV === 'production' 
      ? { maxAge: 31536000, includeSubDomains: true, preload: true }
      : false,

      contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
      },
    },
}));

app.use(express.json());

// API documentation (Swagger UI)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes (all versioned under /api/v1)
app.use("/api/v1", apiRoutes);

// Global error handler (must come after routes)
app.use(errorHandler);

export default app;
