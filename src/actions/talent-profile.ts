import { API_CONFIG } from "@/constants/api_config";
import axios, { AxiosError } from "axios";

export interface TalentProfile {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  nationality: string | null;
  country_of_residence: string | null;
  date_of_birth: string;
  linkedin: string;
  current_position: string | null;
  current_company: string | null;
  professional_summary: string;
  years_of_experience: number;
  experience_summary: string;
  skills_summary: string;
  salary_currency: string;
  salary_range_min: number | null;
  salary_range_max: number | null;
  ai_insights: string;
  cv: string;
  cover_letter: string;
  voicenote: string | null;
  profile_photo: string | null;
  strength: string | null;
  areas_for_development: string | null;
  culture_fit: string | null;
  languages: string | null;
  key_skills: string | null;
}

export const getTalentProfile = async (token: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_TALENT_PROFILE,
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Talent profile response:", response.data);
    return response.data as TalentProfile;
  } catch (error) {
    console.error("Error fetching talent profile:", error);
    throw error;
  }
};

export const updateTalentProfile = async (
  token: string,
  data: Partial<TalentProfile>
) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: API_CONFIG.UPDATE_PROFILE,
      headers: { Authorization: `Bearer ${token}` },
      data,
    });

    return response.data as TalentProfile;
  } catch (error) {
    console.error("Error updating talent profile:", error);
    throw error;
  }
};

interface TalentProfileFormData {
  name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  linkedin?: string;
  current_company?: string;
  current_position?: string;
  nationality?: string;
  country_of_residence?: string;
  professional_summary?: string;
  experience_summary?: string;
  skills_summary?: string;
  salary_currency?: string;
  salary_range_min?: number | null;
  salary_range_max?: number | null;
  cv?: File | null;
  cover_letter?: File | null;
  voicenote?: File | null;
  profile_photo?: File | null;
}

export const updateTalentProfileWithFormData = async (
  token: string,
  data: TalentProfileFormData
) => {
  try {
    const formData = new FormData();

    // Add text fields with explicit null handling
    if (data.name !== undefined) formData.append("name", data.name);
    if (data.email !== undefined) formData.append("email", data.email);
    if (data.phone !== undefined) formData.append("phone", data.phone);
    if (
      data.date_of_birth !== undefined &&
      data.date_of_birth !== "null" &&
      data.date_of_birth !== ""
    ) {
      formData.append("date_of_birth", data.date_of_birth);
    }
    if (data.linkedin !== undefined)
      formData.append(
        "linkedin",
        data.linkedin === "null" ? "" : data.linkedin
      );

    // Handle fields that can be null
    if (data.current_company !== undefined) {
      formData.append(
        "current_company",
        data.current_company === "null" ? "" : data.current_company || ""
      );
    }
    if (data.current_position !== undefined) {
      formData.append(
        "current_position",
        data.current_position === "null" ? "" : data.current_position || ""
      );
    }
    if (data.nationality !== undefined) {
      formData.append(
        "nationality",
        data.nationality === "null" ? "" : data.nationality || ""
      );
    }
    if (data.country_of_residence !== undefined) {
      formData.append(
        "country_of_residence",
        data.country_of_residence === "null"
          ? ""
          : data.country_of_residence || ""
      );
    }

    // Handle summary fields
    if (data.professional_summary !== undefined) {
      formData.append(
        "professional_summary",
        data.professional_summary === "null" ? "" : data.professional_summary
      );
    }
    if (data.experience_summary !== undefined) {
      formData.append(
        "experience_summary",
        data.experience_summary === "null" ? "" : data.experience_summary || ""
      );
    }
    if (data.skills_summary !== undefined) {
      formData.append(
        "skills_summary",
        data.skills_summary === "null" ? "" : data.skills_summary || ""
      );
    }

    // Handle salary fields
    if (data.salary_currency !== undefined) {
      formData.append("salary_currency", data.salary_currency);
    }
    if (data.salary_range_min !== undefined) {
      formData.append(
        "salary_range_min",
        data.salary_range_min !== null ? data.salary_range_min.toString() : ""
      );
    }
    if (data.salary_range_max !== undefined) {
      formData.append(
        "salary_range_max",
        data.salary_range_max !== null ? data.salary_range_max.toString() : ""
      );
    }

    // Add file fields
    if (data.cv) formData.append("cv", data.cv);
    if (data.cover_letter) formData.append("cover_letter", data.cover_letter);
    if (data.voicenote) formData.append("voicenote", data.voicenote);
    if (data.profile_photo)
      formData.append("profile_photo", data.profile_photo);

    // Log form data for debugging
    console.log("Form data being sent:", Object.fromEntries(formData));

    const response = await axios({
      method: "POST",
      url: API_CONFIG.UPDATE_TALENT_PROFILE,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return response.data as TalentProfile;
  } catch (error: unknown) {
    console.error("Error updating talent profile with form data:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Response status:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
        console.error("Response headers:", axiosError.response.headers);
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
      }
    } else {
      console.error("Error message:", String(error));
    }
    throw error;
  }
};
