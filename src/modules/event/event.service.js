import * as eventRepository from "./event.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

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
    page = 1,
    limit = 10,
    search,
    type,
    sourceMaterial,
    arcSlug,
    locationSlug,
    sortBy = "title",
    sortOrder = "asc",
  } = query;

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

  const skip = (page - 1) * limit;

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

  return {
    data: events,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getEventBySlug = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

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
