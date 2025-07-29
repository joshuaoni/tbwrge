import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface AISearchJob {
  company_name: string;
  job_title: string;
  location: string;
  url: string;
  language: string;
  skills: string[];
}

export interface AISearchPayload {
  country: string;
  job_title: string;
}

export const searchJobs = async (
  token: string,
  payload: AISearchPayload
): Promise<AISearchJob[]> => {
  const response = await axios({
    method: "POST",
    url: API_CONFIG.AI_SEARCH_JOBS,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });

  return response.data;
};
