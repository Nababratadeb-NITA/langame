"use client";

import { useState, useEffect } from "react";
import BottomNavbar from "../components/BottomNav";

const Scoreboard = () => {
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("https://langgame-server.onrender.com/api/leaderboard");

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }

        const data = await response.json();

        if (Array.isArray(data.leaderboard)) {
          setSortedPlayers(data.leaderboard);
        } else {
          console.error("Invalid data format:", data);
          // Handle error, setSortedPlayers([]) or show an error message
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        // Handle error, setSortedPlayers([]) or show an error message
      }
    };

    fetchLeaderboardData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <div className="flex flex-col items-center h-screen bg-[#0d1829] text-white px-4 py-2 rounded-md">
        <p className="text-xl font-bold mb-2">Leaderboard</p>

        <div className="flex items-center space-x-8">
        <div className="flex flex-col mt-8 items-center space-y-2">
          <img
            src="https://imgs.search.brave.com/RcCKFO2sarsbu5lE_XmZGK585s2szSsggxUrV1aBIcc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRlL2E3/LzkyLzRlYTc5MjNk/YWE1ZTdmMjc5YTgw/ODI1ZWZjMjc0OTFj/LmpwZw"
            alt=""
            className="rounded-full h-20 w-20"
          />
          <div className="flex items-center space-x-4"><h1 className="text-lg font-bold">
          <span>#2 </span>testuser
        </h1>
        <p>50</p></div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <img
            src="https://imgs.search.brave.com/RcCKFO2sarsbu5lE_XmZGK585s2szSsggxUrV1aBIcc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRlL2E3/LzkyLzRlYTc5MjNk/YWE1ZTdmMjc5YTgw/ODI1ZWZjMjc0OTFj/LmpwZw"
            alt=""
            className="rounded-full h-20 w-20"
          />
          <div className="flex items-center space-x-4"><h1 className="text-lg font-bold">
          <span>#1 </span>Nababrata
        </h1>
        <p>50</p></div>
        </div>
        <div className="flex flex-col mt-8 items-center space-y-2">
          <img
            src="https://imgs.search.brave.com/RcCKFO2sarsbu5lE_XmZGK585s2szSsggxUrV1aBIcc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRlL2E3/LzkyLzRlYTc5MjNk/YWE1ZTdmMjc5YTgw/ODI1ZWZjMjc0OTFj/LmpwZw"
            alt=""
            className="rounded-full h-20 w-20"
          />
          <div className="flex items-center space-x-4"><h1 className="text-lg font-bold">
          <span>#3 </span>elon muxk
        </h1>
        <p>50</p></div>
        </div>
        </div>
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
