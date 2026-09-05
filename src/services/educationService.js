import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
// If you're on Create React App instead of Vite, use:
// process.env.REACT_APP_API_BASE_URL

const api = axios.create({ baseURL: API_BASE_URL });

export const getActiveCourses = async () => {
  const { data } = await api.get("/degree-courses/active");
  return data;
};

export const searchCourses = async (search) => {
  const { data } = await api.get("/degree-courses/search", {
    params: { search }
  });
  return data;
};

export const getCourseById = async (id) => {
  const { data } = await api.get(`/degree-courses/${id}`);
  return data;
};

export const getCoursesByCategory = async (categoryId) => {
  const { data } = await api.get(`/degree-courses/category/${categoryId}`);
  return data;
};
