import { expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

export { request, app };

export const expectPaginationContract = (res, expectedPage = 1, expectedLimit = 10, totalKey = "totalItems") => {
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("data");
  expect(res.body).toHaveProperty("pagination");
  expect(Array.isArray(res.body.data)).toBe(true);
  expect(res.body.pagination).toMatchObject({
    page: expectedPage,
    limit: expectedLimit,
    [totalKey]: expect.any(Number),
    totalPages: expect.any(Number),
  });
};

export const expectDetailContract = (res) => {
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("data");
  expect(typeof res.body.data).toBe("object");
  expect(res.body.data).not.toBeNull();
  expect(Array.isArray(res.body.data)).toBe(false);
};

export const expectErrorContract = (res, expectedStatus, expectedErrorCode) => {
  expect(res.status).toBe(expectedStatus);
  expect(res.body).toHaveProperty("error");
  expect(res.body.error).toHaveProperty("code", expectedErrorCode);
  expect(res.body.error).toHaveProperty("message");
  expect(typeof res.body.error.message).toBe("string");
};
