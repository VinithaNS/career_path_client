import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/eleventh-groups";

// =====================================================
// GET ACTIVE ELEVENTH GROUPS (for homepage/public display)
// =====================================================

export const getActiveEleventhGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/active`);
    return response.data;
  } catch (error) {
    console.error("Get Active Eleventh Groups Error:", error);
    throw error;
  }
};

// =====================================================
// GET ALL ELEVENTH GROUPS (admin)
// =====================================================

export const getAllEleventhGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Get All Eleventh Groups Error:", error);
    throw error;
  }
};

// =====================================================
// GET GROUP BY ID
// =====================================================

export const getEleventhGroupById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Eleventh Group By Id Error:", error);
    throw error;
  }
};

// =====================================================
// GET GROUPS BY CATEGORY
// =====================================================

export const getGroupsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Get Groups By Category Error:", error);
    throw error;
  }
};

// =====================================================
// CREATE ELEVENTH GROUP (admin)
// =====================================================

export const createEleventhGroup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, data);
    return response.data;
  } catch (error) {
    console.error("Create Eleventh Group Error:", error);
    throw error;
  }
};

// =====================================================
// UPDATE ELEVENTH GROUP (admin)
// =====================================================

export const updateEleventhGroup = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update Eleventh Group Error:", error);
    throw error;
  }
};

// =====================================================
// DELETE ELEVENTH GROUP (admin)
// =====================================================

export const deleteEleventhGroup = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Eleventh Group Error:", error);
    throw error;
  }
};
