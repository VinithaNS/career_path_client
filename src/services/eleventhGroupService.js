import api from "./api";

export const getActiveEleventhGroups = async () => {
  const response = await api.get("/eleventh-groups/active");
  return response.data;
};

export const getAllEleventhGroups = async () => {
  const response = await api.get("/eleventh-groups/all");
  return response.data;
};

export const getEleventhGroupById = async (id) => {
  const response = await api.get(`/eleventh-groups/${id}`);
  return response.data;
};
