import errorCodes from "./errorCodes.js";

export class ApiError extends Error {
  constructor(
    statusCode = 500,
    code = errorCodes.INTERNAL_SERVER_ERROR,
    message = "An unexpected error occurred",
    details = null,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
export default ApiError;
