import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let redisClient = null;

export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 1,
      retryStrategy(times) {
        if (times > 5) {
          return null; // Stop retrying after 5 attempts if Redis instance is down
        }
        return Math.min(times * 150, 2000);
      },
      reconnectOnError(err) {
        return err.message.includes("READONLY");
      },
    });

    redisClient.on("error", (err) => {
      if (process.env.NODE_ENV !== "test") {
        console.warn(`[Redis] Connection notice: ${err.message}`);
      }
    });

    redisClient.on("connect", () => {
      console.log("[Redis] Connected successfully to Redis instance");
    });
  }

  return redisClient;
}

export default getRedisClient;
