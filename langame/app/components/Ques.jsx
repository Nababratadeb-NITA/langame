import React, { useEffect, useState } from "react";


function Ques({ data, questionNumber, setQuestionNumber, setTimeOut }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");


  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () => {
      setClassName(a === question.correctOption ? "answer correct" : "answer wrong");
    });
      delay(3000, () => {
      if (a === question.correctOption) {
        // correctAnswer();
        

        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        // wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
      })
  };

    


  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers mt-8">
        {question?.options.map((a, i) => (
          <div
          key={i}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a}
          </div>
        ))}
      </div>
    </div>   
  );
}

export default Ques;
