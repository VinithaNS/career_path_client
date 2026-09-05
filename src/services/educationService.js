import api from "./api";

export const getAllCourses = async () => {
  const response = await api.get("/degree-courses/all");
  return response.data;
};

export const getActiveCourses = async () => {
  const response = await api.get("/degree-courses/active");
  return response.data;
};

export const getCourseById = async (courseId) => {
  const response = await api.get(`/degree-courses/${courseId}`);

  return response.data;
};

export const searchCourses = async (search) => {
  const response = await api.get("/degree-courses/search", {
    params: { search }
  });

  return response.data;
};

export const getCoursesByCategory = async (categoryId) => {
  const response = await api.get(`/degree-courses/category/${categoryId}`);

  return response.data;
};
