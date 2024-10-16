import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For extracting URL parameters

const QueueStatus = () => {
  const { userId, queueId } = useParams(); // Get userId and queueId from URL
  const [queueInfo, setQueueInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueueStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/queue-status/${userId}/${queueId}`);
        setQueueInfo(response.data);
      } catch (err) {
        console.error('Error fetching queue status:', err);
        setError('Could not fetch queue status. Please try again.');
      }
    };

    fetchQueueStatus();
  }, [userId, queueId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Queue Status</h2>
      {queueInfo ? (
        <div>
          <p>Your Queue Number: {queueInfo.queue_number}</p>
          <p>Number of People in Queue: {queueInfo.total_people}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QueueStatus;
