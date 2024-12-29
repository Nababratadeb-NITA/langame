import React from 'react';
import { FaWallet } from 'react-icons/fa'; // Wallet Icon from react-icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom

const Wallet = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle navigation to deposit page
  const handleDeposit = () => {
    navigate('/deposit'); // Replace '/deposit' with the actual route for the deposit page
  };

  return (
    <div className="bg-[#2B3270] text-white p-6 mt-6 rounded-xl">
      <div className="max-w-md mx-auto bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Wallet Icon and Balance Info */}
        <div className="flex items-center space-x-4">
          <FaWallet className="text-4xl text-white" />
          <div className="text-white">
            <p className="text-lg md:text-xl">Wallet Balance</p>
            <p className="text-xl md:text-2xl font-bold">₹5000</p> {/* Replace with actual balance */}
          </div>
        </div>
        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full md:w-auto">
            Withdraw
          </button>
          <button
            onClick={handleDeposit} // Add onClick to navigate to the deposit page
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full md:w-auto"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
