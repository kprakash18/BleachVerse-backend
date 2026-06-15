import { ZodError } from "zod";
import ApiError from "../errors/ApiError.js";
import errorCodes from "../errors/errorCodes.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.validatedData = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ApiError(
            400,
            errorCodes.VALIDATION_ERROR,
            "Validation failed",
            error.issues,
          ),
        );
      }

      next(error);
    }
  };
};
