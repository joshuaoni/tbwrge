import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface BlogUser {
  name: string;
  photo: string | null;
  job_title: string | null;
  company: string | null;
}

export interface BlogItem {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  user: BlogUser;
  title: string;
  slug: string;
  content: string;
  image: string;
  views: number;
  shares: number;
}

export const getBlogs = async (token: string) => {
  const response = await axios({
    method: "POST",
    url: API_CONFIG.GET_BLOGS,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBlogItem = async (token: string, blog_id: string) => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_ONE_BLOG(blog_id),
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createBlog = async (token: string, formData: FormData) => {
  const response = await axios({
    method: "POST",
    url: API_CONFIG.CREATE_BLOG,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const updateBlog = async (
  token: string,
  blog_id: string,
  data: { approve_guest_post: boolean }
) => {
  const formData = new FormData();
  formData.append("approve_guest_post", "true");

  const response = await axios({
    method: "PUT",
    url: API_CONFIG.UPDATE_BLOG(blog_id),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};
