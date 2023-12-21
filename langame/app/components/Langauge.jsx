"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';


const LanguageSelection = ({ onLanguageSelected }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const router = useRouter();
  const handleLanguageSelect = () => {
    if (selectedLanguage) {

      localStorage.setItem('selectedLanguage', selectedLanguage);

      // Pass the selected language to the parent component
      onLanguageSelected(selectedLanguage);

      // Navigate to the quiz page or the appropriate component
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1829]">
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-md">
   
        <h1 className="text-2xl text-center mb-6 font-bold">Select a Language</h1>
        <div className="mb-6">
          <label htmlFor="language" className="text-sm font-medium text-gray-700 block mb-2">
            Choose a language:
          </label>
          <select
            id="language"
            className="bg-gray-100 border rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full py-2 px-3 text-sm text-black"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="" disabled>Select a language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="bengali">Bengali</option>
            <option value="french">French</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleLanguageSelect}
          className="w-full py-2 px-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;
