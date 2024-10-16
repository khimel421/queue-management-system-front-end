import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';



const SearchQueue = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/queues/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleJoinQueue = async (queueId) => {
    const userId = currentUser.uid; // Replace with actual user ID, possibly from user context or state

    try {
      const response = await axios.post('http://localhost:5000/join-queue', {
        userId,
        queueId,
      });
      alert(response.data.message); // Display success message
      navigate(`/queue-status/${userId}/${queueId}`);

    } catch (error) {
      console.error('Error joining queue:', error.message);
      alert( error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Search for Queues</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter queue name or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h3>Search Results</h3>
        {results.length > 0 ? (
          <ul>
            {results.map((queue) => (
              <li key={queue.id}>
                <strong>{queue.queue_name}</strong>: {queue.queue_description}
                <button onClick={() => handleJoinQueue(queue.id)}>Join Queue</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No queues found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchQueue;
