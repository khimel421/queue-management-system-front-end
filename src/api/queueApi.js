// src/api/queueApi.js
import { getRequest, postRequest, putRequest } from "./index";

// Join a queue
export const joinQueue = async (userId, queueId) => {
  return await postRequest(`/join-queue`, { userId, queueId });
};

// Get queue status for a specific user in a queue
export const getQueueStatus = async (userId, queueId) => {
  return await getRequest(`/queue-status/${userId}/${queueId}`);
};

// Update queue status by admin
export const updateQueueStatus = async (queueId, userId, status) => {
  return await putRequest(`/update-queue-status`, { queueId, userId, status });
};
