"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios, { formToJSON } from "axios";

export const vetJob = async (
  cv: any[],
  language: string,
  token: string,
  prompts: string[],
) => {
  console.log(cv, language, token, prompts);
  const formData = new FormData();
  if (cv) {
    for (let i = 0; i < cv.length; i++) {
      const file = cv[i];
      formData.append("files", file);
    }
  }
  formData.append("language", language);
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((prompt: any) => {
      formData.append("additional_prompts", prompt);
    });
  }
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.VET_JOB,
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
