"use client";

import { useState } from "react";
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import DashboardWrapper from "@/components/dashboard-wrapper";
const users = [
  {
    name: "Andreana Viola",
    lastMessage: "Hi, How are you today?",
    time: "1m ago",
  },
  {
    name: "Francesco Long",
    lastMessage: "Hi Angel, I hope you are do...",
    time: "2h ago",
  },
  {
    name: "Alexandra Michu",
    lastMessage: "Hi, How are you today?",
    time: "09:00",
  },
  {
    name: "Hwang Lee",
    lastMessage: "I hope it will be finished soon",
    time: "Today",
  },
  {
    name: "Maximillian",
    lastMessage: "You are absolutely right!",
    time: "23/11",
  },
  { name: "Xiao Ming", lastMessage: "Hi, How are you today?", time: "23/11" },
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
      text: "Hello Michu, I’m fine. How about you?",
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
      attachments: ["img1.png", "img2.png"],
    },
  ]);

  return (
    <DashboardWrapper>
      <div className="p-6  min-h-screen flex">
        <div className="w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Chat</h2>
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search for any user"
              className="w-full pl-10 p-2 border rounded-lg bg-gray-100"
            />
          </div>
          <ul>
            {users.map((user, index) => (
              <li
                key={index}
                className="p-3 border-b flex justify-between cursor-pointer hover:bg-gray-200"
              >
                <span>
                  <strong>{user.name}</strong>
                  <p className="text-sm text-gray-500">{user.lastMessage}</p>
                </span>
                <span className="text-xs text-gray-500">{user.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 bg-white p-4 rounded-lg shadow ml-4 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold">Alexandra Michu</h3>
            <FaEllipsisH className="text-gray-500 cursor-pointer" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "Me" ? "justify-end" : ""}`}
              >
                <div
                  className={`p-3 ${
                    msg.sender === "Me"
                      ? "bg-green-600 text-white rounded-xl rounded-tl-none"
                      : "bg-gray-200 rounded-xl rounded-tr-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.attachments && (
                    <div className="flex space-x-2 mt-2">
                      {msg.attachments.map((img, i) => (
                        <img
                          key={i}
                          src={img}
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

          <div className="border-t pt-2 flex items-center">
            <input
              type="text"
              placeholder="Write your message..."
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
            <IoSend className="text-green-600 text-2xl ml-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
