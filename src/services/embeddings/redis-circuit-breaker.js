import { redisService } from "../cache/redis.service.js";
import { embeddingCircuitBreaker } from "./circuit-breaker.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const CIRCUIT_KEY = "semantic:circuit:gemini";
const DEFAULT_COOLDOWN_SECONDS = 60; // 60 seconds TTL on 429

export class RedisCircuitBreaker {
  /**
   * Checks if the distributed circuit is open.
   * @returns {Promise<boolean>}
   */
  async isCircuitOpen() {
    try {
      const state = await redisService.get(CIRCUIT_KEY);
      if (state === "OPEN") {
        return true;
      }
    } catch {
      // If Redis is unreachable, fallback to local circuit breaker state
      return embeddingCircuitBreaker.getState() === "OPEN";
    }
    return false;
  }

  /**
   * Trips the distributed circuit to OPEN for a specified cooldown period.
   * @param {number} [cooldownSeconds=60]
   * @returns {Promise<void>}
   */
  async tripCircuit(cooldownSeconds = DEFAULT_COOLDOWN_SECONDS) {
    try {
      await redisService.set(CIRCUIT_KEY, "OPEN", cooldownSeconds);
    } catch {
      // Local fallback
    }
    embeddingCircuitBreaker.recordFailure(new Error("429 Rate Limit"));
  }

  /**
   * Resets the distributed circuit.
   * @returns {Promise<void>}
   */
  async resetCircuit() {
    try {
      await redisService.del(CIRCUIT_KEY);
    } catch {
      // Local fallback
    }
    embeddingCircuitBreaker.reset();
  }

  /**
   * Executes an asynchronous operation protected by the distributed Redis circuit breaker.
   * @param {Function} fn
   * @returns {Promise<any>}
   */
  async execute(fn) {
    const isOpen = await this.isCircuitOpen();
    if (isOpen) {
      throw new ApiError(
        503,
        errorCodes.SERVICE_UNAVAILABLE || "SEMANTIC_SEARCH_UNAVAILABLE",
        "Semantic search is temporarily unavailable. Please try again shortly."
      );
    }

    try {
      const result = await fn();
      return result;
    } catch (err) {
      const isRateLimit =
        err?.message?.includes("429") ||
        err?.message?.includes("quota") ||
        err?.message?.includes("Resource exhausted") ||
        err?.statusCode === 503 ||
        err?.statusCode === 429;

      if (isRateLimit) {
        // Immediately trip distributed circuit for 60 seconds
        await this.tripCircuit(DEFAULT_COOLDOWN_SECONDS);
      }
      throw err;
    }
  }
}

export const redisCircuitBreaker = new RedisCircuitBreaker();
