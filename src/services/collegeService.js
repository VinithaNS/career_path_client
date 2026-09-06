import api from "./api";

export const getActiveColleges = async () => {
  const response = await api.get("/colleges/active");
  return response.data;
};

export const searchColleges = async (search) => {
  const response = await api.get("/colleges/search", {
    params: { search }
  });
  return response.data;
};

export const getCollegeById = async (id) => {
  const response = await api.get(`/colleges/${id}`);
  return response.data;
};

export const getCollegesByState = async (state) => {
  const response = await api.get(`/colleges/state/${state}`);
  return response.data;
};
