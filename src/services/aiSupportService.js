import api from "./api";

// Create support ticket
export const createSupport = async (data) => {
  const response = await api.post("/ai-support/create", data);

  return response.data;
};

// Get support ticket by ID
export const getSupportById = async (supportId) => {
  const response = await api.get(`/ai-support/${supportId}`);

  return response.data;
};

// Get all support tickets of student
export const getStudentSupports = async (studentId) => {
  const response = await api.get(`/ai-support/student/${studentId}`);

  return response.data;
};

// Update support status
export const updateSupportStatus = async (supportId, status) => {
  const response = await api.patch(`/ai-support/${supportId}/status`, {
    status
  });

  return response.data;
};

// Delete support ticket
export const deleteSupport = async (supportId) => {
  const response = await api.delete(`/ai-support/delete/${supportId}`);

  return response.data;
};
