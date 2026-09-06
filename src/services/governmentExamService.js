// services/governmentExamService.js
import api from "./api";

export const getActiveGovernmentExams = async () => {
  const response = await api.get("/government-exams/active");
  return response.data;
};

export const searchGovernmentExams = async (search) => {
  const response = await api.get("/government-exams/search", {
    params: { search }
  });
  return response.data;
};

export const getGovernmentExamById = async (id) => {
  const response = await api.get(`/government-exams/${id}`);
  return response.data;
};
