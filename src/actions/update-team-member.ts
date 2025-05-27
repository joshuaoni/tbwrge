import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface UpdateTeamMemberRequest {
  permission?: "admin" | "recruiter" | "tools" | "content";
  accepted?: boolean;
  suspended?: boolean;
}

interface UpdateTeamMemberResponse {
  message: string;
}

export const updateTeamMember = async (
  memberId: string,
  data: UpdateTeamMemberRequest,
  token: string
): Promise<UpdateTeamMemberResponse> => {
  try {
    console.log(data);
    const response = await axios.put(
      API_CONFIG.UPDATE_TEAM_MEMBER(memberId),
      data,
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
        throw new Error("Please sign in to update team members");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update team member"
      );
    }
    throw error;
  }
};
