// import React from 'react';
// import Navbar from '../components/Navbar';
// import Banner from '../components/Banner';

// const Home = () => {
//     return (
//         <div>
//             <h1>
//                 {/* <Navbar/> */}
//                 <Banner/>
//             </h1>
//         </div>
//     );
// }

// export default Home;

import React from 'react';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">


      {/* Hero Section */}
      <HeroSection/>

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="flex justify-around">
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-xs">
              <h3 className="text-xl font-semibold">Easy Appointment Scheduling</h3>
              <p>Book appointments quickly and easily with our intuitive interface.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-xs">
              <h3 className="text-xl font-semibold">Real-Time Updates</h3>
              <p>Receive real-time notifications about your queue status.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-xs">
              <h3 className="text-xl font-semibold">QR Code Generation</h3>
              <p>Get a unique QR code for your appointment for easy check-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center">
        <p className="text-gray-600">© 2024 Queue Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
