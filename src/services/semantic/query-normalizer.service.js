/**
 * Normalizes a user search query for deterministic caching and consistent semantic matching.
 * - Converts to lowercase
 * - Trims leading/trailing whitespace
 * - Collapses consecutive spaces into a single space
 * - Removes non-printable or noisy control characters
 * @param {string} query
 * @returns {string}
 */
export function normalizeQuery(query) {
  if (typeof query !== "string") {
    return "";
  }

  return query
    .toLowerCase()
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control chars
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")          // Keep unicode letters, numbers, hyphens, spaces
    .replace(/\s+/g, " ")                          // Collapse multi-spaces
    .trim();
}
