import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AUTH_API_URL = "http://localhost:5179/api/Auth";

export const loginAsync = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, formData);
    console.log("Successful login:", response.data);
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

    const response = await axios.get(AUTH_API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestWrapper = async (url, method = "GET", data = {}) => {
  // Return null if tokens are not saved in localStorage
  var tokens = JSON.parse(localStorage.getItem("tokens"));
  if (tokens === null) {
    return null;
  }

  // Destructure tokens and decode access token
  var { accessToken, refreshToken } = tokens;
  var claims = jwtDecode(accessToken);
  var userId =
    claims[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  // Refresh tokens when access token is expired
  if (claims.exp < Date.now() / 1000) {
    try {
      var response = await axios.post(`${AUTH_API_URL}/refresh-tokens`, {
        userId,
        refreshToken,
      });

      // Save refreshed tokens into localStorage
      localStorage.setItem("tokens", JSON.stringify(response.data));
      accessToken = response.data.accessToken;
      console.log("Successful refreshed tokens:", response.data);
    } catch (e) {
      throw e;
    }
  }

  switch (method) {
    case "GET":
      return await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    case "POST":
      return await axios.post(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    case "PUT":
      return await axios.put(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    case "DELETE":
      return await axios.delete(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  }
};

export const getUserId = async () => {
  // Return null if tokens are not saved in localStorage
  var tokens = JSON.parse(localStorage.getItem("tokens"));
  if (tokens === null) {
    return null;
  }

  // Destructure tokens and decode access token
  var { accessToken, refreshToken } = tokens;
  var claims = jwtDecode(accessToken);
  var userId =
    claims[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  return userId;
};
