// pages/index.js

import { useState, useEffect, useMemo } from "react";
import Ques from "./Ques";
import Timer from "./Timer";

const QuizApp = ({ selectedLanguage, setSelectedLanguage }) => {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [timeOut, setTimeOut] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(score);

  const updateUserScore = async () => {
    try {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');

      const response = await fetch(`${process.env.Backend_URL}/user/updateScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${storedToken}`, 
        },
        body: JSON.stringify({
          userId: storedUserId,
          highestScore: score,
        }),
      });

      if (response.ok) {
        console.log('Score updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Error updating score:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  useEffect(() => {
    // Fetch questions based on the selected language
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        let lang = selectedLanguage.toLowerCase();
        const response = await fetch(
          `${process.env.Backend_URL}/question/language/${lang}`
        );
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedLanguage]);

  useEffect(() => {
    if (timeOut) {
      updateUserScore();
    }
  }, [timeOut]);

  const scorePyramid = useMemo(
    () =>
      [
        { id: 1, score: "1" },
        { id: 2, score: "2" },
        { id: 3, score: "3" },
        { id: 4, score: "5" },
        { id: 5, score: "10" },
        { id: 6, score: "20" },
        { id: 7, score: "40" },
        { id: 8, score: "80" },
        { id: 9, score: "100" },
        { id: 10, score: "200" },
        { id: 11, score: "400" },
        { id: 12, score: "1200" },
        { id: 13, score: "2000" },
        { id: 14, score: "5000" },
        { id: 15, score: "10000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setScore(scorePyramid.find((m) => m.id === questionNumber - 1).score);
  }, [questionNumber, scorePyramid]);

  return (
    <div className="quiz-container h-screen p-8 max-w-md mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Quiz App</h1>
        {timeOut ? (
          <h1 className="endText">You scored: {score}</h1>
        ) : (
          <>
            <div className="top mt-8">
              <div className="timer ml-48 flex items-center">
                <Timer
                  setTimeOut={setTimeOut}
                  questionNumber={questionNumber}
                />
              </div>
            </div>
            <div className="bottom mt-12 space-y-8">
              <Ques
                data={questions}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setTimeOut={setTimeOut}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
