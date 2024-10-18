import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // Import your authentication provider

const useUserRole = () => {
  const [userRole, setUserRole] = useState(null); // Holds the user role ('poster', 'enlister', etc.)
  const [loading, setLoading] = useState(true); // Loading state for role fetching
  const [error, setError] = useState(null); // Holds any errors that occur
  const { currentUser } = useAuth(); // Get the current logged-in user from Firebase

  useEffect(() => {
    const fetchUserRole = async () => {
      // If there is no current user, set role to `null`
      if (!currentUser) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://queue-management-system-khaki.vercel.app/user-role/${currentUser.uid}`);
        setUserRole(response.data.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setError('Failed to fetch user role.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [currentUser]); // Run the effect whenever `currentUser` changes

  return { userRole, loading, error };
};

export default useUserRole;
