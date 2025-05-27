import axios, { AxiosResponse } from "axios";
import { API_CONFIG } from "@/constants/api_config";

export interface Tag {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  name: string;
  posts_count: number;
}

export interface GetTagsResponse extends Tag {}

export const getTags = async (
  token: string,
  page: number = 0
): Promise<Tag[]> => {
  try {
    const options = {
      method: "GET",
      url: API_CONFIG.GET_TAGS(page),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios<any, AxiosResponse<GetTagsResponse[]>>(
      options
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to view tags");
      }
      throw new Error(error.response?.data?.message || "Failed to load tags");
    }
    throw error;
  }
};
