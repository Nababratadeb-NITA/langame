import React, { useState, useEffect, useCallback } from "react";

const NumberSelection = ({ results, timeLeft }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [amount, setAmount] = useState(""); // Track the amount input
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(timeLeft); // Countdown state
  const [resultMessage, setResultMessage] = useState(""); // Store result message

  // Memoize the checkResults function to prevent unnecessary re-renders
  const checkResults = useCallback((selections) => {
    let resultMessage = "";   

    // Compare selections with results
    if (
      selections.color === results[0].color &&
      selections.number === results[0].number &&
      selections.size === results[0].size
    ) {
      resultMessage = "You selected the correct options! 🎉";
    } else {
      resultMessage = "Incorrect selection. Try again! 😞";
    }

    setResultMessage(resultMessage);
    // Reset the selections after time ends
    localStorage.removeItem("userSelections"); // Clear the selections from localStorage
  }, [results]); // Add results to the dependency array

  useEffect(() => {
    if (timeLeft !== countdown) {
      setCountdown(timeLeft); // Update countdown with new timeLeft prop
    }

    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1); // Decrease countdown by 1
      } else {
        // Check results when the countdown reaches 0
        const userSelections = JSON.parse(localStorage.getItem("userSelections"));
        if (userSelections) {
          checkResults(userSelections);
        }
      }
    }, 1000);

    // Clear interval when countdown reaches 0 or component is unmounted
    return () => clearInterval(interval);
  }, [timeLeft, countdown, checkResults]); // Add checkResults as a dependency

  const openColorModal = (color) => {
    setSelectedColor(color); // Set the selected color for the modal
    setIsColorModalOpen(true); // Open the color modal
  };

  const closeColorModal = () => {
    setIsColorModalOpen(false); // Close the color modal
  };

  const openNumberModal = (number) => {
    setSelectedNumber(number); // Set the selected number for the modal
    setIsNumberModalOpen(true); // Open the number modal
  };

  const closeNumberModal = () => {
    setIsNumberModalOpen(false); // Close the number modal
  };

  const openSizeModal = (size) => {
    setSelectedSize(size); // Set the selected size for the modal
    setIsSizeModalOpen(true); // Open the size modal
  };

  const closeSizeModal = () => {
    setIsSizeModalOpen(false); // Close the size modal
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value); // Update the amount field
  };

  const handleSubmit = () => {
    // Store the user's selections in localStorage
    const userSelections = {
      color: selectedColor,
      number: selectedNumber,
      size: selectedSize,
      amount: amount,
    };
    localStorage.setItem("userSelections", JSON.stringify(userSelections));

    // Close the modals after submission
    closeColorModal();
    closeNumberModal();
    closeSizeModal();
  };

  return (
    <div className="bg-[#2B3270] text-white p-6 rounded-xl max-w-md mx-auto">
      {/* Display Result Message */}
      {resultMessage && (
        <div className="text-xl font-semibold text-center mb-4">
          {resultMessage}
        </div>
      )}

      {/* Top Category Buttons */}
      <div className="flex justify-center space-x-2 mb-6">
        <button
          onClick={() => openColorModal("Green")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all w-1/3"
        >
          Green
        </button>
        <button
          onClick={() => openColorModal("Violet")}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition-all w-1/3"
        >
          Violet
        </button>
        <button
          onClick={() => openColorModal("Red")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all w-1/3"
        >
          Red
        </button>
      </div>

      {/* Numbered Balls */}
      <div className="grid grid-cols-5 sm:grid-cols-5 gap-4 mb-6">
        {[...Array(10).keys()].map((num, index) => (
          <div
            key={num}
            onClick={() => openNumberModal(num)}
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
          onClick={() => openSizeModal("Big")}
          className={`flex-1 bg-orange-500 text-white px-4 py-2 rounded-l-lg ${
            selectedSize === "Big" ? "ring-1 ring-gray-400" : ""
          } w-full sm:w-auto`}
        >
          Big
        </button>
        <button
          onClick={() => openSizeModal("Small")}
          className={`flex-1 bg-blue-500 text-white px-4 py-2 rounded-r-lg ${
            selectedSize === "Small" ? "ring-1 ring-gray-400" : ""
          } w-full sm:w-auto`}
        >
          Small
        </button>
      </div>

      {/* Modals */}
      {/* Color Modal */}
      {isColorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-t from-indigo-900 to-indigo-600 text-white p-8 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-semibold mb-4">
              You've Selected {selectedColor}
            </h2>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm mb-2 font-medium">
                Enter Amount to Pay
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Amount"
              />
            </div>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleSubmit}
                disabled={countdown <= 10} // Disable if countdown is 10 or less
                className={`${
                  countdown <= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
                } text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transition-all w-full sm:w-auto`}
              >
                Submit
              </button>
              <button
                onClick={closeColorModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-all w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Modal */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-t from-indigo-900 to-indigo-600 text-white p-8 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-semibold mb-4">
              You've Selected {selectedSize}
            </h2>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleSubmit}
                disabled={countdown <= 10} // Disable if countdown is 10 or less
                className={`${
                  countdown <= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
                } text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transition-all w-full sm:w-auto`}
              >
                Submit
              </button>
              <button
                onClick={closeSizeModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-all w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Number Modal */}
      {isNumberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-t from-indigo-900 to-indigo-600 text-white p-8 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-semibold mb-4">
              You've Selected {selectedNumber}
            </h2>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleSubmit}
                disabled={countdown <= 10} // Disable if countdown is 10 or less
                className={`${
                  countdown <= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
                } text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transition-all w-full sm:w-auto`}
              >
                Submit
              </button>
              <button
                onClick={closeNumberModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-all w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberSelection;
