// services/assessmentQuestionService.js
import api from "./api";

export const getQuestionsByAssessment = async (assessmentId) => {
  const response = await api.get(
    `/assessment-questions/assessment/${assessmentId}`
  );
  return response.data;
};
