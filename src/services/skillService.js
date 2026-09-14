import api from "./api";

export const getActiveSkills = async (signal) => {
  const response = await api.get("/skills/active", { signal });
  return response.data;
};

export const searchSkills = async (search, signal) => {
  const response = await api.get("/skills/search", {
    params: { search },
    signal
  });

  return response.data;
};

export const getSkillById = async (skillId, signal) => {
  const response = await api.get(`/skills/${skillId}`, { signal });
  return response.data;
};

export const getSkillVideos = async (skillId, signal) => {
  const response = await api.get(`/skills/${skillId}/videos`, { signal });
  return response.data;
};
