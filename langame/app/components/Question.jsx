import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Question = ({ question, answers, correctAnswer, onFinish }) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (selectedAnswer === correctAnswer) {
      // Call onFinish callback with success flag
      onFinish(true);
    } else {
      // Show feedback for incorrect answer
      // (Optional: delay navigation to next question)
    }
  };

  useEffect(() => {
    if (isSubmitted && selectedAnswer === correctAnswer) {
      // Delay navigation to next question (e.g., 1 second)
      setTimeout(() => router.push('/next-question-page'), 1000);
    }
  }, [isSubmitted, selectedAnswer, router]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-bold mb-4">{question}</p>
      <form onSubmit={handleSubmit}>
        {answers.map((answer, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={`answer-${index}`}
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => handleAnswerClick(answer)}
            />
            <label htmlFor={`answer-${index}`} className="ml-2 text-sm">
              {answer}
            </label>
          </div>
        ))}
        <button
          type="submit"
          disabled={!selectedAnswer}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {isSubmitted && selectedAnswer !== correctAnswer && (
        <p className="text-red-500 mt-2">Oops, that's not quite right!</p>
      )}
    </div>
  );
};

export default Question;
