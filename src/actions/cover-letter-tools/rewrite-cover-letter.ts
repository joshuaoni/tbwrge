"use client";
import { API_CONFIG } from "@/constants/api_config";
import { useUserStore } from "@/hooks/use-user-store";
import axios from "axios";

export const rewriteCoverLetter = async (
  cv: File[],
  language: string,
  prompts: string[],
  token: any
) => {
  let formData = new FormData();
  if (cv) {
    for (let i = 0; i < cv.length; i++) {
      const file = cv[i];
      formData.append("file", file);
    }
  }
  formData.append("language", language);
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("job_ad", tag);
    });
  }

  try {
    const options = {
      method: "POST",
      url: API_CONFIG.REWRITE_COVER_LETTER, // Replace with your API endpoint
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
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
