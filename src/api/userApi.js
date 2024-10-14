// src/api/userApi.js
import { getRequest, postRequest } from "./index";

// Fetch user details by ID
export const getUserDetails = async (userId) => {
  return await getRequest(`/users/${userId}`);
};

// Register a new user
export const registerUser = async (userData) => {
  return await postRequest(`/users/register`, userData);
};

// Login user
export const loginUser = async (loginData) => {
  return await postRequest(`/users/login`, loginData);
};


