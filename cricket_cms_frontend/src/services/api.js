import axios from "axios";

const API_BASE_URL = "https://cricket-cms-production.up.railway.app";

// Function to login a user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Returns access token and user details
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Returns success message or user details
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong during registration. Please try again."
    );
  }
};

// Function to fetch all articles
export const fetchArticles = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Returns a list of articles
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

// Function to create a new article
export const createArticle = async (token, article) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/articles`, article, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Returns the created article
  } catch (error) {
    console.error(
      "Error creating article:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to create article. Please try again."
    );
  }
};

// Function to update an existing article
export const updateArticle = async (token, articleId, updatedArticle) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/articles/${articleId}`,
      updatedArticle,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Returns the updated article
  } catch (error) {
    console.error(
      "Error updating article:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to update article. Please try again."
    );
  }
};

// Function to delete an article
export const deleteArticle = async (token, articleId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/articles/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns success message
  } catch (error) {
    console.error(
      "Error deleting article:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete article. Please try again."
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
    return response.data; // Returns a list of players
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
    return response.data; // Returns live scores
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

// Function to like an article
export const likeArticle = async (token, articleId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/articles/${articleId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns success message or updated article
  } catch (error) {
    console.error(
      "Error liking article:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to like the article. Please try again."
    );
  }
};
