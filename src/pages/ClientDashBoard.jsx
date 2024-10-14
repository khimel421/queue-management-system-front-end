import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import CreateQueue from "../components/CreateQueue";
import { useAuth } from "../context/AuthProvider";
import ViewAllCustomers from "../components/ViewAllCustomer";
import AllQueuesByUser from "../components/AllQueuesByUser";

const ClientDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  console.log(currentUser);

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Welcome to the Dashboard!</h1>
      <CreateQueue />
      <ViewAllCustomers queueId={1}/>
      <AllQueuesByUser userId={currentUser.uid}/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ClientDashboard;
