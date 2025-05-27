import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "@/constants/api_config";
import { Comment } from "./get-comments";

interface CreateCommentData {
  text: string;
}

export const createComment = async (
  postId: string,
  data: CreateCommentData,
  token: string
): Promise<Comment> => {
  try {
    const formData = new URLSearchParams();
    formData.append("text", data.text);

    const options = {
      method: "POST",
      url: API_CONFIG.CREATE_COMMENT(postId),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    };

    const response = await axios<any, AxiosResponse<Comment>>(options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create comment"
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Failed to create comment");
    }
  }
};
