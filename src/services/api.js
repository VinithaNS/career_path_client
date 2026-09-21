import axios from "axios";

// Use localhost for fast responses during development; switch back when deploying:
export const SERVER_BASE_URL = "http://localhost:5000";
// export const SERVER_BASE_URL = "https://career-path-asor.onrender.com/api";

const api = axios.create({
  baseURL: `${SERVER_BASE_URL}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
