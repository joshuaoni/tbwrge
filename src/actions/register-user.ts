"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const registerUser = async ({
  fullName,
  email,
  password,
  role,
  channel = "others",
}: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  channel?: string;
}) => {
  try {
    const options = {
      method: "POST",
      url: API_CONFIG.REGISTER_USER, // Replace with your API endpoint
      headers: { "Content-Type": "application/json" },
      data: {
        email,
        password,
        name: fullName,
        role: role == "Employer" ? "recruiter" : "candidate",
        channel,
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
