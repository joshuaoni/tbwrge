"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Paperclip } from "lucide-react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Search, User, UserCircle, Smile } from "lucide-react";
import Image from "next/image";
import { inter } from "@/constants/app";
import { useRouter } from "next/router";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminChats } from "@/actions/chat";
import { getMessages, Message as APIMessage } from "@/actions/get-messages";
import { createMessage } from "@/actions/create-message";
import EmojiPicker, { Theme, EmojiStyle, Emoji } from "emoji-picker-react";
import { ChatResponse as ImportedChatResponse } from "@/actions/get-chats";
import AdminDashboardLayout from "@/components/admin/layout";

interface LastMessage {
  type: string;
  reference: string | null;
  text: string;
  updated_at: string;
  created_at: string;
  id: string;
}

interface ChatResponse {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    reference: string | null;
    created_at: string;
    updated_at: string;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    channel: string;
    last_name: string | null;
    country_code: string | null;
    phone: string | null;
    profile_picture: string | null;
    calendly_link: string | null;
    google_calender_link: string | null;
    username: string | null;
    location: string | null;
    last_login: string;
  };
  type: string;
  category: string;
  subject: string;
  details: string;
  image: string | null;
  preferred_contact: string;
  open: boolean;
  chat_status: string;
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

interface MediaItem {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  type: string;
  url: string;
}

interface APIMediaItem {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  type: string;
  url: string;
}

interface ExtendedMessage extends Omit<APIMessage, "type" | "media" | "text"> {
  type: "text" | "media";
  text: string | null;
  media: MediaItem[];
}

// Modify the EmojiText component
const EmojiText = ({
  text,
  size = 16,
}: {
  text: string | null;
  size?: number;
}) => {
  if (!text) return null;

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

// Add formatMessageTime helper function
const formatMessageTime = (timestamp: string) => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffInMinutes = Math.floor(
    (now.getTime() - messageDate.getTime()) / (1000 * 60)
  );
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    return messageDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });
  }
};

// Add this helper function to format the date for the separator
const formatDateSeparator = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

