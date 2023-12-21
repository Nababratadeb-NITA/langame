import React from 'react'

function Ques({ question, options, onOptionSelect }) {
  
  return (
    <div className="mb-4">
    <h2 className="text-lg font-bold mb-2">{question}</h2>
    <div>
      {options.map((option) => (
        <button
          key={option}
          className="bg-blue-200 text-blue-800 py-2 px-4 rounded mr-2 mb-2 hover:bg-blue-300 focus:outline-none"
          onClick={() => onOptionSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
  )
}

export default Ques
