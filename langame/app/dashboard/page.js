"use client";

import { useState } from "react";
import { languages } from "../constants/index";
import BottomNavbar from "../components/BottomNav";
import Question from "../components/Question";

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen state to false
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust media query breakpoint

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (language === "spanish") {
      router.push("/es/your-page");
    } else if (language === "english") {
      router.push("/en/your-page");
    } else if (language === "bengali") {
      router.push("/bn/your-page");
    } else if (language === "French") {
      router.push("/fr/your-page");
    }
  };

  const options = ["the boy", "the girl", "the man", "the woman"];

  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center px-4 py-2">
        <span className="text-xl font-bold">Your App Name</span>
        {!isMobile && (
          <span
            className="cursor-pointer px-2 py-1 rounded-md font-semibold"
            onClick={""}
          >
            Language: ({selectedLanguage.name})
          </span>
        )}
        {!isMobile && (
          <div className="flex items-center space-x-2">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`px-2 py-1 rounded-md font-semibold ${
                  selectedLanguage === language
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleLanguageChange(language)}
              >
                {language.name}
              </button>
            ))}
          </div>
        )}
        {/* Include your dropdown menu component here (conditionally rendered for mobile) */}
        {isMobile && (
          <div className="relative inline-block">
            <button
              className="px-2 py-1 rounded-md font-semibold bg-gray-700 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              Language: ({selectedLanguage.name})
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.707 16.464a3.745 3.745 0 0 1-5.097 0L7.568 11.793l-2.146 4.671zM12.293 4.536a3.745 3.745 0 0 0-5.097 0L9.707 9.207l-2.146-4.671zM16.464 9.707a3.745 3.745 0 0 1 0-5.097l-4.671 2.146L11.793 2.432zM4.536 12.293a3.745 3.745 0 0 0 0 5.097l4.671-2.146L2.432 16.464z" />
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute z-10 top-full left-0 bg-gray-700 text-white rounded-md px-2 py-1 shadow-md">
                {languages.map((language) => (
                  <li key={language.code}>
                    <button
                      className="block px-2 py-1 hover:bg-gray-600"
                      onClick={() => {
                        handleLanguageChange(language);
                        setIsOpen(false);
                      }}
                    >
                      {language.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </nav>
      <Question
        question={"el nina"}
        answers={options}
        correctAnswer={"the girl"}
        onFinish={""}
      />
      <BottomNavbar />
    </div>
  );
};

export default Dashboard;
