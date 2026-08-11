import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 15000,
    hookTimeout: 15000,
    env: {
      CORS_ALLOWED_ORIGINS: "http://localhost:5173",
    },
  },
});
