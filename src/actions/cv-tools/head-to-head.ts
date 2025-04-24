"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const headToHead = async (
  cv: any[],
  language: string,
  token: string,
  prompts: string[],
  jobDescription: string
) => {
  const formData = new FormData();
  if (cv) {
    for (let i = 0; i < cv.length; i++) {
      const file = cv[i];
      formData.append("uploaded_files", file);
    }
  }
  formData.append("language", language);
  formData.append("job_description", jobDescription);
  if (prompts.length !== 0) {
    console.log("prompts", prompts);
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("additional_info", tag);
    });
  } else {
    formData.append("additional_info", "");
  }
  console.log("additional_info", formData.get("additional_info"));
  console.log("job_description", formData.get("job_description"));
  console.log("language", formData.get("language"));
  console.log("uploaded_files", formData.get("uploaded_files"));
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.HEAD_TO_HEAD,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    console.log(response.data);
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
