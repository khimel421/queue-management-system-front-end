import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QueueManagement = () => {
  const [queueData, setQueueData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { queueId } = useParams();

  useEffect(() => {
    fetchQueueData();
  }, []);

  const fetchQueueData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/all-queue-users/${queueId}`
      );
      setQueueData(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to fetch queue data.");
    }
  };

  const handleServeUser = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/serve-user/${userId}/${queueId}`);
      fetchQueueData(); // Refresh queue data after serving a user
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to mark user as served.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Queue Management</h2>

      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}

      {queueData.length === 0 ? (
        <p className="text-gray-500">No users in queue.</p>
      ) : (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token Number
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queueData.map((user) => (
              <tr key={user.user_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.queue_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {user.status === "waiting" && (
                    <button
                      onClick={() => handleServeUser(user.user_id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Mark as Served
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QueueManagement;
