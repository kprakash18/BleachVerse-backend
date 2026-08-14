import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import errorResponse from "../responses/errorResponse.js";
import errorCodes from "./errorCodes.js";
import { ApiError } from "./ApiError.js";

// Helper function to sanitize connection strings and passwords from text
export const sanitizeSecrets = (str) => {
  if (typeof str !== "string") return str;

  // Redact database URIs (e.g. postgresql://user:password@host/db or mongodb://...)
  let sanitized = str.replace(
    /(postgresql|mongodb|mysql|mssql):\/\/[^@\s]+:[^@\s]+@[^\s]+/gi,
    "$1://<redacted_credentials>@<host>"
  );

  // Redact credentials in queries/parameters (password=..., passwd=..., pwd=..., DATABASE_URL=...)
  sanitized = sanitized.replace(
    /\b(password|passwd|pwd|DATABASE_URL)\s*=\s*['"]?[^\s'";,&]+['"]?/gi,
    "$1=<redacted>"
  );

  return sanitized;
};

// Helper function to recursively sanitize string properties in error objects
export const sanitizeError = (err) => {
  if (!err) return err;

  if (typeof err === "string") {
    return sanitizeSecrets(err);
  }

  const sanitizedErr = Object.create(Object.getPrototypeOf(err));
  Object.getOwnPropertyNames(err).forEach((prop) => {
    const val = err[prop];
    if (typeof val === "string") {
      sanitizedErr[prop] = sanitizeSecrets(val);
    } else if (val && typeof val === "object") {
      try {
        sanitizedErr[prop] = JSON.parse(sanitizeSecrets(JSON.stringify(val)));
      } catch {
        sanitizedErr[prop] = val;
      }
    } else {
      sanitizedErr[prop] = val;
    }
  });

  sanitizedErr.message = sanitizeSecrets(err.message || "");
  sanitizedErr.stack = sanitizeSecrets(err.stack || "");

  return sanitizedErr;
};

export const errorHandler = (err, req, res, next) => {
  const isProduction = (process.env.NODE_ENV || "development").toLowerCase() === "production";
  const sanitizedErr = sanitizeError(err);

  // Log diagnostic error on server side (redacted of credentials)
  const requestId = req.id || "N/A";
  console.error(
    `[Error] Request ID: ${requestId} | Method: ${req.method} | Path: ${req.path} | Error: ${sanitizedErr.message}\nStack: ${sanitizedErr.stack}`
  );

  // 1. ApiError (Expected/Operational Errors)
  if (err instanceof ApiError) {
    return errorResponse(
      res,
      err.statusCode,
      err.code,
      sanitizedErr.message,
      sanitizedErr.details
    );
  }

  // 2. ZodError (Validation failure bubbling directly)
  if (err instanceof ZodError) {
    return errorResponse(
      res,
      400,
      errorCodes.VALIDATION_ERROR,
      "Validation failed",
      err.issues
    );
  }

  // 3. Body-parser Entity Too Large
  if (err.type === "entity.too.large" || err.status === 413 || err.statusCode === 413) {
    return errorResponse(
      res,
      413,
      errorCodes.PAYLOAD_TOO_LARGE,
      "Request payload too large"
    );
  }

  // 4. Body-parser Malformed JSON (SyntaxError 400)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return errorResponse(
      res,
      400,
      errorCodes.VALIDATION_ERROR,
      "Malformed JSON payload"
    );
  }

  // 5. Prisma Known request exceptions
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return errorResponse(
        res,
        404,
        errorCodes.RESOURCE_NOT_FOUND,
        "Resource not found"
      );
    }
    if (err.code === "P2002") {
      return errorResponse(
        res,
        409,
        errorCodes.RESOURCE_ALREADY_EXISTS,
        "Resource already exists"
      );
    }
  }

  // 6. Unknown/Unexpected Errors
  if (isProduction) {
    return errorResponse(
      res,
      500,
      errorCodes.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred."
    );
  } else {
    // Development diagnostics response
    return errorResponse(
      res,
      500,
      errorCodes.INTERNAL_SERVER_ERROR,
      sanitizedErr.message,
      {
        stack: sanitizedErr.stack,
        details: sanitizedErr.details || null
      }
    );
  }
};
