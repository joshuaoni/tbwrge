"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const generateCV = async (
  token: string,
  prompts: string[],
  language: string,
  audio?: any
) => {
  const formData = new FormData();
  formData.append("language", language);
  if (audio) {
    formData.append("audio", audio);
  }
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("texts", tag);
    });
  }
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.GENERATE_CV,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    console.log({ response });
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
