"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const generateCoverLetter = async (
  files: any,
  audio: any,
  token: string,
  prompts: string[],
  language: string,
  jobDescription: string
) => {
  const formData = new FormData();
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i].file;
      formData.append("cv_files", file);
    }
  }
  if (audio) {
    formData.append("audio", audio);
  }
  if (jobDescription) {
    formData.append("job_ad", jobDescription);
  }
  formData.append("language", language);
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("additional_prompts", tag);
    });
  }
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.GENERATE_COVER_LETTER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    console.log("cl generator response", response.data);
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
