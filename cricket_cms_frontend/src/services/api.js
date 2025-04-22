import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Function to login a user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};
// Function to fetch articles
export const fetchArticles = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching articles:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch articles. Please try again."
    );
  }
};
// Function to fetch players
export const fetchPlayers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching players:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch players. Please try again."
    );
  }
};
// Function to fetch live scores
export const fetchLiveScores = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/live-scores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching live scores:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch live scores. Please try again."
    );
  }
};
