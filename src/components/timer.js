import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa'; // Import the clock icon from react-icons

const Timer = () => {
  const [selected, setSelected] = useState(''); // State to track the selected option

  // Function to handle button selection
  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="bg-[#2B3270] text-white p-6 mt-6 rounded-xl">
      <div className="max-w-md mx-auto bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-6 shadow-xl">
        <div className="flex justify-around">
          {/* 30 Seconds Button */}
          <button
            onClick={() => handleSelect('30s')}
            className={`flex flex-col items-center px-6 py-3 rounded-lg text-white ${
              selected === '30s' ? 'bg-blue-600' : 'bg-transparent'
            } hover:bg-blue-600 transition duration-300`}
          >
            <FaClock className="text-2xl mb-2" /> {/* Clock Icon */}
            <span className="text-sm">Win Go</span>
            <span className="text-lg font-bold">30s</span>
          </button>

          {/* 1 Minute Button */}
          <button
            onClick={() => handleSelect('1m')}
            className={`flex flex-col items-center px-6 py-3 rounded-lg text-white ${
              selected === '1m' ? 'bg-blue-600' : 'bg-transparent'
            } hover:bg-blue-600 transition duration-300`}
          >
            <FaClock className="text-2xl mb-2" /> {/* Clock Icon */}
            <span className="text-sm">Win Go</span>
            <span className="text-lg font-bold">1Min</span>
          </button>

          {/* 3 Minutes Button */}
          <button
            onClick={() => handleSelect('3m')}
            className={`flex flex-col items-center px-6 py-3 rounded-lg text-white ${
              selected === '3m' ? 'bg-blue-600' : 'bg-transparent'
            } hover:bg-blue-600 transition duration-300`}
          >
            <FaClock className="text-2xl mb-2" /> {/* Clock Icon */}
            <span className="text-sm">Win Go</span>
            <span className="text-lg font-bold">3Min</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
