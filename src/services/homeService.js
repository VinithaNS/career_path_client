import api from "./api";

export const getHomeData = async () => {
  try {
    const response = await api.get("/home-page/all");

    return response.data;
  } catch (error) {
    console.error("Home API Error:", error);
    throw error;
  }
};
