import api from "./api";

// Get all career roadmaps
export const getRoadmaps = async () => {
  const response = await api.get("/career-roadmaps");

  return response.data;
};

// Get roadmap by ID
export const getRoadmapById = async (id) => {
  const response = await api.get(`/career-roadmaps/${id}`);

  return response.data;
};

// Get roadmap by career ID
export const getRoadmapByCareerId = async (careerId) => {
  const response = await api.get(`/career-roadmaps/career/${careerId}`);

  return response.data;
};
