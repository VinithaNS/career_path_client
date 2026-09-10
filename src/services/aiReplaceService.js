import api from "./api";

// Get all AI replacement records
export const getAllAIReplacements = async () => {
  const response = await api.get("/ai-replace/all");

  return response.data;
};

// Get AI replacement by ID
export const getAIReplaceById = async (replacementId) => {
  const response = await api.get(`/ai-replace/${replacementId}`);

  return response.data;
};

// Get AI replacement by sector
export const getBySector = async (sector) => {
  const response = await api.get(
    `/ai-replace/sector/${encodeURIComponent(sector)}`
  );

  return response.data;
};

// Get AI replacement by domain
export const getByDomain = async (domain) => {
  const response = await api.get(
    `/ai-replace/domain/${encodeURIComponent(domain)}`
  );

  return response.data;
};

// Get high automation jobs
export const getHighAutomationJobs = async () => {
  const response = await api.get("/ai-replace/high-automation");

  return response.data;
};

// Create AI replacement record
export const createAIReplace = async (data) => {
  const response = await api.post("/ai-replace/create", data);

  return response.data;
};

// Update AI replacement record
export const updateAIReplace = async (replacementId, data) => {
  const response = await api.put(`/ai-replace/update/${replacementId}`, data);

  return response.data;
};

// Delete AI replacement record
export const deleteAIReplace = async (replacementId) => {
  const response = await api.delete(`/ai-replace/delete/${replacementId}`);

  return response.data;
};
