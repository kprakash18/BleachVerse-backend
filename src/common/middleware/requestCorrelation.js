import crypto from "crypto";

export const requestCorrelation = (req, res, next) => {
  const requestId = crypto.randomUUID();
  req.id = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
};
