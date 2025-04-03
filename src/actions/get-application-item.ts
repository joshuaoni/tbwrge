import axios from "axios";
import { API_CONFIG } from "@/constants/api_config";

export interface ApplicationItem {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  fit_score: number;
  status: string;
  skills_summary: string;
  strength: string;
  areas_for_development: string;
  culture_fit: string;
  languages: string;
  key_skills: number;
  screening_fit_score: number;
  screening_ai_insights: string | null;
  experience: string;
  skills: string;
  cv: string;
  cover_letter: string;
  voicenote: string | null;
  applicant: {
    id: string;
    reference: string;
    created_at: string;
    updated_at: string;
    name: string;
    email: string;
    phone: string;
    nationality: string;
    date_of_birth: string | null;
    linkedin: string | null;
    current_position: string;
    current_company: string;
    professional_summary: string;
    years_of_experience: number;
    country_of_residence: string;
  };
  application_answers: any[];
}

export const getApplicationItem = async (
  token: string,
  applicationId: string
): Promise<ApplicationItem> => {
  try {
    const response = await axios.get(
      API_CONFIG.GET_APPLICATION_ITEM(applicationId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching application item:", error);
    throw error;
  }
};
