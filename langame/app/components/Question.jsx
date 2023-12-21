// pages/index.js

import { useState, useEffect } from 'react';
import Ques from './Ques';

const options1 = [
  "city of trash", "city of dimond", "city of gold", "city of peace"
]

const QuizApp = ({ selectedLanguage, setSelectedLanguage }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions based on the selected language
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        let lang = selectedLanguage.toLowerCase();
        const response = await fetch(`http://localhost:8000/api/question/language/${lang}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedLanguage]);

  const handleCheckAnswer = () => {
    if (userAnswer === questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(null);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    setUserAnswer(selectedOption);
  };

  if (loading) {
    return <div className="quiz-container mx-auto my-auto p-8 max-w-md">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>

      <Ques />
     
    </div>
  );
};

export default QuizApp;

// {questions.length > 0 && currentQuestion ? (
//   <Ques
//     question={"el dorado"}
//     options={options1}
//     onOptionSelect={handleOptionSelect}
//   />
// ) : (
//   <p>No questions available.</p>
// )}

// <button
//   className="bg-green-500 text-white py-2 px-4 rounded mt-4"
//   onClick={handleCheckAnswer}
// >
//   Check Answer
// </button>

// {currentQuestionIndex === questions.length - 1 && (
//   <div className="text-2xl font-bold mt-4">
//     Your Final Score: {score}/{questions.length}
//   </div>
// )}
