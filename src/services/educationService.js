import api from "./api";

// Active Courses for Education page
export const getActiveCourses = async () => {
  const response = await api.get("/degree-courses/active");
  return response.data;
};

// Search Courses for Education page
export const searchCourses = async (search = "") => {
  const response = await api.get(
    `/degree-courses/search?search=${encodeURIComponent(search)}`
  );
  return response.data;
};

// Name-to-ID resolver for 11th Grade & Department clicks
export const getCourseByName = async (name) => {
  const response = await api.get(
    `/degree-courses/by-name?name=${encodeURIComponent(name)}`
  );
  return response.data;
};

// Single Course Details by ID
export const getCourseById = async (id) => {
  const response = await api.get(`/degree-courses/${id}`);
  return response.data;
};

// All Degree Courses
export const getAllCourses = async () => {
  const response = await api.get("/degree-courses/all");
  return response.data;
};

// Single Diploma Course Details by ID
export const getDiplomaById = async (id) => {
  const response = await api.get(`/diploma-courses/${id}`);
  return response.data;
};

// All Diploma Courses
export const getAllDiplomas = async () => {
  const response = await api.get("/diploma-courses/all");
  return response.data;
};
