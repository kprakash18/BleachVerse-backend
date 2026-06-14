const errorResponse = (res, statusCode, code, message, details = null) => {
  const response = {
    error: {
      code,
      message,
    },
  };

  if (details) {
    response.error.details = details;
  }

  return res.status(statusCode).json(response);
};

export default errorResponse;
