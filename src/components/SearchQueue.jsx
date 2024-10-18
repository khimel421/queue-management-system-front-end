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
      const response = await axios.get(`https://queue-management-system-khaki.vercel.app/api/queues/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleJoinQueue = async (queueId) => {
    const userId = currentUser.uid;

    try {
      const response = await axios.post('http://localhost:5000/join-queue', {
        userId,
        queueId,
      });
      alert(response.data.message);
      navigate(`/queue-status/${userId}/${queueId}`);
    } catch (error) {
      console.error('Error joining queue:', error.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Search for Queues</h2>
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-8">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter queue name or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Search Results</h3>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((queue) => (
              <li key={queue.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-lg">{queue.queue_name}</strong>
                    <p className="text-sm text-gray-600">{queue.queue_description}</p>
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => handleJoinQueue(queue.id)}
                  >
                    Join Queue
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No queues found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchQueue;
