import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface MessageUser {
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
}

export interface Message {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user: MessageUser;
  text: string;
  type: string;
  media: string[];
}

export const getMessages = async (
  token: string,
  channel_id: string
): Promise<Message[]> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_MESSAGES(channel_id),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
