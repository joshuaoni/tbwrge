import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface LastMessage {
  type: string;
  reference: string | null;
  text: string;
  updated_at: string;
  created_at: string;
  id: string;
}

export interface ChatResponse {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user_1: {
    id: string;
    reference: string | null;
    created_at: string;
    updated_at: string;
    name: string;
    last_name: string | null;
    profile_picture: string | null;
    email: string;
    role: string;
    is_verified: boolean;
    channel: string;
    country_code: string | null;
    phone: string | null;
    calendly_link: string | null;
    google_calender_link: string | null;
    username: string | null;
    location: string | null;
    last_login: string;
  };
  user_2: {
    id: string;
    reference: string | null;
    created_at: string;
    updated_at: string;
    name: string;
    last_name: string | null;
    profile_picture: string | null;
    email: string;
    role: string;
    is_verified: boolean;
    channel: string;
    country_code: string | null;
    phone: string | null;
    calendly_link: string | null;
    google_calender_link: string | null;
    username: string | null;
    location: string | null;
    last_login: string;
  };
  chat_status: string | null;
  last_message: LastMessage | null;
  unread: number;
}

export const getTalentChats = async (
  token: string
): Promise<ChatResponse[]> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.TALENT_GET_CHATS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};
