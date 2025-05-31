import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface TalentItem {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  date_of_birth: string;
  linkedin: string;
  current_position: string;
  current_company: string;
  professional_summary: string;
  years_of_experience: number;
  country_of_residence: string;
  skills_summary: string;
  strength: string;
  areas_for_development: string;
  culture_fit: string;
  languages: string;
  key_skills: number;
  cv: string;
  cover_letter: string;
}

export const getTalents = async (
  token: string,
  query: { page: string; text: string; search_type: string }
) => {
  const queryParams = new URLSearchParams(query);

  const response = await axios({
    method: "GET",
    url: `${API_CONFIG.GET_TALENTS}?${queryParams.toString()}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("talents: ", { response });
  return response.data;
};

export const getPublicTalents = async (page: number = 0) => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_TALENTS_PUBLIC(page),
  });
  console.log("public-talents: ", { response });
  return response.data;
};

export const getTalentItem = async (token: string, talent_id: string) => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_TALENT_ITEM(talent_id),
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("talent-item", { response });
  return response.data;
};

interface ProfileStatsRequest {
  start: string;
  end: string;
  token: string;
}

interface ProfileStatsResponse {
  search: number;
  profile_view: number;
  cv_view: number;
  cover_letter_view: number;
  audio_play: number;
  visibility_score: number;
  profile_recommendations: string;
  viewer_position: string[];
  viewer_location: string[];
  ai_tool_suggestions: string[];
}

export const getProfileStats = async (
  data: ProfileStatsRequest
): Promise<ProfileStatsResponse> => {
  console.log({ data });
  try {
    const response = await fetch(API_CONFIG.GET_PROFILE_STATS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile stats");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile stats:", error);
    throw error;
  }
};
