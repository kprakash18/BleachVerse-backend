import { describe, it, expect, beforeEach, vi } from "vitest";
import { redisCircuitBreaker } from "../../../src/services/embeddings/redis-circuit-breaker.js";
import { getRedisClient } from "../../../src/config/redis.js";

describe("RedisCircuitBreaker", () => {
  beforeEach(async () => {
    await redisCircuitBreaker.resetCircuit();
  });

  it("should allow requests when circuit is closed", async () => {
    const isClosed = !(await redisCircuitBreaker.isCircuitOpen());
    expect(isClosed).toBe(true);

    const result = await redisCircuitBreaker.execute(async () => "test_ok");
    expect(result).toBe("test_ok");
  });

  it("should trip circuit to OPEN on 429 quota error and persist to Redis", async () => {
    const error429 = new Error("Gemini API: 429 You exceeded your current quota");

    await expect(
      redisCircuitBreaker.execute(async () => {
        throw error429;
      })
    ).rejects.toThrow();

    const isOpen = await redisCircuitBreaker.isCircuitOpen();
    expect(isOpen).toBe(true);

    const raw = await getRedisClient().get("semantic:circuit:gemini");
    const redisVal = raw ? JSON.parse(raw) : null;
    expect(redisVal).toBe("OPEN");
  });

  it("should immediately reject subsequent requests with 503 when circuit is OPEN", async () => {
    await redisCircuitBreaker.tripCircuit(10);
    expect(await redisCircuitBreaker.isCircuitOpen()).toBe(true);

    const mockProbe = vi.fn();
    await expect(redisCircuitBreaker.execute(mockProbe)).rejects.toThrow(
      "Semantic search is temporarily unavailable"
    );
    expect(mockProbe).not.toHaveBeenCalled();
  });

  it("should reset circuit cleanly", async () => {
    await redisCircuitBreaker.tripCircuit(10);
    expect(await redisCircuitBreaker.isCircuitOpen()).toBe(true);

    await redisCircuitBreaker.resetCircuit();
    expect(await redisCircuitBreaker.isCircuitOpen()).toBe(false);
  });
});
