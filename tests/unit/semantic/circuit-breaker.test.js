import { describe, it, expect, beforeEach, vi } from "vitest";
import { CircuitBreaker, CIRCUIT_STATE } from "../../../src/services/embeddings/circuit-breaker.js";
import ApiError from "../../../src/common/errors/ApiError.js";

describe("CircuitBreaker", () => {
  let breaker;

  beforeEach(() => {
    breaker = new CircuitBreaker({ failureThreshold: 2, cooldownMs: 50 });
  });

  it("should start in CLOSED state and execute successful functions", async () => {
    expect(breaker.getState()).toBe(CIRCUIT_STATE.CLOSED);
    const result = await breaker.execute(async () => "success");
    expect(result).toBe("success");
    expect(breaker.getState()).toBe(CIRCUIT_STATE.CLOSED);
  });

  it("should trip to OPEN immediately on 429 quota error", async () => {
    const error429 = new Error("Gemini API: 429 You exceeded your current quota");

    await expect(
      breaker.execute(async () => {
        throw error429;
      })
    ).rejects.toThrow();

    expect(breaker.getState()).toBe(CIRCUIT_STATE.OPEN);
  });

  it("should reject requests immediately with 503 when circuit is OPEN", async () => {
    breaker.recordFailure(new Error("429 rate limit"));
    expect(breaker.getState()).toBe(CIRCUIT_STATE.OPEN);

    const mockFn = vi.fn();
    await expect(breaker.execute(mockFn)).rejects.toThrow(
      "Semantic search is temporarily unavailable"
    );
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should transition from OPEN to HALF_OPEN after cooldown expires and close on success", async () => {
    breaker.recordFailure(new Error("429 rate limit"));
    expect(breaker.state).toBe(CIRCUIT_STATE.OPEN);

    // Wait for cooldown
    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(breaker.getState()).toBe(CIRCUIT_STATE.HALF_OPEN);

    // Successful probe in HALF_OPEN state closes circuit
    const result = await breaker.execute(async () => "recovered");
    expect(result).toBe("recovered");
    expect(breaker.getState()).toBe(CIRCUIT_STATE.CLOSED);
  });

  it("should transition back to OPEN if probe fails in HALF_OPEN state", async () => {
    breaker.recordFailure(new Error("429 rate limit"));
    await new Promise((resolve) => setTimeout(resolve, 60));
    expect(breaker.getState()).toBe(CIRCUIT_STATE.HALF_OPEN);

    await expect(
      breaker.execute(async () => {
        throw new Error("still failing");
      })
    ).rejects.toThrow();

    expect(breaker.state).toBe(CIRCUIT_STATE.OPEN);
  });
});
