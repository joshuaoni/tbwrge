import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface DeleteCommentResponse {
  message: string;
}

export const deleteComment = async (
  commentId: string,
  token: string
): Promise<DeleteCommentResponse> => {
  try {
    const response = await axios.delete(API_CONFIG.DELETE_COMMENT(commentId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to delete comments");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
    throw error;
  }
};
