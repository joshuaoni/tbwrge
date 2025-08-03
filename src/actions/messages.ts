import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface UnreadMessagesResponse {
  count: number;
}

export const getUnreadMessagesCount = async (
  token: string
): Promise<UnreadMessagesResponse> => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_UNREAD_MESSAGES,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("unread-messages-count: ", { response });

  // The API returns the count directly as a number, not an object
  const count = response.data;

  return { count } as UnreadMessagesResponse;
};
