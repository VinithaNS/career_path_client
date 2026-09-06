import api from "./api";

export const getCoursesByCollege = async (collegeId) => {
  const response = await api.get(`/college-courses/college/${collegeId}`);
  return response.data;
};

export const getCollegeCourseById = async (id) => {
  const response = await api.get(`/college-courses/${id}`);
  return response.data;
};
