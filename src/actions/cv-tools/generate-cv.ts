"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const generateCV = async (
  token: string,
  prompts: string[],
  audio?: any
) => {
  const formData = new FormData();
  if (audio) {
    formData.append("audio", audio);
  }
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("text", tag);
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
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
