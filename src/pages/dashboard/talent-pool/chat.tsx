"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Search, User, UserCircle } from "lucide-react";
import Image from "next/image";
import { inter } from "@/constants/app";
import { useRouter } from "next/router";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChats, ChatResponse } from "@/actions/get-chats";
import { getMessages, Message } from "@/actions/get-messages";
import { createMessage } from "@/actions/create-message";
import EmojiPicker, { Theme, EmojiStyle, Emoji } from "emoji-picker-react";
import { Smile } from "lucide-react";

interface LastMessage {
  type: string;
  reference: string | null;
  text: string;
  updated_at: string;
  created_at: string;
  id: string;
}

interface ExtendedChatResponse extends ChatResponse {
  chat_status: string | null;
  last_message: LastMessage | null;
  unread: number;
}

interface User {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  isOnline?: boolean;
  unreadCount?: number;
}

// Mock data for demonstration
const users: User[] = [
  {
    id: "1",
    name: "Andreana Viola",
    lastMessage: "Hi, How are you today?",
    time: "1m ago",
    avatar: "/Mask.png",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Francesco Long",
    lastMessage: "Hi @Angel, I hope you are doing well",
    time: "2h ago",
    avatar: "/Mask.png",
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: "3",
    name: "Alexandra Michu",
    lastMessage: "Hi, How are you today?",
    time: "09:00",
    avatar: "/Mask.png",
    isOnline: true,
  },
  {
    id: "4",
    name: "Hwang Lee",
    lastMessage: "I hope it will be finished soon",
    time: "Today",
    avatar: "/Mask.png",
    isOnline: false,
  },
  {
    id: "5",
    name: "Maximillian",
    lastMessage: "You are absolutely right!",
    time: "23/11",
    avatar: "/Mask.png",
    isOnline: false,
  },
  {
    id: "6",
    name: "Xiao Ming",
    lastMessage: "Hi, How are you today?",
    time: "23/11",
    avatar: "/Mask.png",
    isOnline: false,
  },
];

// Modify the EmojiText component
const EmojiText = ({ text, size = 16 }: { text: string; size?: number }) => {
  return (
    <span className="inline">
      {text.split(/(\p{Emoji})/gu).map((part, index) => {
        if (part.match(/\p{Emoji}/gu)) {
          return (
            <span
              key={index}
              style={{ display: "inline-block", verticalAlign: "middle" }}
            >
              <Emoji
                unified={part.codePointAt(0)?.toString(16) || ""}
                emojiStyle={EmojiStyle.APPLE}
                size={size}
              />
            </span>
          );
        }
        return (
          <span key={index} style={{ display: "inline" }}>
            {part}
          </span>
        );
      })}
    </span>
  );
};

