export const normalizeSlug = (slug) => {
  if (typeof slug !== "string") return "";
  return slug.trim().toLowerCase().replace(/\s+/g, "-");
};
