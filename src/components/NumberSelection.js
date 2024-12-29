import React, { useState } from 'react';

const NumberSelection = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState('X1');
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div className="bg-[#2B3270] text-white p-6 rounded-xl max-w-md mx-auto">
      {/* Top Category Buttons */}
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 w-full sm:w-auto">
          Green
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 w-full sm:w-auto">
          Violet
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 w-full sm:w-auto">
          Red
        </button>
      </div>

      {/* Numbered Balls */}
      <div className="grid grid-cols-5 sm:grid-cols-5 gap-4 mb-6">
        {[...Array(10).keys()].map((num, index) => (
          <div
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-base sm:text-lg font-bold cursor-pointer ${
              num === selectedNumber ? 'ring-4 ring-yellow-400' : ''
            } ${
              index % 3 === 0
                ? 'bg-purple-500'
                : index % 2 === 0
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Multiplier Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedMultiplier('Random')}
          className={`px-3 py-1 rounded-lg text-sm ${
            selectedMultiplier === 'Random'
              ? 'bg-red-500 text-white'
              : 'bg-transparent text-red-500 border border-red-500'
          }`}
        >
          Random
        </button>
        {['X1', 'X5', 'X10', 'X20', 'X50', 'X100'].map((multiplier) => (
          <button
            key={multiplier}
            onClick={() => setSelectedMultiplier(multiplier)}
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedMultiplier === multiplier
                ? 'bg-blue-500 text-white'
                : 'bg-transparent text-white border border-white'
            }`}
          >
            {multiplier}
          </button>
        ))}
      </div>

      {/* Big/Small Buttons */}
      <div className="flex flex-wrap justify-center space-x-0 sm:space-x-4">
        <button
          onClick={() => setSelectedSize('Big')}
          className={`flex-1 bg-orange-500 text-white px-4 py-2 rounded-l-lg ${
            selectedSize === 'Big' ? 'ring-4 ring-yellow-400' : ''
          } w-full sm:w-auto`}
        >
          Big
        </button>
        <button
          onClick={() => setSelectedSize('Small')}
          className={`flex-1 bg-blue-500 text-white px-4 py-2 rounded-r-lg ${
            selectedSize === 'Small' ? 'ring-4 ring-yellow-400' : ''
          } w-full sm:w-auto`}
        >
          Small
        </button>
      </div>
    </div>
  );
};

export default NumberSelection;
