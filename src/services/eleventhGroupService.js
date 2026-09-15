import api from "./api";

// Get all active 11th grade groups
export const getActiveEleventhGroups = async (signal) => {
  const response = await api.get("/eleventh-groups/active", { signal });
  return response.data;
};

// Get all 11th grade groups (including inactive, if needed elsewhere)
export const getEleventhGroups = async (signal) => {
  const response = await api.get("/eleventh-groups/all", { signal });
  return response.data;
};

// Get a single 11th grade group by ID
export const getEleventhGroupById = async (groupId, signal) => {
  const response = await api.get(`/eleventh-groups/${groupId}`, { signal });
  return response.data;
};
