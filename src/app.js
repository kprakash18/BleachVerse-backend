import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import cors from 'cors' ;

import swaggerSpec from "./docs/swagger.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import { globalRateLimiter } from "./common/middleware/rateLimmiter.js";

const app = express();

// Proxy configuration
if (process.env.TRUST_PROXY !== undefined && process.env.TRUST_PROXY !== "") {
  const theTrustedProxy = process.env.TRUST_PROXY;
  const isProduction = (process.env.NODE_ENV || "development").toLowerCase() === "production";

  if (isProduction && theTrustedProxy === "false") {
    throw new Error(
      "Security Error: In production, TRUST_PROXY must be set to 'true' (or specific proxy IPs) to ensure accurate client IP identification."
    );
  }
  app.set(
    "trust proxy",
    theTrustedProxy === "true" ? true : theTrustedProxy === "false" ? false : theTrustedProxy
  );
} else {
  throw new Error("TRUST_PROXY environment variable is required. Please set it in your configuration.");
}



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

// rate limit 
app.use('/api/v1', globalRateLimiter)

app.use(express.json({ limit: "10kb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", apiRoutes);

app.use(errorHandler);

export default app;
