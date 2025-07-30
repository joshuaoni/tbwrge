import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "@/constants/api_config";
import { User } from "./get-posts";

export interface Comment {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  text: string;
  user: User;
  upvotes: number;
  answers: number;
  reacted: boolean;
}

export const getComments = async (
  postId: string
  // token: string
): Promise<Comment[]> => {
  try {
    const options = {
      method: "GET",
      url: API_CONFIG.GET_COMMENTS(postId),
      headers: {
        // Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        // Accept: "application/json",
      },
      //   withCredentials: true,
    };

    const response = await axios<any, AxiosResponse<Comment[]>>(options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch comments"
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Failed to fetch comments");
    }
  }
};
