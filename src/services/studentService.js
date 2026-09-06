import api from "./api";

export const createStudentProfile = async (data) => {
  const response = await api.post("/students/create", data);
  return response.data;
};

export const getMyStudentProfile = async () => {
  const response = await api.get("/students/me");
  return response.data;
};

export const updateStudentProfile = async (id, data) => {
  const response = await api.put(`/students/update/${id}`, data);
  return response.data;
};
