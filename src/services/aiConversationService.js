import api from "./api";

export const createConversation = async (data) => {
  const response = await api.post("/ai-conversations/create", data);
  return response.data;
};

export const sendMessage = async (conversationId, data) => {
  const response = await api.post(
    `/ai-conversations/${conversationId}/message`,
    data
  );
  return response.data;
};

export const getConversationById = async (conversationId, studentId) => {
  const response = await api.get(`/ai-conversations/${conversationId}`, {
    params: { studentId }
  });
  return response.data;
};

export const getStudentConversations = async (studentId) => {
  const response = await api.get(`/ai-conversations/student/${studentId}`);
  return response.data;
};

export const closeConversation = async (conversationId, studentId) => {
  const response = await api.patch(
    `/ai-conversations/${conversationId}/close`,
    {
      studentId
    }
  );
  return response.data;
};

export default api;
