"use client";

import { useState, useEffect } from "react";
import BottomNavbar from "../components/BottomNav";

const PlayerCard = ({ player, rank }) => (
  <div className="flex flex-col mt-8 items-center space-y-2">
    <img
      src="https://imgs.search.brave.com/RcCKFO2sarsbu5lE_XmZGK585s2szSsggxUrV1aBIcc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRlL2E3/LzkyLzRlYTc5MjNk/YWE1ZTdmMjc5YTgw/ODI1ZWZjMjc0OTFj/LmpwZw"
      alt=""
      className="rounded-full h-20 w-20"
    />
    <div className="flex items-center space-x-4">
      <h1 className="text-lg font-bold">
        <span>#{rank} </span>
        {player.username}
      </h1>
      <p>{player.highestScore}</p>
    </div>
  </div>
);

const Scoreboard = () => {
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(`${process.env.Backend_URL}/leaderboard`);

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }

        const data = await response.json();

        if (Array.isArray(data.leaderboard)) {
          setSortedPlayers(data.leaderboard);
        } else {
          console.error("Invalid data format:", data);
          setSortedPlayers([]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setSortedPlayers([]);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="flex pt-10 flex-col items-center h-screen bg-[#0d1829] text-white px-4 py-2 rounded-md">
      <p className="text-3xl font-bold mb-2 uppercase">Leaderboard</p>
      <p className="text-xs font-bold mb-2 uppercase">Top Player scores of the game</p>

      <div className="flex items-center space-x-8">
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <PlayerCard key={player._id} player={player} rank={index + 1} />
        ))}
      </div>

      {sortedPlayers.length > 0 && (
        <table className="w-full text-sm mt-8">
        <thead>
          <tr>
            <th className="px-2 py-1 underline">Rank</th>
            <th className="px-2 py-1 underline">Player</th>
            <th className="px-2 py-1 underline">XP</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={player._id}>
              <td className="px-2 py-1 ">{`# ${index + 1}`}</td>
              <td className="px-2 py-1">{player.username}</td>
              <td className="px-2 py-1">{player.highestScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
      <BottomNavbar />
    </div>
  );
};

export default Scoreboard;
