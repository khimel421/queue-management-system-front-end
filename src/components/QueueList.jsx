import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const QueueList = () => {
  const [queues, setQueues] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQueues();
  }, []);

  const fetchQueues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/queues'); // API endpoint to get all queues
      setQueues(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch queues.');
    }
  };

  const handleJoinQueue = async (queueId) => {
    const userId = currentUser.uid;

    try {
      const response = await axios.post('https://queue-management-system-khaki.vercel.app/join-queue', {
        userId,
        queueId,
      });
      alert(response.data.message);
      navigate(`/queue-status/${userId}/${queueId}`);
    } catch (error) {
      setErrorMessage(error.response.data.message || 'Failed to join queue.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Queues</h2>

      {errorMessage && (
        <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
      )}

      {queues.length > 0 ? (
        <ul className="space-y-6">
          {queues.map((queue) => (
            <li
              key={queue.id}
              className="bg-gray-100 p-6 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{queue.queue_name}</h3>
                <p className="text-sm text-gray-600">{queue.queue_description}</p>
                <p className="text-sm text-gray-500">
                  Max Capacity: {queue.max_capacity}
                </p>
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => handleJoinQueue(queue.id)}
              >
                Join Queue
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No queues available at the moment.</p>
      )}
    </div>
  );
};

export default QueueList;
