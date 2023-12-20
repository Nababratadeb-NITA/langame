"use client";

import { useState, useEffect } from 'react';
import BottomNavbar from '../components/BottomNav';

const Scoreboard = () => {
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard');

        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const data = await response.json();

        if (Array.isArray(data.leaderboard)) {
          setSortedPlayers(data.leaderboard);
        } else {
          console.error('Invalid data format:', data);
          // Handle error, setSortedPlayers([]) or show an error message
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Handle error, setSortedPlayers([]) or show an error message
      }
    };

    fetchLeaderboardData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
              <tr key={player._id}>
                <td className="px-2 py-1 border-r">{index + 1}</td>
                <td className="px-2 py-1 border-r">{player.username}</td>
                <td className="px-2 py-1 border-r">{player.highestScore}</td>
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
