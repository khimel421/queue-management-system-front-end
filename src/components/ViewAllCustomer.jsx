import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllCustomers = ({ queueId, creatorId }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all customers in the queue when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/view-queue/${queueId}`);
        setCustomers(response.data.customers);
      } catch (err) {
        setError('Failed to fetch customers. Please try again later.');
      }
      setLoading(false);
    };
    fetchCustomers();
  }, [queueId]);

  // Update the status of a user in the queue
  const updateStatus = async (userId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/update-queue-status`, {
        userId,
        queueId,
        status: newStatus,
      });
      // Update the local state to reflect the changes
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.user_id === userId ? { ...customer, status: newStatus } : customer
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      setError('Unable to update status at the moment. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Queue Management</h2>
      {customers.length === 0 ? (
        <p>No customers are currently in the queue.</p>
      ) : (
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Queue Number</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.user_id}>
                <td className="border px-4 py-2">{customer.queue_number}</td>
                <td className="border px-4 py-2">{customer.user_id}</td>
                <td className="border px-4 py-2">{customer.name}</td>
                <td className="border px-4 py-2">
                  {customer.status === 'waiting' ? (
                    <span className="text-yellow-600">Waiting</span>
                  ) : (
                    <span className="text-green-600">Served</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {customer.status === 'waiting' ? (
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded"
                      onClick={() => updateStatus(customer.user_id, 'served')}
                    >
                      Mark as Served
                    </button>
                  ) : (
                    <span className="text-gray-500">Already Served</span>
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

export default ViewAllCustomers;
