import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllQueuesByUser = ({ userId }) => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all queues created by the given user ID
  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/queues/${userId}`);
        setQueues(response.data.queues);
      } catch (err) {
        setError('Failed to fetch queues. Please try again later.');
      }
      setLoading(false);
    };
    fetchQueues();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='amoled p-4 rounded-lg'>
      <h2 className="text-2xl font-semibold mb-4">All Queues Created By You</h2>
      {queues.length === 0 ? (
        <p>No queues created yet.</p>
      ) : (
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Queue Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Max Capacity</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((queue) => (
              <tr key={queue.id}>
                <td className="border px-4 py-2">{queue.queue_name}</td>
                <td className="border px-4 py-2">{queue.queue_description}</td>
                <td className="border px-4 py-2">{queue.max_capacity}</td>
                <td className="border px-4 py-2">{new Date(queue.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllQueuesByUser;
