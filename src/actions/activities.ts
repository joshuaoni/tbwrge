import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface ActivityJob {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  company_website: string;
  company_name: string;
  company_description: string;
  job_title: string;
  job_type: string;
  job_description: string;
}

export interface ActivityItem {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  job: ActivityJob;
  type: string;
  text: string;
}

export const getActivities = async (token: string): Promise<ActivityItem[]> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_ACTIVITIES,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    // Handle errors and return meaningful information
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.detail || "Server error occurred");
    } else if (error.request) {
      // Request was made, but no response received
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      // Something else caused an error
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
