"use client";

import React, { useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNav";

function page() {
  const [profileData, setProfileData] = useState();
  const [error, setError] = useState(null);

  console.log(profileData);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    // Replace with the actual user ID

    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `https://langgame-server.onrender.com/api/user/${storedUserId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${storedToken}`, // Assuming you're using a bearer token
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data. Please try again.");
      }
    };

    fetchProfileData();
  }, []);
  return (
    <div className="text-black">
      <div className="flex items-center justify-center h-screen bg-[#0d1829] -mt-6">
        {profileData ? (
          <div className=" mx-auto bg-white rounded-3xl shadow-xl">
            <div className="grid rounded-3xl max-w-sm shadow-sm bg-slate-100  flex-col">
              <img
                src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
                width="390"
                height="200"
                className="rounded-t-3xl justify-center grid h-80 object-cover"
                alt="movie.title"
              />

              <div className="group p-6 grid z-10">
                <a
                  href=""
                  className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2"
                >
                  {profileData.user.username}
                </a>
                <div className="h">
                  <span className="line-clamp-4 py-2 text-base font-light leading-relaxed"></span>
                </div>
                <div className=" grid-cols-2 flex group justify-between">
                  <div className="font-black flex flex-col">
                    <span className="text-yellow-500 text-xl">SCORE</span>
                    <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
                    {profileData.user.highestScore ? <div>{profileData.user.highestScore}</div> : 0}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="h-7" />
                    <span className="text-3xl  font-bold  gap-x-2 text-slate-300">
                      # {profileData.user.__v}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>User Not found</div>
        )}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default page;
