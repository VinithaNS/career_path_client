// services/examEligibilityService.js
import api from "./api";

export const getEligibilityByExam = async (examId) => {
  const response = await api.get(`/exam-eligibilities/exam/${examId}`);
  return response.data;
};
