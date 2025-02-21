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
  return response.data;
};

export const getTalentItem = async (token: string, talent_id: string) => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_TALENT_ITEM(talent_id),
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
