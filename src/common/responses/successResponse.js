const successResponse = (res, data, statusCode = 200, pagination = null) => {
  const response = {
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }
  return res.status(statusCode).json(response);
};

export default successResponse;
