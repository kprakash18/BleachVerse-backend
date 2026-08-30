import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

export const CIRCUIT_STATE = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
};

export class CircuitBreaker {
  /**
   * @param {Object} [options]
   * @param {number} [options.failureThreshold] Consecutive failures before opening circuit (default: 2)
   * @param {number} [options.cooldownMs] Cooldown period before transitioning from OPEN to HALF_OPEN (default: 30000ms)
   */
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold ?? 2;
    this.cooldownMs = options.cooldownMs ?? 60000;
    this.state = CIRCUIT_STATE.CLOSED;
    this.consecutiveFailures = 0;
    this.lastStateChange = Date.now();
  }

  /**
   * Returns current active state, handling automatic transition to HALF_OPEN when cooldown expires.
   */
  getState() {
    if (this.state === CIRCUIT_STATE.OPEN) {
      const elapsed = Date.now() - this.lastStateChange;
      if (elapsed >= this.cooldownMs) {
        this.state = CIRCUIT_STATE.HALF_OPEN;
        this.lastStateChange = Date.now();
      }
    }
    return this.state;
  }

  /**
   * Executes an asynchronous operation through the circuit breaker protection layer.
   * @param {Function} fn
   * @returns {Promise<any>}
   */
  async execute(fn) {
    const currentState = this.getState();

    if (currentState === CIRCUIT_STATE.OPEN) {
      throw new ApiError(
        503,
        errorCodes.SERVICE_UNAVAILABLE || "SEMANTIC_SEARCH_UNAVAILABLE",
        "Semantic search is temporarily unavailable. Please try again shortly."
      );
    }

    try {
      const result = await fn();
      this.recordSuccess();
      return result;
    } catch (err) {
      this.recordFailure(err);
      throw err;
    }
  }

  /**
   * Records a successful probe or request.
   */
  recordSuccess() {
    this.consecutiveFailures = 0;
    if (this.state === CIRCUIT_STATE.HALF_OPEN) {
      this.state = CIRCUIT_STATE.CLOSED;
      this.lastStateChange = Date.now();
    }
  }

  /**
   * Records a failure and evaluates whether to trip circuit to OPEN.
   */
  recordFailure(err) {
    this.consecutiveFailures++;

    const isRateLimit =
      err?.message?.includes("429") ||
      err?.message?.includes("quota") ||
      err?.message?.includes("Resource exhausted");

    // Rate limits trip the circuit immediately; other transient errors trip on reaching threshold
    if (this.state === CIRCUIT_STATE.HALF_OPEN || isRateLimit || this.consecutiveFailures >= this.failureThreshold) {
      this.state = CIRCUIT_STATE.OPEN;
      this.lastStateChange = Date.now();
    }
  }

  /**
   * Manually resets circuit breaker to CLOSED state.
   */
  reset() {
    this.state = CIRCUIT_STATE.CLOSED;
    this.consecutiveFailures = 0;
    this.lastStateChange = Date.now();
  }
}

// Global singleton circuit breaker for embedding requests
export const embeddingCircuitBreaker = new CircuitBreaker();
