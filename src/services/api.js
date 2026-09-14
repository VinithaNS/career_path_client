import axios from "axios";

// export const SERVER_BASE_URL = "http://localhost:5000";
export const SERVER_BASE_URL = "https://career-path-server-bn1a.onrender.com";

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
