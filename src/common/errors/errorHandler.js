import { errorResponse } from "../responses/errorResponse.js";
import { errorCodes } from "./errorCodes.js";
import { ApiError } from "./ApiError.js";

export const errorHandler = (err, req, res, next) => {
  // Known application errors
  if (err instanceof ApiError) {
    return errorResponse(
      res,
      err.statusCode,
      err.code,
      err.message,
      err.details,
    );
  }

  // Unexpected errors
  console.error(err);

  return errorResponse(
    res,
    500,
    errorCodes.INTERNAL_SERVER_ERROR,
    "Internal server error",
  );
};
