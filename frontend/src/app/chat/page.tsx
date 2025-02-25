"use client";
import { ChatIcon, UserIcon, CogIcon } from "@heroicons/react/outline";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Thread {
  _id: string;
  name: string;
}

const ChatPage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchThreads = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/threads");
      setThreads(response.data);
    } catch (err) {
      setError("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchThreads();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Chatpul</h1>
          <button className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 w-full">
            <UserIcon className="h-5 w-5 mr-2" />
            New chat
          </button>
          {/* Divider */}
          <div className="border-t border-white my-4" />
          <h2 className="text-lg font-semibold mb-2">List Thread</h2>
          <ul>
            {threads.map((thread) => (
              <li key={thread._id} className="mb-2">
                <button className="flex items-center p-2 rounded hover:bg-gray-700 w-full">
                  <ChatIcon className="h-5 w-5 mr-2" />
                  {thread.name} {/* Display the thread title */}
                </button>
              </li>
            ))}
          </ul>
          {/* Divider */}
          <div className="border-t border-white my-4" />
        </div>

        {/* Light Mode and Log Out Section */}
        <div className="flex flex-col items-end">
          <button className="flex items-center p-2 rounded hover:bg-gray-700 w-full mb-2">
            <span className="mr-2">Light mode</span>
            <input type="checkbox" className="form-checkbox" />
          </button>
          <button className="flex items-center p-2 rounded hover:bg-gray-700 w-full">
            <span className="mr-2">Back to home</span>
          </button>
          <button className="flex items-center p-2 rounded hover:bg-gray-700 w-full">
            <span className="mr-2">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Welcome to Chatpul</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Chat messages will appear here...</p>
          {/* Add chat messages here */}
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input label="Enter your prompt" type="input" variant="flat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
