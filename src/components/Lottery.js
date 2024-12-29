import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const Lottery = ({currentId}) => {
  const [timeLeft, setTimeLeft] = useState(150); // Timer starts at 2 minutes 30 seconds
  const [currentId1, setCurrentId1] = useState(currentId); // Starting ID as BigInt
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [result, setResult] = useState(''); // State for the result message
  
  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear the timer to prevent memory leaks
    } else {
      // When timer reaches 0, reset the timer and increment the ID
      setTimeLeft(150); // Reset timer to 2 minutes 30 seconds
      setCurrentId1((prevId) => prevId + 1n); // Increment ID as BigInt

      // Announce result after timer reaches 0
      setResult(`Result for ID ${currentId1.toString()}: ${Math.random() > 0.5 ? 'You Win!' : 'You Lose!'}`);
    }
  }, [timeLeft]); // Dependency array listens to changes in `timeLeft`

  return (
    <div className="bg-[#2B3270] text-white p-6 rounded-xl max-w-lg mx-auto relative">
      <div className="bg-blue-500 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center relative">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          {/* How to Play Button */}
          <button
            onClick={() => setShowPopup(true)} // Show popup when clicked
            className="flex items-center justify-center md:justify-start bg-blue-700 text-white px-4 py-2 rounded-full mb-4 shadow-md hover:bg-blue-800 transition w-full md:w-auto"
          >
            <FaQuestionCircle className="mr-2" />
            How to play
          </button>
          {/* Win Go Text */}
          <h2 className="text-lg font-bold mb-2">Win Go 2m30s</h2>
          {/* Balls Section */}
          <div className="flex justify-center md:justify-start space-x-2">
            {['8', '0', '5', '4', '1'].map((num, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex justify-center items-center rounded-full text-white font-bold text-lg ${
                  index % 2 === 0 ? 'bg-red-500' : 'bg-green-500'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-1 w-full md:w-1 md:h-20 bg-white bg-opacity-40 my-4 md:my-0"></div>

        {/* Right Section */}
        <div className="flex-1 text-center">
          <h3 className="text-md font-bold mb-2">Time remaining</h3>
          <div className="text-2xl font-bold bg-black text-white rounded-lg px-4 py-2 inline-block tracking-wider">
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, '0')} : {`${timeLeft % 60}`.padStart(2, '0')}
          </div>
          <p className="text-sm mt-2">{currentId}</p>
        </div>
      </div>

      {/* Popup for "How to Play" */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">How to Play</h2>
            <ul className="list-disc ml-5 mb-4 text-sm">
              <li>Select a number from the balls.</li>
              <li>Choose a multiplier for your bet.</li>
              <li>Pick "Big" or "Small" to finalize your selection.</li>
              <li>Wait for the timer to end and see the result!</li>
            </ul>
            <button
              onClick={() => setShowPopup(false)} // Close the popup
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lottery;
