"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const summarizeCV = async (
  cv: any[],
  language: string,
  token: string,
  prompts: string[],
  jobDescription: string
) => {
  const formData = new FormData();
  if (cv) {
    for (let i = 0; i < cv.length; i++) {
      const file = cv[i].file;
      formData.append("cv", file);
    }
  }
  formData.append("language", language);
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("prompts[]", tag);
    });
  }
  if (jobDescription) {
    formData.append("job_ad", jobDescription);
  }
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.SUMMARIZE_CV,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Handle 402 Payment Required specifically
      if (error.response.status === 402) {
        throw new Error("PAYMENT_REQUIRED");
      }

      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
