import prisma from "../../database/prisma.js";

export const findMany = async ({ where, orderBy, skip, take }) => {
  return prisma.character.findMany({
    where,
    orderBy,
    skip,
    take,
  });
};

export const count = async (where) => {
  return prisma.character.count({
    where,
  });
};
