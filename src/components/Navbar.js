import React from 'react';
import { FaHeadset } from 'react-icons/fa'; // Importing the customer service icon

const Navbar = () => {
  return (
    <nav className="bg-[#2B3270] text-white p-4 flex items-center justify-between relative">
      {/* Logo Section */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl">TIRANGAA</h1>
      </div>
      {/* Customer Service Icon and Text */}
      <div className="flex items-center space-x-2 text-sm sm:text-base md:text-lg absolute right-2 sm:right-4">
        <FaHeadset className="text-lg sm:text-xl" />
        <span className="hidden sm:block">Customer Service</span>
      </div>
    </nav>
  );
};

export default Navbar;
