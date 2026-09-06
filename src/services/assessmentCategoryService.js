// services/assessmentCategoryService.js
import api from "./api";

export const getActiveAssessmentCategories = async () => {
  const response = await api.get("/assessment-categories/active");
  return response.data;
};
