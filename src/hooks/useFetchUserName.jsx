import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUserName = (userId) => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`https://queue-management-system-khaki.vercel.app/api/users/${userId}`);
        setUserName(response.data.name);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch user name');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  return { userName, loading, error };
};

export default useFetchUserName;
