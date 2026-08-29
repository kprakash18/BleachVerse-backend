import prisma from "../../database/prisma.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { normalizeSlug } from "../../common/utils/slug.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import * as relationshipRepo from "./relationship.repository.js";

const ensureCharacterExists = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);
  const character = await prisma.character.findUnique({
    where: { slug: normalizedSlug },
    select: { slug: true, name: true },
  });

  if (!character) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Character not found",
    );
  }

  return character;
};

const ensureTargetExists = async (slug, relationshipType) => {
  const normalizedSlug = normalizeSlug(slug);
  if (relationshipType === "MEMBER_OF") {
    const organization = await prisma.organization.findUnique({
      where: { slug: normalizedSlug },
      select: { slug: true, name: true },
    });

    if (!organization) {
      throw new ApiError(
        404,
        errorCodes.RESOURCE_NOT_FOUND,
        "Organization not found",
      );
    }

    return organization;
  }

  return ensureCharacterExists(normalizedSlug);
};

const getTraversal = async (slug, key, fetcher) => {
  const character = await ensureCharacterExists(slug);
  return {
    character: character.name,
    slug: character.slug,
    [key]: await fetcher(character.slug),
  };
};

export const createRelationship = async ({ sourceSlug, targetSlug, relationshipType, metadata }) => {
  const [source, target] = await Promise.all([
    ensureCharacterExists(sourceSlug),
    ensureTargetExists(targetSlug, relationshipType),
  ]);

  return relationshipRepo.createRelationship(
    source.slug,
    target.slug,
    relationshipType,
    metadata,
  );
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
  const [from, to] = await Promise.all([
    ensureCharacterExists(fromSlug),
    ensureTargetExists(toSlug, "ALLIED_WITH"),
  ]);

  const path = await relationshipRepo.findShortestPath(from.slug, to.slug, depth);
  if (!path) {
    return {
      connected: false,
      from: from.slug,
      to: to.slug,
      maxDepthSearched: depth,
      path: null,
    };
  }

  return {
    connected: true,
    from: from.slug,
    to: to.slug,
    length: path.length,
    nodes: path.nodes,
    relationships: path.relationships,
  };
};

// Community Submissions
export const submitRelationship = async ({ sourceSlug, targetSlug, relationshipType, note, submittedBy }) => {
  const [source, target] = await Promise.all([
    ensureCharacterExists(sourceSlug),
    ensureTargetExists(targetSlug, relationshipType),
  ]);

  return relationshipRepo.createSubmission({
    sourceSlug: source.slug,
    targetSlug: target.slug,
    relationshipType,
    note: note || null,
    submittedBy: submittedBy || "Anonymous Fan",
    status: "PENDING",
  });
};

export const getSubmissions = async (query) => {
  const { page, limit, skip } = calculatePaginationParams(query);
  const where = query.status ? { status: query.status } : {};
  const orderBy = { createdAt: "desc" };

  const [submissions, totalItems] = await Promise.all([
    relationshipRepo.findSubmissions({ where, skip, take: limit, orderBy }),
    relationshipRepo.countSubmissions(where),
  ]);

  return buildPaginatedResponse({
    data: submissions,
    totalItems,
    page,
    limit,
  });
};

export const reviewSubmission = async (id, { status, reviewerNotes }) => {
  const submission = await relationshipRepo.findSubmissionById(id);
  if (!submission) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Submission not found");
  }

  if (submission.status !== "PENDING") {
    throw new ApiError(400, errorCodes.VALIDATION_ERROR, `Submission has already been ${submission.status.toLowerCase()}`);
  }

  let createdRelationship = null;
  if (status === "APPROVED") {
    createdRelationship = await createRelationship({
      sourceSlug: submission.sourceSlug,
      targetSlug: submission.targetSlug,
      relationshipType: submission.relationshipType,
      metadata: submission.note ? { note: submission.note } : {},
    });
  }

  const updatedSubmission = await relationshipRepo.updateSubmission(id, {
    status,
    reviewerNotes: reviewerNotes || null,
    reviewedAt: new Date(),
  });

  return {
    submission: updatedSubmission,
    graphRelationship: createdRelationship,
  };
};
