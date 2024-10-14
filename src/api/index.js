// src/api/index.js
import axios from "axios";

// Base URL configuration for the backend API
const API_URL = "http://localhost:5000"; // Update to your server's URL

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to make GET requests
export const getRequest = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// Helper function to make POST requests
export const postRequest = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

// Helper function to make PUT requests
export const putRequest = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

// Helper function to make DELETE requests
export const deleteRequest = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};

// Export the axios instance and helper functions
export { apiClient };