export default function ChatPage() {
  const router = useRouter();
  const { userData } = useUserStore();
  const queryClient = useQueryClient();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch user's chats
  const { data: chats, isLoading: isLoadingChats } = useQuery<ChatResponse[]>({
    queryKey: ["user-chats"],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getChats(userData.token);
    },
    enabled: !!userData?.token,
    refetchInterval: 1000, // Refetch every second
  });

  // Fetch messages for the selected chat
  const { data: messages, isLoading: isLoadingMessages } = useQuery<Message[]>({
    queryKey: ["chat-messages", selectedChatId],
    queryFn: async () => {
      if (!userData?.token || !selectedChatId) return [];
      const msgs = await getMessages(userData.token, selectedChatId);
      return msgs || [];
    },
    enabled: !!userData?.token && !!selectedChatId,
  });

  // Update local messages when query data changes
  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (localMessages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [localMessages.length]);

  // Set the selected chat ID from URL parameter
  useEffect(() => {
    if (router.query.chatId) {
      setSelectedChatId(router.query.chatId as string);
    }
  }, [router.query.chatId]);

  // Find the selected chat
  const selectedChat = chats?.find((chat) => chat.id === selectedChatId);

  // Get the other user in the chat (not the current user)
  const otherUser = selectedChat
    ? selectedChat.user_1.id === userData?.user?.id
      ? selectedChat.user_2
      : selectedChat.user_1
    : null;

  // Create message mutation
  const createMessageMutation = useMutation({
    mutationFn: async ({ text, files }: { text: string; files: File[] }) => {
      if (!userData?.token || !selectedChatId)
        throw new Error("Missing token or chat ID");
      return await createMessage(userData.token, selectedChatId, text, files);
    },
    onMutate: async ({ text, files }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["chat-messages", selectedChatId],
      });
      await queryClient.cancelQueries({ queryKey: ["user-chats"] });

      // Get current query data
      const previousMessages = queryClient.getQueryData<Message[]>([
        "chat-messages",
        selectedChatId,
      ]);
      const previousChats = queryClient.getQueryData<ChatResponse[]>([
        "user-chats",
      ]);

      // Create optimistic message
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        reference: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          id: userData?.user?.id || "",
          reference: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          name: userData?.user?.name || "",
          email: userData?.user?.email || "",
          role: userData?.user?.role || "",
          is_verified: true,
          channel: "others",
          last_name: null,
          country_code: null,
          phone: null,
          profile_picture: null,
          calendly_link: null,
          google_calender_link: null,
          username: userData?.user?.username || null,
          location: null,
          last_login: new Date().toISOString(),
        },
        text,
        type: "text",
        media: [],
      };

      // Update messages optimistically
      setLocalMessages((prev) => [...prev, optimisticMessage]);

      // Update chat list optimistically
      if (previousChats) {
        const updatedChat = {
          ...previousChats.find((chat) => chat.id === selectedChatId)!,
          last_message: {
            id: optimisticMessage.id,
            text: optimisticMessage.text,
            type: optimisticMessage.type,
            reference: optimisticMessage.reference,
            created_at: optimisticMessage.created_at,
            updated_at: optimisticMessage.updated_at,
          },
          updated_at: new Date().toISOString(),
        };

        const otherChats = previousChats.filter(
          (chat) => chat.id !== selectedChatId
        );
        const updatedChats = [updatedChat, ...otherChats];

        queryClient.setQueryData(["user-chats"], updatedChats);
      }

      // Clear input immediately
      setNewMessage("");
      setSelectedFiles([]);

      return { previousMessages, previousChats, optimisticMessage };
    },
    onError: (err, { text }, context) => {
      // Revert messages on error
      if (context?.optimisticMessage) {
        setLocalMessages((prev) =>
          prev.filter((msg) => msg.id !== context.optimisticMessage.id)
        );
      }
      // Revert chat list on error
      if (context?.previousChats) {
        queryClient.setQueryData(["user-chats"], context.previousChats);
      }
      console.error("Failed to send message:", err);
      setIsSending(false);
    },
    onSuccess: async (data) => {
      // Update local messages with the real message
      setLocalMessages((prev) => {
        const tempId = `temp-${Date.now()}`;
        const newMessage: Message = {
          ...data,
          media: Array.isArray(data.media)
            ? data.media.map((m: any) => m.url || m)
            : [],
        };
        return prev.map((msg) => (msg.id === tempId ? newMessage : msg));
      });

      setIsSending(false);

      // Force refetch the chat list
      await queryClient.refetchQueries({
        queryKey: ["user-chats"],
        type: "active",
      });

      // Invalidate queries in the background
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", selectedChatId],
      });
    },
  });

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChatId || isSending) return;

    setIsSending(true);
    createMessageMutation.mutate({
      text: newMessage.trim(),
      files: selectedFiles,
    });
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  // Remove a selected file
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiObject: any) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <DashboardWrapper>
      <div className="h-[calc(100vh-80px)] flex overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-[360px] bg-white flex flex-col min-h-0">
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
          <div className="flex-1 overflow-y-auto">
            <ul>
              {isLoadingChats ? (
                <li className="px-6 py-4 text-center text-gray-500">
                  Loading chats...
                </li>
              ) : chats && chats.length > 0 ? (
                chats.map((chat) => {
                  // Determine the other user in the chat
                  const otherUser =
                    chat.user_1.id === userData?.user?.id
                      ? chat.user_2
                      : chat.user_1;

                  return (
                    <li
                      key={chat.id}
                      className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                        chat.id === selectedChatId ? "bg-gray-50" : ""
                      }`}
                      onClick={() => {
                        setSelectedChatId(chat.id);
                        router.push(
                          `/dashboard/talent-pool/chat?chatId=${chat.id}`,
                          undefined,
                          { shallow: true }
                        );
                      }}
                    >
                      <div className="flex w-full items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={otherUser.profile_picture || "/Mask.png"}
                            alt={otherUser.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                          {chat.unread > 0 && (
                            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900 truncate">
                              {otherUser.name} {otherUser.last_name || ""}
                            </h3>
                            <span className="text-sm text-gray-500 flex-shrink-0">
                              {chat.last_message
                                ? new Date(
                                    chat.last_message.updated_at
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : new Date(chat.updated_at).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <div className="text-sm text-gray-500 truncate pr-2">
                              {chat.last_message ? (
                                <EmojiText text={chat.last_message.text} />
                              ) : (
                                "No messages yet"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="px-6 py-4 text-center text-gray-500">
                  No chats found
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F5F9FF] rounded-[10px] border border-[#E5E7EB]">
          {selectedChatId && otherUser ? (
            <>
              {/* Chat Header - Fixed */}
              <div className="px-6 py-4 border-b flex justify-between items-center bg-white flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={otherUser.profile_picture || "/Mask.png"}
                      alt={otherUser.name}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {otherUser.name} {otherUser.last_name || ""}
                  </h3>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
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
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isLoadingMessages ? (
                  <div className="text-center py-4 text-gray-500">
                    Loading messages...
                  </div>
                ) : localMessages.length > 0 ? (
                  <>
                    {localMessages.map((message: Message) => {
                      const isCurrentUser =
                        message.user.id === userData?.user?.id;

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isCurrentUser ? "justify-end" : ""
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 ${
                              isCurrentUser
                                ? "bg-[#145959] text-white rounded-xl rounded-tr-none"
                                : "bg-white rounded-xl rounded-tl-none"
                            }`}
                          >
                            <div className="whitespace-pre-wrap inline">
                              {message.text
                                .split(/(\p{Emoji})/gu)
                                .map((part, index) => {
                                  if (part.match(/\p{Emoji}/gu)) {
                                    return (
                                      <span
                                        key={index}
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        <Emoji
                                          unified={
                                            part.codePointAt(0)?.toString(16) ||
                                            ""
                                          }
                                          emojiStyle={EmojiStyle.APPLE}
                                          size={20}
                                        />
                                      </span>
                                    );
                                  }
                                  return (
                                    <span
                                      key={index}
                                      style={{ display: "inline" }}
                                    >
                                      {part}
                                    </span>
                                  );
                                })}
                            </div>
                            {message.media && message.media.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {message.media.map(
                                  (media: string, i: number) => (
                                    <Image
                                      key={i}
                                      src={media}
                                      width={40}
                                      height={40}
                                      alt="attachment"
                                      className="w-10 h-10 rounded-md"
                                    />
                                  )
                                )}
                              </div>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(message.created_at).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No messages yet
                  </div>
                )}
              </div>

              {/* Message Input - Fixed at bottom */}
              <div className="p-4 m-4 rounded-[12px] border-t bg-white flex flex-col">
                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="bg-gray-100 p-2 rounded-md flex items-center">
                          <span className="text-xs truncate max-w-[100px]">
                            {file.name}
                          </span>
                          <button
                            onClick={() => removeFile(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message Input Row */}
                <div className="flex items-center gap-2">
                  <div className="relative" ref={emojiPickerRef}>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer p-2"
                      type="button"
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-12 left-0 z-50 shadow-lg rounded-lg">
                        <EmojiPicker
                          onEmojiClick={onEmojiClick}
                          theme={Theme.LIGHT}
                          emojiStyle={EmojiStyle.APPLE}
                          lazyLoadEmojis={true}
                          skinTonesDisabled
                          searchPlaceHolder="Search emoji..."
                          height={350}
                          width={300}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Write your message..."
                      className="w-full outline-none text-transparent bg-transparent caret-gray-600 placeholder:text-transparent absolute inset-0 min-h-[24px]"
                      disabled={isSending}
                    />
                    <div className="w-full outline-none pointer-events-none min-h-[24px]">
                      {newMessage ? (
                        <div className="text-gray-600">
                          <EmojiText text={newMessage} />
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          Write your message...
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0 disabled:opacity-50 p-2"
                    onClick={handleSendMessage}
                    disabled={isSending || !newMessage.trim()}
                    type="button"
                  >
                    {isSending ? (
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <IoSend className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No chat selected
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Select a chat from the list or start a new conversation with a
                  talent.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
}
