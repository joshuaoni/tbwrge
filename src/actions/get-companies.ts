import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface Company {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  website: string;
  name: string;
  description: string;
  logo: string | null;
}

export const getCompanies = async (token: string) => {
  try {
    const options = {
      method: "GET",
      url: API_CONFIG.GET_COMPANIES,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(options);
    return response.data as Company[];
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
