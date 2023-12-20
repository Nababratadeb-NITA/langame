"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { languages } from "../constants/index";
import BottomNavbar from "../components/BottomNav";
import Question from "../components/Question";
import LanguageSelection from "../components/Langauge";


const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center px-4 py-2">
        <span className="text-xl font-bold">Your App Name</span>
        {!isMobile && (
          <span
            className="cursor-pointer px-2 py-1 rounded-md font-semibold"
            onClick={""}
          >
            Language: ({selectedLanguage ? selectedLanguage.name : 'Select'})
          </span>
        )}
        
      </nav>
      
      {/* Conditionally render the LanguageSelection component */}
      {!selectedLanguage && <LanguageSelection onLanguageSelected={setSelectedLanguage} />}

      {/* Conditionally render the Quiz component */}
      {selectedLanguage && <Question selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />}

      <BottomNavbar />
    </div>
  );
};

export default Dashboard;
