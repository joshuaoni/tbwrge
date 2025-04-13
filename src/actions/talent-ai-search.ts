import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface TalentAISearchItem {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  country_of_residence: string;
  date_of_birth: string;
  linkedin: string;
  current_position: string;
  current_company: string;
  professional_summary: string;
  years_of_experience: number;
  experience_summary: string;
  skills_summary: string;
  salary_currency: string;
  salary_range_min: number;
  salary_range_max: number;
  ai_insights: string;
  cv: string;
  cover_letter: string;
  voicenote: string;
  profile_photo: string;
  strength: string;
  areas_for_development: string;
  culture_fit: string;
  languages: string;
  key_skills: number;
}

export interface TalentAISearchRequest {
  text: string;
}

export const talentAISearch = async (
  token: string,
  request: TalentAISearchRequest,
  page: number = 0
) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.TALENT_AI_SEARCH(page),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: request,
    });

    console.log("ai-search", { response });
    return response.data as TalentAISearchItem[];
  } catch (error) {
    console.error("Error performing AI search:", error);
    throw error;
  }
};
