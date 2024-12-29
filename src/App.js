import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import { useState, useEffect } from 'react';
import Lottery from './components/Lottery';
import Navbar from './components/Navbar';
import NumberSelection from './components/NumberSelection';
import ResultsTable from './components/ResultsTable';
import Timer from './components/timer';
import Wallet from './components/wallet';
import Deposit from './pages/Deposit'; // Import Deposit Page component

function App() {
  const [timeLeft, setTimeLeft] = useState(150); // Shared timer state
  const [currentId, setCurrentId] = useState(20241224100051500n); // Shared ID state as BigInt
  const [results, setResults] = useState([]); // Shared results state

  // Timer and result synchronization
  useEffect(() => {
    console.log();
    
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear timer to prevent memory leaks
    } else {
      // When timer reaches 0, reset the timer and update results
      setTimeLeft(150); // Reset timer to 2 minutes 30 seconds
      setCurrentId((prevId) => prevId + 1n); // Increment ID

      // Generate new result
      const newResult = {
        id: currentId.toString(),
        number: Math.floor(Math.random() * 10), // Random number between 0-9
        size: Math.random() > 0.5 ? 'Big' : 'Small', // Randomly choose Big or Small
        color: ['red', 'green', 'purple'][Math.floor(Math.random() * 3)], // Randomly choose color
        status: Math.random() > 0.5 ? 'Win' : 'Lose', // Randomly decide result
      };

      // Update results table
      setResults((prevResults) => [newResult, ...prevResults]);
    }
  }, [timeLeft, currentId]); 
 

  return (
    <Router> {/* Wrap the app in BrowserRouter */}
      <div className="App bg-[#2B3270] min-h-screen">
        <Navbar /> {/* Navbar will show on all pages */}
        <div className="px-4 md:px-8 lg:px-16">
          {/* Set up the Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Wallet />
                  <Lottery timeLeft={timeLeft} currentId={currentId.toString()} />
                  <NumberSelection />
                  <ResultsTable results={results} currentId={currentId.toString()} />
                </>
              }
            />
            <Route path="/deposit" element={<Deposit />} /> {/* Deposit Page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
