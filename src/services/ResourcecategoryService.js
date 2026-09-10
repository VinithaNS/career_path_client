import api from "./api";

// Get all resource categories
export const getAllResourceCategories = async () => {
  const response = await api.get("/resource-categories/all");
  return response.data;
};

// Get active resource categories
export const getActiveResourceCategories = async () => {
  const response = await api.get("/resource-categories/active");
  return response.data;
};

// Get resource category by ID
export const getResourceCategoryById = async (categoryId) => {
  const response = await api.get(`/resource-categories/${categoryId}`);
  return response.data;
};

// Create resource category
export const createResourceCategory = async (data) => {
  const response = await api.post("/resource-categories/create", data);
  return response.data;
};

// Update resource category
export const updateResourceCategory = async (categoryId, data) => {
  const response = await api.put(
    `/resource-categories/update/${categoryId}`,
    data
  );
  return response.data;
};

// Delete resource category
export const deleteResourceCategory = async (categoryId) => {
  const response = await api.delete(
    `/resource-categories/delete/${categoryId}`
  );
  return response.data;
};
