import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface JoinTalentPoolResponse {
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

export interface JoinTalentPoolData {
  name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  linkedin?: string;
  current_company?: string;
  current_position?: string;
  nationality?: string;
  country_of_residence?: string;
  experience_summary: string;
  skills_summary: string;
  salary_range_min?: number;
  salary_range_max?: number;
  salary_currency?: string;
  cv: File;
  cover_letter?: File;
  voicenote?: File;
  profile_photo?: File;
}

export interface JoinTalentPoolParams {
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  linkedin: string;
  current_position: string;
  current_company: string;
  nationality: string;
  country_of_residence: string;
  professional_summary: string;
  skills_summary: string;
  languages: string;
  salary_range: {
    min: number;
    max: number;
    currency: string;
  };
  cv: File;
  cover_letter?: File;
  voicenote?: File;
  profile_photo?: File;
}

export const joinTalentPool = async (
  token: string,
  data: JoinTalentPoolData
) => {
  const formData = new FormData();

  // Required fields
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("experience_summary", data.experience_summary);
  formData.append("skills_summary", data.skills_summary);
  formData.append("cv", data.cv);

  // Optional fields
  if (data.phone) formData.append("phone", data.phone);
  if (data.date_of_birth) formData.append("date_of_birth", data.date_of_birth);
  if (data.linkedin) formData.append("linkedin", data.linkedin);
  if (data.current_company)
    formData.append("current_company", data.current_company);
  if (data.current_position)
    formData.append("current_position", data.current_position);
  if (data.nationality) formData.append("nationality", data.nationality);
  if (data.country_of_residence)
    formData.append("country_of_residence", data.country_of_residence);
  if (data.salary_range_min)
    formData.append("salary_range_min", data.salary_range_min.toString());
  if (data.salary_range_max)
    formData.append("salary_range_max", data.salary_range_max.toString());
  if (data.salary_currency)
    formData.append("salary_currency", data.salary_currency);
  if (data.cover_letter) formData.append("cover_letter", data.cover_letter);
  if (data.voicenote) formData.append("voicenote", data.voicenote);
  if (data.profile_photo) formData.append("profile_photo", data.profile_photo);

  console.log({ formData });

  const response = await axios({
    method: "POST",
    url: API_CONFIG.JOIN_TALENT_POOL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  console.log({ response });
  return response.data as JoinTalentPoolResponse;
};
