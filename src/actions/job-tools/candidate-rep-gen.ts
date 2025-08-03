"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const generateCandidateReport = async (
  cv: any,
  jobAd: string,
  language: string,
  prompts: string[],
  token: any
) => {
  const formData = new FormData();

  if (cv) {
    for (let i = 0; i < cv.length; i++) {
      const file = cv[i];
      formData.append("cvs", file);
    }
  }
  if (prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      formData.append("prompts", tag);
    });
  } else {
    formData.append("prompts", "");
  }
  formData.append("language", language);
  formData.append("job_ad", jobAd);

  console.log({
    prompts: formData.get("prompts"),
    jobAd: formData.get("job_ad"),
    language: formData.get("language"),
    cv: formData.get("cvs"),
  });

  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.GET_CANDIDATE_REPORT,
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
