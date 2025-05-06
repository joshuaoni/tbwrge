"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface ProfileResponse {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  name: string;
  last_name: string;
  profile_picture: string;
  email: string;
  role: string;
  is_verified: boolean;
  channel: string;
  country_code: string;
  phone: string;
  calendly_link: string;
  google_calender_link: string;
  username: string;
  location: string;
  last_login: string;
  joined_talent_pool: boolean;
}

export const getProfile = async (token: string | null | undefined) => {
  try {
    const options = {
      method: "GET",
      url: API_CONFIG.GET_PROFILE,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(options);
    console.log("profile response", response.data);
    return response.data as ProfileResponse;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.detail || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
