"use client";

import { useState } from "react";
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Search, User, UserCircle } from "lucide-react";
import Image from "next/image";
import { inter } from "@/constants/app";

interface User {
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  isOnline?: boolean;
  unreadCount?: number;
}

const users: User[] = [
  {
    name: "Andreana Viola",
    lastMessage: "Hi, How are you today?",
    time: "1m ago",
    avatar: "/Mask.png",
    isOnline: true,
    unreadCount: 2,
  },
  {
    name: "Francesco Long",
    lastMessage: "Hi @Angel, I hope you are doing well",
    time: "2h ago",
    avatar: "/Mask.png",
    isOnline: true,
    unreadCount: 1,
  },
  {
    name: "Alexandra Michu",
    lastMessage: "Hi, How are you today?",
    time: "09:00",
    avatar: "/Mask.png",
    isOnline: true,
  },
  {
    name: "Hwang Lee",
    lastMessage: "I hope it will be finished soon",
    time: "Today",
    avatar: "/Mask.png",
    isOnline: false,
  },
  {
    name: "Maximillian",
    lastMessage: "You are absolutely right!",
    time: "23/11",
    avatar: "/Mask.png",
    isOnline: false,
  },
  {
    name: "Xiao Ming",
    lastMessage: "Hi, How are you today?",
    time: "23/11",
    avatar: "/Mask.png",
    isOnline: false,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: "Alexandra Michu",
      text: "Hi, How are you today?",
      time: "9:00 AM",
    },
    {
      sender: "Me",
      text: "Hello Michu, I'm fine. How about you?",
      time: "9:10 AM",
    },
    {
      sender: "Alexandra Michu",
      text: "Can you send a sample from a reference?",
      time: "9:11 AM",
    },
    {
      sender: "Me",
      text: "This is the reference we will use",
      time: "10:10 AM",
      attachments: ["/img1.png", "/img2.png"],
    },
    {
      sender: "Alexandra Michu",
      text: "Very good, thank you!",
      time: "10:11 AM",
    },
    {
      sender: "Me",
      text: "I'm glad to hear that!",
      time: "10:12 AM",
    },
    {
      sender: "Alexandra Michu",
      text: "I'm glad to hear that too!",
      time: "10:13 AM",
    },
  ]);

  return (
    <DashboardWrapper>
      <div className="h-[calc(100vh-80px)] flex overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-[360px] bg-white border-r flex flex-col min-h-0">
          {/* Search - Fixed at top */}
          <div className="p-6 border-b flex-shrink-0">
            <div className="relative">
              <Search
                color="#898989"
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search for any user"
                className="w-full pl-10 p-2 border rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Chat List - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <ul>
              {users.map((user, index) => (
                <li
                  key={index}
                  className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                    index === 2 ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={user.avatar || "/Mask.png"}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      {user.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900 truncate">
                          {user.name}
                        </h3>
                        <span className="text-sm text-gray-500 flex-shrink-0">
                          {user.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-500 truncate pr-2">
                          {user.lastMessage}
                        </p>
                        {(user.unreadCount ?? 0) > 0 && (
                          <span className="flex-shrink-0 min-w-[20px] h-5 flex items-center justify-center bg-pink-500 text-white text-xs rounded-full px-1.5">
                            {user.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          {/* Chat Header - Fixed */}
          <div className="px-6 py-4 border-b flex justify-between items-center bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/Mask.png"
                  alt="Alexandra Michu"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <h3 className="text-lg font-semibold">Alexandra Michu</h3>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area - Scrollable */}
          <div className="flex-1 bg-[#F5F9FF] flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "Me" ? "justify-end" : ""}`}
                >
                  <div
                    className={`max-w-[70%] p-3 ${
                      msg.sender === "Me"
                        ? "bg-[#145959] text-white rounded-xl rounded-tr-none"
                        : "bg-white rounded-xl rounded-tl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.attachments && (
                      <div className="flex gap-2 mt-2">
                        {msg.attachments.map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            width={40}
                            height={40}
                            alt="attachment"
                            className="w-10 h-10 rounded-md"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="p-4 bg-white mx-6 mb-6 rounded-lg flex items-center gap-3 flex-shrink-0">
              <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9H9.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 9H15.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Write your message..."
                className="flex-1 outline-none text-gray-600 placeholder:text-gray-400"
              />
              <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59718 21.9983 8.005 21.9983C6.41282 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80943 14.7185 1.38777 15.78 1.38777C16.8415 1.38777 17.8594 1.80943 18.61 2.56C19.3606 3.31057 19.7822 4.32855 19.7822 5.39C19.7822 6.45145 19.3606 7.46943 18.61 8.22L9.41 17.41C9.03472 17.7853 8.52577 17.9961 7.995 17.9961C7.46423 17.9961 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.99389 16.5258 5.99389 15.995C5.99389 15.4642 6.20472 14.9553 6.58 14.58L15.07 6.1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
