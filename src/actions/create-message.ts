import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface MediaItem {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  type: string;
  url: string;
}

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

export interface MessageResponse {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user: MessageUser;
  text: string;
  type: string;
  media: MediaItem[];
}

export const createMessage = async (
  token: string,
  channel_id: string,
  text: string,
  media: File[] = []
): Promise<MessageResponse> => {
  try {
    const formData = new FormData();
    formData.append("text", text);

    // Append each media file to the formData
    media.forEach((file) => {
      formData.append("media", file);
    });

    const response = await axios({
      method: "POST",
      url: API_CONFIG.CREATE_MESSAGE(channel_id),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};
