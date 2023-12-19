"use client"

import { useState, useEffect } from 'react';
import BottomNavbar from '../components/BottomNav';

const Scoreboard = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', score: 10 },
    { id: 2, name: 'Player 2', score: 15 },
    { id: 3, name: 'Player 3', score: 5 },
    { id: 4, name: 'Player 4', score: 10 },
    { id: 5, name: 'Player 5', score: 15 },
    { id: 6, name: 'Player 6', score: 50 },
    
  ]);

  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const sorted = players.slice().sort((a, b) => b.score - a.score);
    setSortedPlayers(sorted);
  }, [players]);

  return (
    <div>
    <div className="flex flex-col items-center h-screen bg-gray-800/50 text-white px-4 py-2 rounded-md">
    <p className="text-xl font-bold mb-2">Leaderboard</p>
    <table className="w-full text-sm">
    <thead>
      <tr>
        <th className="px-2 py-1 border-r underline">Rank</th>
        <th className="px-2 py-1 border-r underline">Player</th>
        <th className="px-2 py-1 border-r underline">XP</th>
      </tr>
    </thead>
    <tbody>
      {sortedPlayers.map((player, index) => (
        <tr key={player.id}>
          <td className="px-2 py-1 border-r">{index + 1}</td>
          <td className="px-2 py-1 border-r">{player.name}</td>
          <td className="px-2 py-1 border-r">{player.score * 10}</td>
        </tr>
      ))}
    </tbody>
  </table>
  
  </div>
  <BottomNavbar />
  </div>
  );
};

export default Scoreboard;
