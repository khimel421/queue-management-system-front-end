import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllQueuesByUser = ({ userId }) => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  
  const handleDeleteQueue = async (queueId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-queue/${queueId}`);
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting queue:", error);
      alert(error.response.data.message);
    }
  };


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
              <th className="px-4 py-2">Show Customer queue</th>
              <th className="px-4 py-2">Delete queue</th>

            </tr>
          </thead>
          <tbody>
            {queues.map((queue) => (
              <tr key={queue.id}>
                <td className="border px-4 py-2">{queue.queue_name}</td>
                <td className="border px-4 py-2">{queue.queue_description}</td>
                <td className="border px-4 py-2">{queue.max_capacity}</td>
                <td className="border px-4 py-2">{new Date(queue.created_at).toLocaleString()}</td>
                <td className="border px-4 py-2"> <Link to={`/queue-management/${queue.id}`}> <button className='btn'>Details</button></Link> </td>
                <td className="border px-4 py-2"> <button onClick={() => handleDeleteQueue(queue.id)} className='btn bg-red-500 text-white' >Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllQueuesByUser;
