import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QueueStatus = () => {
  const { userId, queueId } = useParams(); // Gets the userId and queueId from the URL
  const [queueStatus, setQueueStatus] = useState(null); // State to store queue status
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the queue status when the component mounts
  useEffect(() => {
    fetchQueueStatus();
  }, []);

  // Function to fetch queue status
  const fetchQueueStatus = async () => {
    try {
      const response = await axios.get(`https://queue-management-system-khaki.vercel.app/queue-status/${userId}/${queueId}`);
      setQueueStatus(response.data);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Queue status not found.");
      } else {
        setErrorMessage("An error occurred while fetching queue status.");
      }
    }
  };

  return (
    <div>
      <h2>Queue Status</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {queueStatus ? (
        <div>
          <p><strong>Queue Name:</strong> {queueStatus.queue_name}</p>
          <p><strong>Your Token Number:</strong> {queueStatus.queue_number}</p>
          <p><strong>Status:</strong> {queueStatus.status}</p>
        </div>
      ) : (
        !errorMessage && <p>Loading queue status...</p>
      )}
    </div>
  );
};

export default QueueStatus;
