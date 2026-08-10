import * as quoteRepository from "./quote.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";

const formatQuoteDetail = (quote) => ({
  id: quote.id,
  text: quote.text,
  category: quote.category,
  isCanonical: quote.isCanonical,
  sourceMaterial: quote.sourceMaterial,
  character: quote.character,
  episode: quote.episode
    ? {
        title: quote.episode.title,
        slug: quote.episode.slug,
        episodeNumber: quote.episode.number,
      }
    : null,
  arc: quote.arc,
});

export const getQuotes = async (query) => {
  const {
    search,
    category,
    characterSlug,
    arcSlug,
    sortOrder = "asc",
  } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  const where = {};

  if (search) {
    where.text = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (category) {
    where.category = category.toUpperCase();
  }

  if (characterSlug) {
    where.character = {
      slug: characterSlug,
    };
  }

  if (arcSlug) {
    where.arc = {
      slug: arcSlug,
    };
  }

  const orderBy = {
    createdAt: sortOrder,
  };

  const [quotes, totalItems] = await Promise.all([
    quoteRepository.findQuotes({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    quoteRepository.countQuotes(where),
  ]);

  const data = quotes.map((q) => ({
    id: q.id,
    text: q.text,
    category: q.category,
    isCanonical: q.isCanonical,
    character: q.character,
    episode: q.episode
      ? {
          title: q.episode.title,
          slug: q.episode.slug,
          episodeNumber: q.episode.number,
        }
      : null,
    arc: q.arc,
  }));

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
};

export const getQuoteById = async (id) => {
  const quote = await quoteRepository.findQuoteById(id);

  if (!quote) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Quote not found",
    );
  }

  return formatQuoteDetail(quote);
};

export const getQuotesByCharacterSlug = async (query) => {
  const { characterSlug } = query;
  const { page, limit, skip } = calculatePaginationParams(query);
  const normalizedSlug = characterSlug.trim().toLowerCase();

  const [quotes, totalItems] = await Promise.all([
    quoteRepository.findQuotesByCharacterSlug({
      characterSlug: normalizedSlug,
      skip,
      take: limit,
    }),
    quoteRepository.countQuotesByCharacterSlug(normalizedSlug),
  ]);

  const data = quotes.map((q) => ({
    id: q.id,
    text: q.text,
    category: q.category,
    isCanonical: q.isCanonical,
    character: q.character,
    episode: q.episode
      ? {
          title: q.episode.title,
          slug: q.episode.slug,
          episodeNumber: q.episode.number,
        }
      : null,
    arc: q.arc,
  }));

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
};
