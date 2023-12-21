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

  useEffect(() => {
    // Fetch questions based on the selected language
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        let lang = selectedLanguage.toLowerCase();
        const response = await fetch(
          `https://langgame-server.onrender.com/api/question/language/${lang}`
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
    <div className="quiz-container h-screen mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
      {timeOut ? (
        <h1 className="endText">You scored: {score}</h1>
      ) : (
        <>
          <div className="top">
            <div className="timer">
              <Timer
                setTimeOut={setTimeOut}
                questionNumber={questionNumber}
              />
            </div>
          </div>
          <div className="bottom">
            <Ques
              data={questions}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
              setTimeOut={setTimeOut}
            />
          </div>
        </>
      )}

      <div className="pyramid">
      <ul className="moneyList">
        {scorePyramid.map((m) => (
          <li
            className={
              questionNumber === m.id
                ? "moneyListItem active"
                : "moneyListItem"
            }
          >
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default QuizApp;
