import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

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
}

export const startChat = async (
  token: string,
  talent_id: string
): Promise<ChatResponse> => {
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.TALENT_START_CHAT(talent_id),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error starting chat:", error);
    throw error;
  }
};
