import api from "./api";

// Create AI recommendation
export const createRecommendation = async (data) => {
  const response = await api.post("/ai-recommendation/create", data);

  return response.data;
};

// Get recommendation by ID
export const getRecommendationById = async (recommendationId) => {
  const response = await api.get(`/ai-recommendation/${recommendationId}`);

  return response.data;
};

// Get all recommendations of student
export const getStudentRecommendations = async (studentId) => {
  const response = await api.get(`/ai-recommendation/student/${studentId}`);

  return response.data;
};

// Get latest recommendation
export const getLatestRecommendation = async (studentId) => {
  const response = await api.get(
    `/ai-recommendation/student/${studentId}/latest`
  );

  return response.data;
};

// Delete recommendation
export const deleteRecommendation = async (recommendationId) => {
  const response = await api.delete(
    `/ai-recommendation/delete/${recommendationId}`
  );

  return response.data;
};
