"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const getTeamMembers = async (token: string | null | undefined) => {
  try {
    const options = {
      method: "GET",
      url: API_CONFIG.GET_TEAM_MEMBERS, // Replace with your API endpoint
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(options);
    return response.data; // Return only the response data for convenience
  } catch (error: any) {
    // Handle errors and return meaningful information
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      // Request was made, but no response received
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      // Something else caused an error
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
