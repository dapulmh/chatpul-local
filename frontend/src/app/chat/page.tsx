"use client";
import { ChatIcon, UserIcon } from "@heroicons/react/outline";
import { Input } from "@heroui/react";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

interface Thread {
  _id: string;
  name: string;
}

const ChatPage = () => {
  const [threads, setThreads] = useState<Buffer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");

  const fetchThreads = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/threads", {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(response.data);
      setThreads([buffer]);
    } catch (err) {
      setError("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  };

  const decodedThreads = threads
    .map((buffer) => {
      try {
        return JSON.parse(buffer.toString("utf-8")) as Thread[];
      } catch (err) {
        console.error("Error decoding buffer:", err);
        return [];
      }
    })
    .flat();

  useEffect(() => {
    fetchThreads();
  }, []);

  const createThread = async () => {
    try {
      const threadData = {
        name: newThreadTitle,
      };

      // Convert to JSON string if necessary
      const jsonString = JSON.stringify(threadData);

      // Send the thread data as JSON
      const response = await axios.post(
        "http://localhost:1000/api/thread",
        jsonString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Thread created:", response.data);
      fetchThreads();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

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
          <button
            className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 w-full"
            onClick={() => setIsOpen(true)}
          >
            <UserIcon className="h-5 w-5 mr-2" />
            New chat
          </button>
          {/* Divider */}
          <div className="border-t border-white my-4" />
          <h2 className="text-lg font-semibold mb-2">List Thread</h2>
          <ul>
            {decodedThreads.map((thread) => (
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

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-6"
                  >
                    Create New Thread
                  </Dialog.Title>
                  <div className="mt-2 p-6">
                    <Input
                      label="Thread Title"
                      type="input"
                      value={newThreadTitle}
                      onChange={(e) => setNewThreadTitle(e.target.value)}
                      variant="flat"
                    />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={createThread}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ChatPage;
