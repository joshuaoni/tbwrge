import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface AdminStats {
  users: number;
  docs: number;
  support: number;
  feedback: number;
  churn: number;
  revenue: number;
  open_support: number;
  closed_support: number;
  open_feedback: number;
  closed_feedback: number;
}

export interface AdminUser {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  last_name: string | null;
  profile_picture: string | null;
  email: string;
  role: string | null;
  is_verified: boolean;
  channel: string | null;
  country_code: string | null;
  phone: string | null;
  calendly_link: string | null;
  google_calender_link: string | null;
  username: string | null;
  location: string | null;
  last_login: string | null;
  joined_talent_pool: boolean;
}

export interface UpdateAdminUserRequest {
  name?: string;
  last_name?: string;
  phone?: string;
  user_class?: string;
  country_code?: string;
  calendly_link?: string;
  google_calender_link?: string;
  username?: string;
  location?: string;
  suspend?: boolean;
}

export const getAdminStats = async (token: string): Promise<AdminStats> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_ADMIN_STATS,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};

export const getAdminUsers = async (
  token: string,
  search_term?: string
): Promise<AdminUser[]> => {
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.GET_ADMIN_USERS(search_term || ""),
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin users:", error);
    throw error;
  }
};

export const deleteAdminUser = async (
  token: string,
  userId: string
): Promise<void> => {
  try {
    await axios({
      method: "DELETE",
      url: API_CONFIG.DELETE_USER_ADMIN(userId),
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting admin user:", error);
    throw error;
  }
};

export const updateAdminUser = async (
  token: string,
  userId: string,
  data: UpdateAdminUserRequest
): Promise<AdminUser> => {
  try {
    console.log({ data });
    const response = await axios({
      method: "PUT",
      url: API_CONFIG.UPDATE_USER_ADMIN(userId),
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
    console.log({ response });
    return response.data;
  } catch (error) {
    console.error("Error updating admin user:", error);
    throw error;
  }
};
