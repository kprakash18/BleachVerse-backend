export const calculatePaginationParams = ({ page = 1, limit = 10 } = {}) => {
  const parsedPage = Math.max(1, Number(page) || 1);
  const parsedLimit = Math.max(1, Number(limit) || 10);
  const skip = (parsedPage - 1) * parsedLimit;

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip,
  };
};

export const buildPaginatedResponse = ({ data = [], totalItems = 0, page = 1, limit = 10 } = {}) => {
  const parsedTotalItems = Math.max(0, Number(totalItems) || 0);
  const parsedPage = Math.max(1, Number(page) || 1);
  const parsedLimit = Math.max(1, Number(limit) || 10);
  const totalPages = Math.ceil(parsedTotalItems / parsedLimit);

  return {
    data,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems: parsedTotalItems,
      totalPages,
    },
  };
};
