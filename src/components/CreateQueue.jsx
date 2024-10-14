import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserRole from '../hooks/useUserRole'; // Custom hook to check user role
import { useAuth } from '../context/AuthProvider'; // Import your authentication provider

const CreateQueue = () => {
  const [queueName, setQueueName] = useState('');
  const [queueDescription, setQueueDescription] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [message, setMessage] = useState('');
  const { userRole, loading, error } = useUserRole(); // Use the custom hook to get the user's role
  const { currentUser } = useAuth();
  console.log(currentUser.uid);
  // Get the current logged-in user from Firebase
  const navigate = useNavigate();

  // Handle form submission to create a queue
  const handleCreateQueue = async (e) => {
    e.preventDefault();

    // Check if the user's role is not "poster"
    if (userRole !== 'creator') {
      setMessage("Only users with the 'poster' role can create queues.");
      return;
    }

    try {
      // Prepare the data for the POST request
      const data = {
        creatorId: currentUser.uid, // Use the Firebase user ID as the creator ID
        queueName: queueName,
        queueDescription: queueDescription,
        maxCapacity: parseInt(maxCapacity, 10), // Convert maxCapacity to a number
      };

      // Send POST request to the backend API
      const response = await axios.post('http://localhost:5000/create-queue', data);

      if (response.status === 200) {
        setMessage('Queue created successfully!');
        navigate('/clientdashboard'); // Redirect to dashboard or another page after creating the queue
      }
    } catch (err) {
      console.error('Error creating queue:', err);
      setMessage('Failed to create queue. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching the role
  }

  if (error) {
    return <p>{error}</p>; // Show any error that occurred during the role fetch
  }

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Create a New Queue</h2>
      {/* Only allow form submission if the user has the "poster" role */}
      {userRole === 'creator' ? (
        <form onSubmit={handleCreateQueue}>
          <div>
            <label>Queue Name:</label>
            <input
              type="text"
              value={queueName}
              onChange={(e) => setQueueName(e.target.value)}
              placeholder="Enter queue name"
              required
            />
          </div>
          <div>
            <label>Queue Description:</label>
            <textarea
              value={queueDescription}
              onChange={(e) => setQueueDescription(e.target.value)}
              placeholder="Enter queue description"
              required
            />
          </div>
          <div>
            <label>Max Capacity:</label>
            <input
              type="number"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              placeholder="Enter maximum capacity"
              required
              min="1"
            />
          </div>
          <button type="submit">Create Queue</button>
        </form>
      ) : (
        <p>Only users with the "poster" role can create queues.</p>
      )}
      {/* Display the response message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateQueue;
