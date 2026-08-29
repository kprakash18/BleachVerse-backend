import ApiError from "../errors/ApiError.js";
import errorCodes from "../errors/errorCodes.js";

export const requireAdmin = (req, res, next) => {
  const apiKey =
    req.headers["x-api-key"] ||
    req.headers.authorization?.replace(/^Bearer\s+/i, "");

  const expectedKey = process.env.ADMIN_API_KEY;

  if (!apiKey || !expectedKey || apiKey !== expectedKey) {
    throw new ApiError(
      401,
      errorCodes.UNAUTHORIZED,
      "Unauthorized: Invalid or missing Admin API Key",
    );
  }

  next();
};
