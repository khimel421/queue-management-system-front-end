import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-blue-600 text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Manage Your Queue Effortlessly</h2>
        <p className="mb-6">Our smart queue management system simplifies the appointment process for you.</p>
        <Link to={`/signup`} className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200">Get Started</Link>
      </div>
    </div>
  );
};

export default HeroSection;
