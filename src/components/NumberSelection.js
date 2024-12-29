import React, { useState } from "react";

const NumberSelection = ({results, timeLeft}) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState("X1");
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="bg-[#2B3270] text-white p-6 rounded-xl max-w-md mx-auto">
      {/* Top Category Buttons */}
      <div className="flex justify-center space-x-2 mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 w-1/3">
          Green
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 w-1/3">
          Violet
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 w-1/3">
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
              num === selectedNumber ? "ring-4 ring-gray-400" : ""
            } ${
              index % 3 === 0
                ? "bg-purple-500"
                : index % 2 === 0
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Big/Small Buttons */}
      <div className="flex flex-wrap justify-center space-x-0 sm:space-x-4">
        <button
          onClick={() => setSelectedSize("Big")}
          className={`flex-1 bg-orange-500 text-white px-4 py-2 rounded-l-lg ${
            selectedSize === "Big" ? "ring-1 ring-gray-400" : ""
          } w-full sm:w-auto`}
        >
          Big
        </button>
        <button
          onClick={() => setSelectedSize("Small")}
          className={`flex-1 bg-blue-500 text-white px-4 py-2 rounded-r-lg ${
            selectedSize === "Small" ? "ring-1 ring-gray-400" : ""
          } w-full sm:w-auto`}
        >
          Small
        </button>
      </div>
    </div>
  );
};

export default NumberSelection;
