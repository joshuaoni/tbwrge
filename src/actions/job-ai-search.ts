import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";
import { IGetJobOpenRes } from "./get-jobs-open";

export interface JobAISearchRequest {
  text: string;
}

export const jobAISearch = async (
  token: string,
  request: JobAISearchRequest,
  page: number = 0
) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.JOB_AI_SEARCH(page),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: request,
    });

    console.log("job-ai-search", { response });
    return response.data as IGetJobOpenRes[];
  } catch (error) {
    console.error("Error performing job AI search:", error);
    throw error;
  }
};
