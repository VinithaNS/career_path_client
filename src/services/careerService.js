import api from "./api";

export const getAllCareers = async () => {
  const response = await api.get("/careers/all");
  return response.data;
};

export const getCareerById = async (careerId) => {
  const response = await api.get(`/careers/${careerId}`);
  return response.data;
};

export const searchCareers = async (search) => {
  const response = await api.get("/careers/search", {
    params: { search }
  });

  return response.data;
};

export const getFeaturedCareers = async () => {
  const response = await api.get("/careers/featured");
  return response.data;
};
