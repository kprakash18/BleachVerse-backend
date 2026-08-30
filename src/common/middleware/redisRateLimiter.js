import { getRedisClient } from "../../config/redis.js";
import { expensiveApiRateLimiter } from "./rateLimmiter.js";
import ApiError from "../errors/ApiError.js";
import errorCodes from "../errors/errorCodes.js";

const DEFAULT_WINDOW_SECONDS = 60;
const DEFAULT_MAX_REQUESTS = 20; // 20 requests per minute per IP for semantic search

export const redisSemanticRateLimiter = (options = {}) => {
  const windowSec = options.windowSeconds || DEFAULT_WINDOW_SECONDS;
  const maxReq = options.maxRequests || DEFAULT_MAX_REQUESTS;

  return async (req, res, next) => {
    // In test environment, allow high throughput or fallback
    if (process.env.NODE_ENV === "test") {
      return next();
    }

    try {
      const client = getRedisClient();
      const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
      const key = `rate-limit:semantic:${ip}`;

      const current = await client.incr(key);

      if (current === 1) {
        await client.expire(key, windowSec);
      }

      // Add standard rate limit headers
      res.setHeader("X-RateLimit-Limit", maxReq);
      res.setHeader("X-RateLimit-Remaining", Math.max(0, maxReq - current));

      if (current > maxReq) {
        return next(
          new ApiError(
            429,
            errorCodes.RATE_LIMIT_EXCEEDED,
            "Too many search requests. Please slow down and try again shortly."
          )
        );
      }

      next();
    } catch {
      // If Redis is unreachable, seamlessly fall back to local Express rate limiter
      return expensiveApiRateLimiter(req, res, next);
    }
  };
};

export const semanticSearchRateLimiter = redisSemanticRateLimiter();
