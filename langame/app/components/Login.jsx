"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrlRegister = 'http://localhost:8000/api/auth/register';
      const apiUrlLogin = 'http://localhost:8000/api/auth/login';

      // Check if the user already exists by trying to register
      const responseRegister = await fetch(apiUrlRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const responseLogin = await fetch(apiUrlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (responseLogin.ok) {
        // Login successful, redirect the user
        router.push("/dashboard");
      } else {
        // Handle login error
        const data = await responseLogin.json();
        setError(data.message || 'Login failed');
      }
      
      if (!responseRegister.ok) {
        // User already exists, handle accordingly (e.g., show an error message)
        setError('User already exists. Please login.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-2xl text-center mb-6 font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-black bg-gray-100 border rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full py-2 px-3 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="text-black bg-gray-100 border rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full py-2 px-3 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
