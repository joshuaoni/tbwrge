import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "@/constants/api_config";

export interface User {
  id: number;
  name: string;
  last_name: string;
  profile_picture?: string;
}

export interface Post {
  id: number;
  created_at: string;
  title: string;
  text: string;
  upvotes: number;
  comments: number;
  user: User;
  reacted: boolean;
}

export interface GetPostsResponse extends Post {}

export const getPosts = async (
  token: string,
  page: number = 0
): Promise<Post[]> => {
  try {
    console.log({ token });
    const options = {
      method: "POST",
      url: API_CONFIG.GET_POSTS(page),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios<any, AxiosResponse<GetPostsResponse[]>>(
      options
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to view posts");
      }
      throw new Error(error.response?.data?.message || "Failed to load posts");
    }
    throw error;
  }
};
