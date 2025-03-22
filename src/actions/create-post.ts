import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "@/constants/api_config";
import { Post } from "./get-posts";

interface CreatePostData {
  title: string;
  text: string;
  files?: File[];
  category_ids?: string[];
}

export const createPost = async (
  data: CreatePostData,
  token: string
): Promise<Post> => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);

    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    if (data.category_ids) {
      data.category_ids.forEach((id) => {
        formData.append("category_ids", id);
      });
    }

    const options = {
      method: "POST",
      url: API_CONFIG.CREATE_POST,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    const response = await axios<any, AxiosResponse<Post>>(options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Failed to create post");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Failed to create post");
    }
  }
};