// Add this function to group messages by date
const groupMessagesByDate = (messages: ExtendedMessage[]) => {
  const groups: { [key: string]: ExtendedMessage[] } = {};

  messages.forEach((message) => {
    const date = new Date(message.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return groups;
};

export default function ChatPage() {
  const router = useRouter();
  const { userData } = useUserStore();
  const queryClient = useQueryClient();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [localMessages, setLocalMessages] = useState<ExtendedMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [selectedChatWs, setSelectedChatWs] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const selectedChatWsRef = useRef<WebSocket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch user's chats
  const { data: chats = [], isLoading: isLoadingChats } = useQuery<
    ChatResponse[]
  >({
    queryKey: ["admin-chats"],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getAdminChats(userData.token);
    },
    enabled: !!userData?.token,
    refetchInterval: 1000, // Refetch every second
  });

  // Fetch messages for the selected chat
  const { data: messages, isLoading: isLoadingMessages } = useQuery<
    ExtendedMessage[]
  >({
    queryKey: ["chat-messages", selectedChatId],
    queryFn: async () => {
      if (!userData?.token || !selectedChatId) return [];
      const msgs = await getMessages(userData.token, selectedChatId);
      return (
        msgs.map((msg) => ({
          ...msg,
          type: msg.type as "text" | "media",
          media: Array.isArray(msg.media)
            ? msg.media.map((m) => {
                if (typeof m === "string") {
                  return {
                    id: `temp-${Date.now()}`,
                    reference: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    type: "image",
                    url: m,
                  };
                }
                const mediaItem = m as APIMediaItem;
                return {
                  id: mediaItem.id,
                  reference: mediaItem.reference,
                  created_at: mediaItem.created_at,
                  updated_at: mediaItem.updated_at,
                  type: mediaItem.type,
                  url: mediaItem.url,
                };
              })
            : [],
        })) || []
      );
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
  const otherUser = selectedChat ? selectedChat.user : null;

  // Selected chat WebSocket connection
  useEffect(() => {
    if (selectedChatId && userData?.token) {
      // Close existing connection if any
      if (selectedChatWsRef.current) {
        selectedChatWsRef.current.close();
      }

      // Create new WebSocket connection for selected chat
      const socket = new WebSocket(
        `wss://chats.candivet.com/chat/message-feed/${selectedChatId}/ws?auth_token=${userData.token}`
      );

      socket.onopen = () => {
        console.log("Selected chat WebSocket connection established");
        setSelectedChatWs(socket);
        selectedChatWsRef.current = socket;
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Selected chat message received:", message);

          // Only update messages if it's not an optimistic message
          if (!message.id.startsWith("temp-")) {
            setLocalMessages((prev) => {
              // Check if message already exists
              const messageExists = prev.some((msg) => msg.id === message.id);
              if (!messageExists) {
                return [...prev, message];
              }
              return prev;
            });

            // Scroll to bottom
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("Selected chat WebSocket error:", error);
      };

      socket.onclose = (event) => {
        console.log(
          "Selected chat WebSocket connection closed:",
          event.code,
          event.reason
        );
        setSelectedChatWs(null);
        selectedChatWsRef.current = null;
      };

      // Cleanup function
      return () => {
        if (socket) {
          socket.close();
        }
      };
    }
  }, [selectedChatId, userData?.token]);

  // Handle incoming WebSocket messages for chat list updates
  const handleNewMessage = (message: any) => {
    // Skip optimistic messages in general websocket
    if (message.id.startsWith("temp-")) return;

    console.log("General WebSocket message received:", message);

    // Update chat list
    queryClient.setQueryData<ChatResponse[]>(["admin-chats"], (old) => {
      if (!old) return [];

      const updatedChats = old.map((chat) => {
        if (chat.id === message.chat_id) {
          return {
            ...chat,
            last_message: {
              id: message.id,
              text: message.text,
              type: message.type,
              reference: message.reference,
              created_at: message.created_at,
              updated_at: message.updated_at,
            },
            updated_at: new Date().toISOString(),
          };
        }
        return chat;
      });

      // Move the updated chat to the top
      const updatedChat = updatedChats.find(
        (chat) => chat.id === message.chat_id
      );
      if (updatedChat) {
        const otherChats = updatedChats.filter(
          (chat) => chat.id !== message.chat_id
        );
        return [updatedChat, ...otherChats];
      }

      return updatedChats;
    });
  };

  // Create message mutation
  const createMessageMutation = useMutation({
    mutationFn: async ({ text, files }: { text: string; files: File[] }) => {
      if (!userData?.token || !selectedChatId)
        throw new Error("Missing token or chat ID");
      const response = await createMessage(
        userData.token,
        selectedChatId,
        text,
        files
      );
      return {
        ...response,
        type: response.type as "text" | "media",
      };
    },
    onMutate: async ({ text, files }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["chat-messages", selectedChatId],
      });
      await queryClient.cancelQueries({ queryKey: ["admin-chats"] });

      // Get current query data
      const previousMessages = queryClient.getQueryData<ExtendedMessage[]>([
        "chat-messages",
        selectedChatId,
      ]);
      const previousChats = queryClient.getQueryData<ChatResponse[]>([
        "admin-chats",
      ]);

      // Create optimistic message
      const optimisticMessage: ExtendedMessage = {
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
        text: text || null,
        type: files.length > 0 ? "media" : "text",
        media:
          files.length > 0
            ? files.map((file) => ({
                id: `temp-${Date.now()}-${file.name}`,
                reference: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                type: "image",
                url: URL.createObjectURL(file),
              }))
            : [],
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

        queryClient.setQueryData(["admin-chats"], updatedChats);
      }

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
        queryClient.setQueryData(["admin-chats"], context.previousChats);
      }
      console.error("Failed to send message:", err);
      setIsSending(false);
    },
    onSuccess: (data) => {
      // Remove the optimistic message and add the real one
      setLocalMessages((prev) => {
        const withoutOptimistic = prev.filter(
          (msg) => !msg.id.startsWith("temp-")
        );
        return [...withoutOptimistic, data as ExtendedMessage];
      });

      setIsSending(false);
      setNewMessage("");
      setSelectedFiles([]);

      // Force refetch the chat list
      queryClient.invalidateQueries({
        queryKey: ["admin-chats"],
      });
    },
  });

  // Handle sending a new message
  const handleSendMessage = () => {
    if (
      (!newMessage.trim() && selectedFiles.length === 0) ||
      !selectedChatId ||
      isSending
    )
      return;

    setIsSending(true);
    createMessageMutation.mutate(
      {
        text: newMessage.trim(),
        files: selectedFiles,
      },
      {
        onSuccess: () => {
          setNewMessage("");
          setSelectedFiles([]);
        },
      }
    );
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
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

  // General WebSocket connection for all chats
  useEffect(() => {
    if (userData?.token) {
      // Close existing connection if any
      if (wsRef.current) {
        wsRef.current.close();
      }

      // Create new WebSocket connection
      const socket = new WebSocket(
        `wss://chats.candivet.com/chat/message-feed/ws?auth_token=${userData.token}`
      );

      socket.onopen = () => {
        console.log("General WebSocket connection established");
        setWs(socket);
        wsRef.current = socket;
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleNewMessage(message);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("General WebSocket connection closed");
        setWs(null);
        wsRef.current = null;
      };

      // Cleanup function
      return () => {
        if (socket) {
          socket.close();
        }
      };
    }
  }, [userData?.token]);

  return (
    <AdminDashboardLayout>
      <div className="h-[calc(100vh-150px)] flex overflow-hidden">
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
                [...chats]
                  .sort((a, b) => {
                    const aTime = a.last_message
                      ? new Date(a.last_message.updated_at).getTime()
                      : new Date(a.updated_at).getTime();
                    const bTime = b.last_message
                      ? new Date(b.last_message.updated_at).getTime()
                      : new Date(b.updated_at).getTime();
                    return bTime - aTime;
                  })
                  .map((chat) => {
                    const otherUser = chat.user;

                    return (
                      <li
                        key={chat.id}
                        className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                          chat.id === selectedChatId ? "bg-gray-50" : ""
                        }`}
                        onClick={() => {
                          setSelectedChatId(chat.id);
                          router.push(
                            `/admin/chat?chatId=${chat.id}`,
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
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900 truncate">
                                {otherUser.name} {otherUser.last_name || ""}
                              </h3>
                              <span className="text-sm text-gray-500 flex-shrink-0">
                                {chat.last_message
                                  ? formatMessageTime(
                                      chat.last_message.updated_at
                                    )
                                  : formatMessageTime(chat.updated_at)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                {chat.last_message ? (
                                  chat.last_message.type === "text" ? (
                                    <EmojiText text={chat.last_message.text} />
                                  ) : (
                                    "Shared media"
                                  )
                                ) : (
                                  "No messages yet"
                                )}
                              </div>
                              {chat.unread > 0 && (
                                <div className="flex items-center">
                                  <span className="w-[20px] h-[20px] bg-[#ED4F9D] text-white text-[11px] rounded-full flex items-center justify-center">
                                    {chat.unread}
                                  </span>
                                </div>
                              )}
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
                    {Object.entries(groupMessagesByDate(localMessages))
                      .sort(
                        ([dateA], [dateB]) =>
                          new Date(dateA).getTime() - new Date(dateB).getTime()
                      )
                      .map(([date, messages]) => (
                        <div key={date} className="space-y-4">
                          <div className="flex items-center justify-center">
                            <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                              {formatDateSeparator(new Date(date))}
                            </div>
                          </div>
                          {messages.map((message: ExtendedMessage) => {
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
                                  {message.type === "text" && message.text && (
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
                                                    part
                                                      .codePointAt(0)
                                                      ?.toString(16) || ""
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
                                  )}
                                  {message.media &&
                                    message.media.length > 0 && (
                                      <div className="flex flex-wrap gap-2">
                                        {message.media.map(
                                          (media: any, i: number) => (
                                            <Image
                                              key={i}
                                              src={media.url || media}
                                              width={200}
                                              height={200}
                                              alt={`Media ${i + 1}`}
                                              className="rounded-md max-w-[200px] h-auto object-cover"
                                            />
                                          )
                                        )}
                                      </div>
                                    )}
                                  {message.type === "media" &&
                                    !message.text && (
                                      <div className="text-sm text-gray-500">
                                        Shared media
                                      </div>
                                    )}
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(
                                      message.created_at
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
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
                        <div className="relative group">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                          />
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                          >
                            ×
                          </button>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block truncate max-w-[100px]">
                          {file.name}
                        </span>
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
                  <div className="flex items-center gap-2">
                    <label
                      className={`text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer p-2 transition-transform duration-200 ${
                        newMessage.trim() || selectedFiles.length > 0
                          ? "-translate-x-1"
                          : ""
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                        disabled={isSending}
                      />
                      <Paperclip className="w-5 h-5" />
                    </label>
                    {(newMessage.trim() || selectedFiles.length > 0) && (
                      <button
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0 disabled:opacity-50 p-2 transition-opacity duration-200"
                        onClick={handleSendMessage}
                        disabled={isSending}
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
                    )}
                  </div>
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
    </AdminDashboardLayout>
  );
}
