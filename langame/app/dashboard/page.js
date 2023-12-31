"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { languages } from "../constants/index";
import BottomNavbar from "../components/BottomNav";
import Question from "../components/Question";
import LanguageSelection from "../components/Langauge";


const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  console.log(selectedLanguage);
  return (
    <div className="bg-[#0d1829] h-screen sm:h-full sm:mb-4">
      <nav className="bg-gray-800 text-white flex justify-between items-center px-4 py-4">
        <span className="text-xl font-bold">Your App Name</span>
        
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
