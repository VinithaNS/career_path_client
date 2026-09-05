import api from "./api";

// Get all career roadmaps
export const getCareerRoadmaps = async () => {
  const response = await api.get("/career-roadmaps/all");
  return response.data;
};

// Get career roadmap by ID
export const getCareerRoadmapById = async (roadmapId) => {
  const response = await api.get(`/career-roadmaps/${roadmapId}`);

  return response.data;
};

// Get all skill roadmaps
export const getSkillRoadmaps = async () => {
  const response = await api.get("/skill-roadmaps/all");
  return response.data;
};

// Get skill roadmap by ID
export const getSkillRoadmapById = async (roadmapId) => {
  const response = await api.get(`/skill-roadmaps/${roadmapId}`);

  return response.data;
};
