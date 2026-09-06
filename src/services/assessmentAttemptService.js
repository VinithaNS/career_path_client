// services/assessmentAttemptService.js
import api from "./api";

export const startAssessment = async (studentId, assessmentId) => {
  const response = await api.post("/assessment-attempts/start", {
    studentId,
    assessmentId
  });
  return response.data;
};

export const getAttemptById = async (id) => {
  const response = await api.get(`/assessment-attempts/${id}`);
  return response.data;
};

export const submitAnswer = async (attemptId, questionId, selectedAnswer) => {
  const response = await api.post(`/assessment-attempts/answer/${attemptId}`, {
    questionId,
    selectedAnswer
  });
  return response.data;
};

export const completeAttempt = async (attemptId) => {
  const response = await api.post(`/assessment-attempts/complete/${attemptId}`);
  return response.data;
};

export const abandonAttempt = async (attemptId) => {
  const response = await api.post(`/assessment-attempts/abandon/${attemptId}`);
  return response.data;
};
