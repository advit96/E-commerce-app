export const API_BASE = "http://localhost:3000";

export const buildImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
};


