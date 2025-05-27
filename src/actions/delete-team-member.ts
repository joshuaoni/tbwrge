import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface DeleteTeamMemberResponse {
  message: string;
}

export const deleteTeamMember = async (
  memberId: string,
  token: string
): Promise<DeleteTeamMemberResponse> => {
  try {
    const response = await axios.delete(
      API_CONFIG.DELETE_TEAM_MEMBER(memberId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Please sign in to delete team members");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete team member"
      );
    }
    throw error;
  }
};
