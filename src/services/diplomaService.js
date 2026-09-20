import api from "./api";

// Fetch all diploma courses with optional filters
export const getAllDiplomas = async (params = {}) => {
  const response = await api.get("/diploma-courses/all", { params });
  return response.data;
};

// Fetch active diploma courses
export const getActiveDiplomas = async () => {
  const response = await api.get("/diploma-courses/active");
  return response.data;
};

// Fetch single diploma course by ID
export const getDiplomaById = async (id) => {
  const response = await api.get(`/diploma-courses/${id}`);
  return response.data;
};

// Search diploma courses
export const searchDiplomas = async (search) => {
  const response = await api.get("/diploma-courses/search", {
    params: { search }
  });
  return response.data;
};

// Fetch diploma courses by category
export const getDiplomasByCategory = async (categoryId) => {
  const response = await api.get(`/diploma-courses/category/${categoryId}`);
  return response.data;
};

export default {
  getAllDiplomas,
  getActiveDiplomas,
  getDiplomaById,
  searchDiplomas,
  getDiplomasByCategory
};
