import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface JobApplicationResponse {
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
  cv: string | null;
  cover_letter: string | null;
  voicenote: string | null;
  applicant: {
    id: string;
    reference: string;
    created_at: string;
    updated_at: string;
    name: string;
    email: string;
    phone: string | null;
    nationality: string | null;
    date_of_birth: string | null;
    linkedin: string | null;
    current_position: string | null;
    current_company: string | null;
    professional_summary: string | null;
    years_of_experience: number | null;
    country_of_residence: string | null;
  };
  application_answers: any[];
}

export interface JobApplicationFormData {
  name: string;
  email: string;
  phone?: string;
  nationality?: string;
  country_of_residence?: string;
  date_of_birth?: string;
  linkedin?: string;
  current_company?: string;
  professional_summary?: string;
  years_of_experience?: number;
  current_position?: string;
  experience: string;
  skills: string;
  cv?: File;
  cover_letter?: File;
  voicenote?: File;
  job_id: string;
  answers?: { question_id: string; answer: string }[];
}

export const submitJobApplication = async (
  token: string,
  formData: JobApplicationFormData
): Promise<JobApplicationResponse> => {
  try {
    const data = new FormData();

    // Add required fields
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("experience", formData.experience);
    data.append("skills", formData.skills);

    // Add optional fields if they exist
    if (formData.phone) data.append("phone", formData.phone);
    if (formData.nationality) data.append("nationality", formData.nationality);
    if (formData.country_of_residence)
      data.append("country_of_residence", formData.country_of_residence);
    if (formData.date_of_birth)
      data.append("date_of_birth", formData.date_of_birth);
    if (formData.linkedin) data.append("linkedin", formData.linkedin);
    if (formData.current_company)
      data.append("current_company", formData.current_company);
    if (formData.professional_summary)
      data.append("professional_summary", formData.professional_summary);
    if (formData.years_of_experience)
      data.append(
        "years_of_experience",
        formData.years_of_experience.toString()
      );
    if (formData.current_position)
      data.append("current_position", formData.current_position);

    // Add files if they exist
    if (formData.cv) data.append("cv", formData.cv);
    if (formData.cover_letter)
      data.append("cover_letter", formData.cover_letter);
    if (formData.voicenote) data.append("voicenote", formData.voicenote);

    // Add answers if they exist
    if (formData.answers && formData.answers.length > 0) {
      formData.answers.forEach((answer, index) => {
        data.append(`answers[${index}][question_id]`, answer.question_id);
        data.append(`answers[${index}][answer]`, answer.answer);
      });
    }

    // Get the correct API endpoint URL by passing the job_id
    const apiUrl = API_CONFIG.SUBMIT_JOB_APPLICATION(formData.job_id);

    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting job application:", error);
    throw error;
  }
};
