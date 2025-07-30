"use client";
import { API_CONFIG } from "@/constants/api_config";
import { useUserStore } from "@/hooks/use-user-store";
import axios from "axios";

export const translateCV = async (cv: File[], language: string, token: any) => {
  let formData = new FormData();
  if (cv) {
    for (let i = 0; i < cv.length; i++) {
      const file = cv[i];
      formData.append("cv_files", file);
    }
  }
  formData.append("language", language);

  try {
    const options = {
      method: "POST",
      url: API_CONFIG.TRANSLATE_CV, // Replace with your API endpoint
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    const response = await axios(options);
    console.log(response.data);
    return response.data; // Return only the response data for convenience
  } catch (error: any) {
    // Handle errors and return meaningful information
    if (error.response) {
      // Handle 402 Payment Required specifically
      if (error.response.status === 402) {
        throw new Error("PAYMENT_REQUIRED");
      }

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
