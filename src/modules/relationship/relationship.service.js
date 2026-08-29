import prisma from "../../database/prisma.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import * as relationshipRepo from "./relationship.repository.js";

const ensureCharacterExists = async (slug) => {
  const character = await prisma.character.findUnique({
    where: { slug },
    select: { slug: true, name: true },
  });
  if (!character) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, `Character with slug '${slug}' not found`);
  }
  return character;
};

const ensureTargetExists = async (slug, relationshipType) => {
  if (relationshipType === "MEMBER_OF") {
    const org = await prisma.organization.findUnique({
      where: { slug },
      select: { slug: true, name: true },
    });
    if (!org) {
      throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, `Organization with slug '${slug}' not found`);
    }
    return org;
  }
  return ensureCharacterExists(slug);
};

const getTraversal = async (slug, key, fetcher) => {
  const character = await ensureCharacterExists(slug);
  return { character: character.name, slug: character.slug, [key]: await fetcher(slug) };
};

export const createRelationship = async ({ sourceSlug, targetSlug, relationshipType, metadata }) => {
  const [source, target] = await Promise.all([
    ensureCharacterExists(sourceSlug),
    ensureTargetExists(targetSlug, relationshipType),
  ]);
  return relationshipRepo.createRelationship(source.slug, target.slug, relationshipType, metadata);
};

export const getCharacterRelationships = (slug, type) =>
  getTraversal(slug, "relationships", (s) => relationshipRepo.getCharacterRelationships(s, type));

export const getCharacterTrainers = (slug) =>
  getTraversal(slug, "trainers", relationshipRepo.getCharacterTrainers);

export const getCharacterBetrayed = (slug) =>
  getTraversal(slug, "betrayed", relationshipRepo.getCharacterBetrayed);

export const getCharacterOpponents = (slug) =>
  getTraversal(slug, "opponents", relationshipRepo.getCharacterOpponents);

export const getCharacterOrganizations = (slug) =>
  getTraversal(slug, "organizations", relationshipRepo.getCharacterOrganizations);

export const getShortestPath = async (fromSlug, toSlug, depth = 2) => {
  await Promise.all([ensureCharacterExists(fromSlug), ensureTargetExists(toSlug, "ALLIED_WITH")]);
  const path = await relationshipRepo.findShortestPath(fromSlug, toSlug, depth);
  if (!path) {
    return { connected: false, from: fromSlug, to: toSlug, maxDepthSearched: depth, path: null };
  }
  return { connected: true, from: fromSlug, to: toSlug, length: path.length, nodes: path.nodes, relationships: path.relationships };
};
