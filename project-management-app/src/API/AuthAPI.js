import axios from "axios";

const API_URL = "http://localhost:5179/api/Auth";

export const loginAsync = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging user in", error);
    throw error;
  }
};

export const authenticatedOnlyAsync = async () => {
  try {
    var tokens = JSON.parse(localStorage.getItem("tokens"));
    var accessToken = tokens.accessToken;

    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
