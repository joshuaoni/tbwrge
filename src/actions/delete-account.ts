import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const deleteTeamMember = async (token: string, userId: string) => {
  try {
    const options = {
      method: "DELETE",
      url: API_CONFIG.DELETE_TEAM_MEMBER(userId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.detail || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

export const deleteAccount = async (token: string) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: API_CONFIG.DELETE_ACCOUNT,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.detail || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
