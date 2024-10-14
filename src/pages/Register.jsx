import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import axios from "axios";
import { auth } from "../firebase.config";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("creator"); // Default role as "enlister"
  
    // Handle sign-up
    const handleSignUp = async (e) => {
      e.preventDefault();
  
      try {
        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        // Firebase returns a user object
        const firebaseUser = userCredential.user;
        console.log("Firebase User Created: ", firebaseUser);
  
        // Prepare the user data for the backend
        const newUser = {
          uid: firebaseUser.uid,
          name: name,
          email: firebaseUser.email,
          role: role,
        };
  
        // Send the user data to your backend
        await axios.post("http://localhost:5000/users/signup", newUser);
        console.log(newUser);
  
        alert("User signed up and data saved in the database!");
      } catch (error) {
        console.error("Error signing up with Firebase:", error.message);
        alert(error.message);
      }
    };
  
    return (
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="enlister">Enlister</option>
              <option value="creator">Creator</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };

export default Register;
