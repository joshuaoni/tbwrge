"use client";

import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const getAppliedJobItems = async (token: string): Promise<string[]> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_APPLIED_JOB_IDS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
