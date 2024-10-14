import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api/userApi"; // Import the user API functions

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = 1; // Replace with dynamic ID as needed
        const userDetails = await getUserDetails(1);
        setUser(userDetails);
      } catch (err) {
        console.error("Failed to fetch user details", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}'s Profile</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
