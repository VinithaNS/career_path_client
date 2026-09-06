// services/assessmentService.js
import api from "./api";

export const getActiveAssessments = async () => {
  const response = await api.get("/assessments/active");
  return response.data;
};

export const getAssessmentById = async (id) => {
  const response = await api.get(`/assessments/${id}`);
  return response.data;
};
