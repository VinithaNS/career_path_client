import api from "./api";

// =====================================================
// DEGREE COURSES
// =====================================================

// Resolve degree course by name (Required by DepartmentDetails.jsx & EleventhGroupDetails.jsx)
export const getCourseByName = async (name) => {
  const response = await api.get(
    `/degree-courses/by-name?name=${encodeURIComponent(name)}`
  );
  return response.data;
};

// Get all active degree courses
export const getActiveCourses = async () => {
  const response = await api.get("/degree-courses/active");
  return response.data;
};

// Search degree courses
export const searchCourses = async (searchTerm) => {
  const response = await api.get(
    `/degree-courses/search?search=${encodeURIComponent(searchTerm)}`
  );
  return response.data;
};

// Get all degree courses
export const getAllCourses = async () => {
  const response = await api.get("/degree-courses/all");
  return response.data;
};

// Get single degree course by ID
export const getCourseById = async (id) => {
  const response = await api.get(`/degree-courses/${id}`);
  return response.data;
};

// =====================================================
// DIPLOMA COURSES
// =====================================================

// Get all active diploma courses
export const getActiveDiplomas = async () => {
  const response = await api.get("/diploma-courses/active");
  return response.data;
};

// Get all diploma courses
export const getAllDiplomas = async () => {
  const response = await api.get("/diploma-courses/all");
  return response.data;
};

// Get single diploma course by ID
export const getDiplomaById = async (id) => {
  const response = await api.get(`/diploma-courses/${id}`);
  return response.data;
};

// Search diploma courses
export const searchDiplomas = async (searchTerm) => {
  const response = await api.get(
    `/diploma-courses/search?search=${encodeURIComponent(searchTerm)}`
  );
  return response.data;
};

// =====================================================
// COURSE LEARNING PATH
// =====================================================
export const getLearningPaths = async () => {
  const response = await api.get("/education-paths");
  return response.data;
};
