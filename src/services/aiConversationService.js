import api from "./api";

export const createConversation = async (data) => {
  const response = await api.post("/ai-conversation/create", data);
  return response.data;
};

export const sendMessage = async (conversationId, data) => {
  const response = await api.post(
    `/ai-conversation/${conversationId}/message`,
    data
  );
  return response.data;
};

export const getConversationById = async (conversationId, studentId) => {
  const response = await api.get(`/ai-conversation/${conversationId}`, {
    params: { studentId }
  });
  return response.data;
};

export const getStudentConversations = async (studentId) => {
  const response = await api.get(`/ai-conversation/student/${studentId}`);
  return response.data;
};

export const closeConversation = async (conversationId, studentId) => {
  const response = await api.patch(`/ai-conversation/${conversationId}/close`, {
    studentId
  });
  return response.data;
};

export default api;
