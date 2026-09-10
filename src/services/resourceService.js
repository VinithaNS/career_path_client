import api from "./api";

// Get all resources
export const getAllResources = async () => {
  const response = await api.get("/resources/all");
  return response.data;
};

// Get active resources
export const getActiveResources = async () => {
  const response = await api.get("/resources/active");
  return response.data;
};

// Get featured resources
export const getFeaturedResources = async () => {
  const response = await api.get("/resources/featured");
  return response.data;
};

// Get resources by category
export const getResourcesByCategory = async (categoryId) => {
  const response = await api.get(`/resources/category/${categoryId}`);
  return response.data;
};

// Get resource by ID
export const getResourceById = async (resourceId) => {
  const response = await api.get(`/resources/${resourceId}`);
  return response.data;
};

// Create resource
export const createResource = async (data) => {
  const response = await api.post("/resources/create", data);
  return response.data;
};

// Update resource
export const updateResource = async (resourceId, data) => {
  const response = await api.put(`/resources/update/${resourceId}`, data);
  return response.data;
};

// Delete resource
export const deleteResource = async (resourceId) => {
  const response = await api.delete(`/resources/delete/${resourceId}`);
  return response.data;
};
