import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface ManageChatResponse {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user: any;
  type: string;
  category: string;
  subject: string;
  details: string;
  image: string | null;
  preferred_contact: string;
  open: boolean;
}

export const manageChat = async (
  token: string,
  ticketId: string,
  chat_status: string
): Promise<ManageChatResponse> => {
  const response = await axios({
    method: "PUT",
    url: API_CONFIG.MANAGE_CHAT(ticketId),
    headers: { Authorization: `Bearer ${token}` },
    data: { chat_status },
  });
  return response.data;
};

export const getAdminChats = async (token: string) => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_CHATS,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
