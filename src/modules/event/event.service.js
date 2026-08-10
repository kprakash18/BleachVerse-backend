import * as eventRepository from "./event.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

const formatEventDetail = (event) => ({
  title: event.title,
  slug: event.slug,
  type: event.type,
  description: event.description,
  isCanonical: event.isCanonical,
  sourceMaterial: event.sourceMaterial,
  arc: event.arc,
  location: event.location,
  episode: event.episode
    ? {
        title: event.episode.title,
        slug: event.episode.slug,
        episodeNumber: event.episode.number,
      }
    : null,
  participants: event.participants.map((p) => ({
    role: p.role,
    character: p.character,
  })),
});

export const getEvents = async (query) => {
  const {
    search,
    type,
    sourceMaterial,
    arcSlug,
    locationSlug,
    sortBy = "title",
    sortOrder = "asc",
  } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  const where = {};

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (type) {
    where.type = type.toUpperCase();
  }

  if (sourceMaterial) {
    where.sourceMaterial = sourceMaterial.toUpperCase();
  }

  if (arcSlug) {
    where.arc = {
      slug: arcSlug,
    };
  }

  if (locationSlug) {
    where.location = {
      slug: locationSlug,
    };
  }

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [events, totalItems] = await Promise.all([
    eventRepository.findEvents({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    eventRepository.countEvents(where),
  ]);

  return buildPaginatedResponse({
    data: events,
    totalItems,
    page,
    limit,
  });
};

export const getEventBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

  const event = await eventRepository.findEventBySlug(normalizedSlug);

  if (!event) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Event not found",
    );
  }

  return formatEventDetail(event);
};
