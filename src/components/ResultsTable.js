import React, { useState, useEffect } from 'react';

const ResultsTable = ({ results, currentId }) => {  
  const initialData = [
    { period: '20241224100051503', number: 4, size: 'Small', color: 'red' },
    { period: '20241224100051502', number: 8, size: 'Big', color: 'red' },
    { period: '20241224100051501', number: 6, size: 'Big', color: 'red' },
    { period: '20241224100051500', number: 9, size: 'Big', color: 'green' },
    { period: '20241224100051499', number: 0, size: 'Small', color: 'purple' },
  ];  
  const [data, setData] = useState(results || initialData); // Initialize data with results or default data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getColorClass = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'green':
        return 'bg-green-500';
      case 'purple':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastPeriod = prevData[0]?.period || '20241224100051500';
        const newPeriod = (parseInt(lastPeriod) + 1).toString();

        const newResult = {
          period: newPeriod,
          number: Math.floor(Math.random() * 10),
          size: Math.random() > 0.5 ? 'Big' : 'Small',
          color: ['red', 'green', 'purple'][Math.floor(Math.random() * 3)],
        };

        const updatedData = [newResult, ...prevData].slice(0, 50);
        return updatedData;
      });

      setCurrentPage(1); // Automatically reset to first page on new data
    }, 150000); // 150 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#2B3270] text-white p-6 rounded-xl max-w-4xl mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-900 text-left text-sm md:text-base">
              <th className="px-4 py-2">Period</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Big/Small</th>
              <th className="px-4 py-2">Color</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) =>           
             (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-blue-800' : 'bg-blue-700'
                } hover:bg-blue-600`}
              >
                <td className="px-4 py-2 text-xs md:text-sm">{row.id}</td>
                <td
                  className={`px-4 py-2 text-lg md:text-2xl font-bold ${getColorClass(row.color)}`}
                >
                  {row.number}
                </td>
                <td className="px-4 py-2 text-xs md:text-sm">{row.size}</td>
                <td className="px-4 py-2">
                  <span className={`inline-block w-4 h-4 rounded-full ${getColorClass(row.color)}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm md:text-base ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm md:text-base ${currentPage === i + 1 ? 'bg-blue-800 text-white font-bold' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-sm md:text-base ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;
