// services/assessmentResultService.js
import api from "./api";

export const createAssessmentResult = async (attemptId) => {
  const response = await api.post("/assessment-results/create", { attemptId });
  return response.data;
};

export const getAssessmentResultById = async (id) => {
  const response = await api.get(`/assessment-results/${id}`);
  return response.data;
};

export const getStudentResults = async (studentId) => {
  const response = await api.get(`/assessment-results/student/${studentId}`);
  return response.data;
};
