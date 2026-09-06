import api from "./api";

export const getReviewsByCollege = async (collegeId) => {
  const response = await api.get(`/college-reviews/college/${collegeId}`);
  return response.data;
};

export const createCollegeReview = async (data) => {
  const response = await api.post("/college-reviews/create", data);
  return response.data;
};
