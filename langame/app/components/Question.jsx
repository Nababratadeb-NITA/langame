"use client"

import { useState } from 'react';

const Question = ({ word, sentence, translation, difficulty }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {difficulty === 'easy' && <p className="text-xl font-bold">{word}</p>}
      {difficulty !== 'easy' && <p className="text-xl font-bold">{sentence}</p>}
      <br />
      {isSubmitted ? (
        <div>
          {answer === translation ? (
            <p className="text-green-500">¡Correcto!</p>
          ) : (
            <div>
              <p className="text-red-500">Intenta de nuevo.</p>
              <p>La traducción correcta es: {translation}</p>
              {/* Optionally add explanation or context here based on difficulty */}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="px-3 py-2 border rounded-md"
            placeholder="Respuesta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <br />
          <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700">
            Comprobar
          </button>
        </form>
      )}
    </div>
  );
};

export default Question;
