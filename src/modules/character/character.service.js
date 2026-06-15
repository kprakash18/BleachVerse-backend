import * as characterRepository from "./character.repository.js";
export const getCharacters = async (query) => {
  const { page, limit, search, status, sex, sortBy, sortOrder } = query;

  const where = {};
  console.log(query);
  if (status) {
    where.status = status;
  }

  if (sex) {
    where.sex = sex;
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const skip = (page - 1) * limit;

  const [characters, total] = await Promise.all([
    characterRepository.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),

    characterRepository.count(where),
  ]);

  return {
    data: characters,

    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
