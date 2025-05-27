import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface UpdatePostData {
  title: string;
  text: string;
  files?: File[];
  category_ids?: string[];
}

interface UpdatePostResponse {
  message: string;
}

export const updatePost = async (
  postId: string,
  data: UpdatePostData,
  token: string
): Promise<UpdatePostResponse> => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    if (data.category_ids) {
      data.category_ids.forEach((id) => {
        formData.append("category_ids", id);
      });
    }
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await axios.put(API_CONFIG.UPDATE_POST(postId), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to update posts");
      }
      throw new Error(error.response?.data?.message || "Failed to update post");
    }
    throw error;
  }
};
