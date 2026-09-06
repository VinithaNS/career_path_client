// services/examSyllabusService.js
import api from "./api";

export const getSyllabusByExam = async (examId) => {
  const response = await api.get(`/exam-syllabus/exam/${examId}`);
  return response.data;
};
