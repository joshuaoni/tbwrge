import axios from "axios";
import { API_CONFIG } from "@/constants/api_config";

export const screenInterviewQuestions = async (
  files: File[],
  language: string,
  token: string,
  screeningQuestions: string,
  jobAd: string
) => {
  const formData = new FormData();
  
  // Append files if they exist
  if (files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  // Remove any HTML tags from the rich text editor content
  const cleanScreeningQuestions = screeningQuestions.replace(/<[^>]*>/g, '');
  const cleanJobAd = jobAd.replace(/<[^>]*>/g, '');

  // Append other data
  formData.append("language", language);
  formData.append("screening_questions", cleanScreeningQuestions);
  formData.append("job_ad", cleanJobAd);

  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.SCREEN_INTERVIEW_QUESTION,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (!response.data) {
      throw new Error("No data received from server");
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with an error
      const errorMessage = error.response.data?.message || "Server error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response received from server. Please try again.");
    } else {
      // Error setting up the request
      throw new Error("Failed to send request. Please check your connection.");
    }
  }
};