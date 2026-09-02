import api from "./api";

export const getCareers = async () => {
  const response = await api.get("/careers");
  return response.data;
};

export const getCareerById = async (id) => {
  const response = await api.get(`/careers/${id}`);
  return response.data;
};
