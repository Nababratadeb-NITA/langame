import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import Lottery from './components/Lottery';
import Navbar from './components/Navbar';
import NumberSelection from './components/NumberSelection';
import ResultsTable from './components/ResultsTable';
import Timer from './components/timer';
import Wallet from './components/wallet';
import Deposit from './pages/Deposit'; // Import Deposit Page component

function App() {
  return (
    <Router> {/* Wrap the app in BrowserRouter */}
      <div className="App bg-[#2B3270] min-h-screen">
        <Navbar /> {/* Navbar will show on all pages */}
        <div className="px-4 md:px-8 lg:px-16">
          {/* Set up the Routes */}
          <Routes>
            <Route path="/" element={<><Wallet /><Timer /><Lottery /><NumberSelection /><ResultsTable /></>} /> 
            {/* Default route with all main components */}
            <Route path="/deposit" element={<Deposit />} /> {/* Deposit Page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
