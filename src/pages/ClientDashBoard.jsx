import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import CreateQueue from "../components/CreateQueue";
import { useAuth } from "../context/AuthProvider";
import ViewAllCustomers from "../components/ViewAllCustomer";
import AllQueuesByUser from "../components/AllQueuesByUser";
import useUserRole from "../hooks/useUserRole";
import SearchQueue from "../components/SearchQueue";
import QueueList from "../components/QueueList";

const ClientDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { userRole, loading, error } = useUserRole();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  console.log(currentUser);

  console.log(userRole)

  if(userRole === "enlister") return (
    <div>
      <SearchQueue/>
      <QueueList/>
    </div>
  )

  if(userRole === "creator") return (
    <div className="flex flex-col gap-10">
      <h1>Welcome to the Dashboard!</h1>
      <CreateQueue />
      {/* <ViewAllCustomers queueId={1}/> */}
      <AllQueuesByUser userId={currentUser.uid}/>
      <div>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
     
    </div>
  );
};

export default ClientDashboard;
