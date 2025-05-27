import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const generateInterviewQuestions = async (
  files: File[],
  language: string,
  token: string,
  jobDescription?: string
) => {
  const formData = new FormData();

  // Append files if they exist
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("ad_file", files[i]);
    }
  }

  // Append language selection
  formData.append("language", language);
  if (jobDescription) {
    formData.append("job_ad", jobDescription);
  }

  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.INTERVIEW_QUESTION_GEN,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    console.log({ response });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Servzer error occurred");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
