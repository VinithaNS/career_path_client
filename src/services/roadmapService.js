import api from "./api";

// Get all career roadmaps
export const getCareerRoadmaps = async (signal) => {
  const response = await api.get("/career-roadmaps/all", { signal });
  return response.data;
};

// Get Career Roadmap by ID
export const getCareerRoadmapById = async (roadmapId, signal) => {
  const response = await api.get(`/career-roadmaps/${roadmapId}`, { signal });

  return response.data;
};

// Get all skill roadmaps
export const getSkillRoadmaps = async (signal) => {
  const response = await api.get("/skill-roadmaps/all", { signal });
  return response.data;
};

// Get skill roadmap by ID
export const getSkillRoadmapById = async (roadmapId, signal) => {
  const response = await api.get(`/skill-roadmaps/${roadmapId}`, { signal });

  return response.data;
};
