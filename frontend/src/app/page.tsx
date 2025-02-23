"use client";
// pages/index.tsx
import { HomeIcon, LoginIcon, UserAddIcon } from "@heroicons/react/outline";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white p-4 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-center space-x-6">
          <a
            href="/chat"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Chat</span>
          </a>
          <a
            href="/login"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <LoginIcon className="h-5 w-5" />
            <span>Login</span>
          </a>
          <a
            href="/register"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <UserAddIcon className="h-5 w-5" />
            <span>Register</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Chatpul
        </h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
