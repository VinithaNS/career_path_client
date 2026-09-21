import api from "./api";

// Title-to-ID resolver for Role Modal & Stream clicks
export const getRoadmapByTitle = async (title, signal) => {
  const response = await api.get(
    `/career-roadmaps/by-title?title=${encodeURIComponent(title)}`,
    { signal }
  );
  return response.data;
};

export const getCareerRoadmapById = async (id, signal) => {
  const response = await api.get(`/career-roadmaps/${id}`, { signal });
  return response.data;
};

export const getCareerRoadmaps = async (signal) => {
  const response = await api.get("/career-roadmaps/all", { signal });
  return response.data;
};
