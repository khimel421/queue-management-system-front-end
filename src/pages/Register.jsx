import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import axios from "axios";
import { auth } from "../firebase.config";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("enlister"); // Default role as "enlister"

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
    <div className="signup-container space-y-4 border-2 border-black w-[40%] mx-auto p-4 mt-10">
      <h1 className='text-center text-xl font-bold'>Register</h1>
      <form className='space-y-4' onSubmit={handleSignUp}>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              required className="grow" placeholder="Daisy" />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input value={email}
              onChange={(e) => setEmail(e.target.value)}
              required type="text" className="grow" placeholder="daisy@site.com" />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required />
          </label>
        </div>
        <div>

          <select value={role} onChange={(e) => setRole(e.target.value)} className="select select-bordered w-full max-w-xs">
            <option disabled selected>Select your role</option>
            <option value="enlister">Enlister</option>
            <option value="creator">Creator</option>
          </select>
        </div>
        <button className="btn" type="submit">Sign Up</button>
      </form>
      <p className="text-gray-600">
        Already have an account?
        <Link to={`/signin`} className="text-blue-500 hover:text-blue-700 font-semibold transition duration-200">
          Log In
        </Link>
      </p>

    </div>
  );
};

export default Register;
