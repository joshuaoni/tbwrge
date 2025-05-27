import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface UpvotePostResponse {
  message: string;
}

export const togglePostVote = async (
  postId: string,
  token: string
): Promise<UpvotePostResponse> => {
  try {
    const response = await axios.get(API_CONFIG.UPVOTE_DOWNVOTE_POST(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to vote on posts");
      }
      throw new Error(
        error.response?.data?.message || "Failed to vote on post"
      );
    }
    throw error;
  }
};
