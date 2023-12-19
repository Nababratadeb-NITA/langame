"use client"

import { useState } from 'react';
import { languages } from '../constants/index';
import BottomNavbar from '../components/BottomNav';
import Question from '../components/Question';

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust media query breakpoint

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Implement logic to set locale/change language (e.g., router.push(`/en`))
  };

  return (
    <div>
    <nav className="bg-gray-800 text-white flex justify-between items-center px-4 py-2">
      <span className="text-xl font-bold">Your App Name</span>
      {isMobile && (
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
                selectedLanguage === language ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLanguageChange(language)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
      {/* Include your dropdown menu component here (conditionally rendered for mobile) */}
    </nav>
    <Question />
    <BottomNavbar />
    </div>
  );
};

export default Dashboard;
