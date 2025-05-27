import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface DeletePostResponse {
  message: string;
}

export const deletePost = async (
  postId: string,
  token: string
): Promise<DeletePostResponse> => {
  try {
    const response = await axios.delete(API_CONFIG.DELETE_POST(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to delete posts");
      }
      throw new Error(error.response?.data?.message || "Failed to delete post");
    }
    throw error;
  }
};
