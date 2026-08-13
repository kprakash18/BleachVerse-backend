import rateLimit from "express-rate-limit";
import ApiError from "../errors/ApiError.js";
import errorCodes from "../errors/errorCodes.js";
import RATE_LIMIT_DEFAULTS from "./rateLimiter.constant.js";

const currentEnv = (process.env.NODE_ENV || "development").toLowerCase();
const activeDefaults = RATE_LIMIT_DEFAULTS[currentEnv] || RATE_LIMIT_DEFAULTS.development;

const getEnvNumber = (key, fallback) => {
  const value = process.env[key];
  if (value === undefined || value === "") return fallback;
  const num = Number(value);
  if (isNaN(num) || num <= 0) return fallback;
  return num;
};

const createLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs,
    limit: max,
    standardHeaders: true,
    legacyHeaders: false,  
    validate: { trustProxy: false }, // Suppress trust proxy warning logs
    handler: (req, res, next) => {
      next(
        new ApiError(
          429,
          errorCodes.RATE_LIMIT_EXCEEDED,
          "Too many requests"
        )
      );
    },
  });
};

const isProduction = currentEnv === "production";

export const globalRateLimiter = createLimiter(
  getEnvNumber("RATE_LIMIT_WINDOW_MS", activeDefaults.windowMs),
  isProduction ? getEnvNumber("RATE_LIMIT_MAX", activeDefaults.max) : activeDefaults.max
);

export const expensiveApiRateLimiter = createLimiter(
  getEnvNumber("RATE_LIMIT_EXPENSIVE_API_MS", activeDefaults.windowMs),
  isProduction ? getEnvNumber("RATE_LIMIT_EXPENSIVE_MAX", activeDefaults.expensiveMax) : activeDefaults.expensiveMax
);
