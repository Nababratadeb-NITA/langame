"use client";

import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', ''],
    correctOption: '',
    difficulty: 2,
    language: '',
  });

  useEffect(() => {
    // Fetch questions on component mount
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${process.env.Backend_URL}/question`);
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddQuestion = async () => {
    try {
        console.log("Token : ",localStorage.getItem('token'));
      const response = await fetch(`${process.env.Backend_URL}/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newQuestion),
      });

      const data = await response.json();
      console.log("data",data);
      setQuestions([...questions, data.question]);
      setNewQuestion({
        question: '',
        options: ['', '', ''],
        correctOption: '',
        difficulty: 2,
        language: '',
      });
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await fetch(`${process.env.Backend_URL}/question/${questionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      setQuestions(questions.filter((q) => q._id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form for adding a new question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add Question</h2>
        <div className="flex flex-col space-y-4">
          {/* Question input */}
          <label htmlFor="question" className="text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="px-4 py-2 border rounded-md text-black"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          />

          {/* Options inputs */}
          <label htmlFor="options" className="text-sm font-medium text-gray-700">
            Options
          </label>
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="px-4 py-2 border rounded-md text-black"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newQuestion.options];
                updatedOptions[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: updatedOptions });
              }}
            />
          ))}

          {/* Correct option input */}
          <label htmlFor="correctOption" className="text-sm font-medium text-gray-700">
            Correct Option
          </label>
          <input
            type="text"
            id="correctOption"
            className="px-4 py-2 border rounded-md text-black"
            value={newQuestion.correctOption}
            onChange={(e) => setNewQuestion({ ...newQuestion, correctOption: e.target.value })}
          />

          {/* Difficulty input */}
          <label htmlFor="difficulty" className="text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <input
            type="number"
            id="difficulty"
            className="px-4 py-2 border rounded-md text-black"
            value={newQuestion.difficulty}
            onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: parseInt(e.target.value, 10) })}
          />

          {/* Language input */}
          <label htmlFor="language" className="text-sm font-medium text-gray-700">
            Language
          </label>
          <input
            type="text"
            id="language"
            className="px-4 py-2 border rounded-md text-black"
            value={newQuestion.language}
            onChange={(e) => setNewQuestion({ ...newQuestion, language: e.target.value })}
          />

          {/* Add Question button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>

      {/* List of existing questions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Questions</h2>
        <ul>
          {questions.map((question) => (
            <li key={question._id} className="mb-2">
              {question.question} - Difficulty: {question.difficulty}
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={() => handleDeleteQuestion(question._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

