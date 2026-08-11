import express from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import cors from 'cors' ;

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

// cors allow origins
let allowedOrigins = [];

if (process.env.CORS_ALLOWED_ORIGINS) {
  allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(",").map((o) => o.trim());
} else {
  const isProduction = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === "production";
  if (isProduction) {
    throw new Error("CORS_ALLOWED_ORIGINS environment variable is required in production mode");
  }
}

app.use(cors({
  origin: (origin, callback) => {

    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is allowed
    } else {
      callback(null, false); 
    }
  },
  methods: ["GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  credentials: false,
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", apiRoutes);

app.use(errorHandler);

export default app;
