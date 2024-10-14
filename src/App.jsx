import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import JoinQueue from './components/JoinQueue';
// import QueueStatus from './components/QueueStatus';
// import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/LogIn';
import ClientDashboard from './pages/ClientDashBoard';

const App = () => {

  
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/clientdashboard" element={<ClientDashboard/>} />

          {/* User Routes */}
          {/* <Route path="/join-queue" element={<JoinQueue />} />
          <Route path="/queue-status/:userId/:queueId" element={<QueueStatus />} /> */}

          {/* Admin Routes */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

          {/* User Profile */}
          <Route path="/profile" element={<UserProfile />} />

          {/* Catch-all Route for Undefined Paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

