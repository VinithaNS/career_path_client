import api from "./api";

// =====================================================
// CAREER ROADMAPS
// =====================================================

// Get all career roadmaps
export const getCareerRoadmaps = async (signal) => {
  const response = await api.get("/career-roadmaps/all", { signal });
  return response.data;
};

// Alias for getCareerRoadmaps
export const getAllRoadmaps = async (signal) => {
  const response = await api.get("/career-roadmaps/all", { signal });
  return response.data;
};

// Get Career Roadmap by ID
export const getCareerRoadmapById = async (roadmapId, signal) => {
  const response = await api.get(`/career-roadmaps/${roadmapId}`, { signal });
  return response.data;
};

// Alias for getCareerRoadmapById
export const getRoadmapById = async (roadmapId, signal) => {
  const response = await api.get(`/career-roadmaps/${roadmapId}`, { signal });
  return response.data;
};

// Get Career Roadmap by Title (Required by EleventhGroupDetails & DepartmentDetails)
export const getRoadmapByTitle = async (title, signal) => {
  const response = await api.get(
    `/career-roadmaps/by-title?title=${encodeURIComponent(title)}`,
    { signal }
  );
  return response.data;
};

// =====================================================
// SKILL ROADMAPS
// =====================================================

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
