"use client";

import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface AppliedJob {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  fit_score: number;
  status: string;
  skills_summary: string;
  strength: string;
  areas_for_development: string;
  culture_fit: string | null;
  languages: string;
  key_skills: number;
  screening_fit_score: number;
  screening_ai_insights: string;
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
    phone: string | null;
    nationality: string | null;
    country_of_residence: string;
    date_of_birth: string;
    linkedin: string | null;
    current_position: string | null;
    current_company: string | null;
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
  };
  application_answers: Array<{
    id: string;
    reference: string | null;
    created_at: string;
    updated_at: string;
    question: {
      id: string;
      reference: string | null;
      created_at: string;
      updated_at: string;
      is_screening: boolean;
      text: string;
    };
    text: string;
  }>;
  job: {
    company_website: string;
    company_name: string;
    company_description: string;
    job_title: string;
    start_date: string;
    end_date: string;
    job_type: string;
    job_description: string;
    required_skills: string;
    educational_requirements: string;
    additional_benefits: string;
    languages: string;
    country_of_residence: string;
    years_of_experience_required: string;
    job_location_name: string;
    salary_currency: string;
    salary_range_min: number;
    salary_range_max: number;
    filter_out_salary_range: boolean;
    require_cv: boolean;
    require_cover_letter: boolean;
    require_voicenote: boolean;
    visibility_public: boolean;
    visibility_private: boolean;
    tags: string;
    hide_personal_details_during_screening: boolean;
    minimum_fit_score: number;
    filter_minimum_fit_score: boolean;
    status: string;
    auto_send_interview_mail_on_close: boolean;
    candidate_interview_count: number;
    interview_link: string;
    company_id: string;
    recruiter_id: string;
    id: string;
    reference: string;
    created_at: string;
    updated_at: string;
    total_applicants: number;
    user: {
      id: string;
      reference: string | null;
      created_at: string;
      updated_at: string;
      deleted: boolean;
      name: string;
      last_name: string;
      profile_picture: string;
      email: string;
      role: string;
      is_verified: boolean;
      channel: string;
      country_code: string;
      phone: string;
      calendly_link: string | null;
      google_calender_link: string | null;
      username: string | null;
      location: string;
      last_login: string;
      joined_talent_pool: boolean;
      suspend: boolean;
    };
    company_logo: string | null;
    questions: Array<{
      id: string;
      reference: string | null;
      created_at: string;
      updated_at: string;
      is_screening: boolean;
      text: string;
    }>;
  };
}

export const getAppliedJobs = async (
  token: string,
  page: number = 0
): Promise<AppliedJob[]> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_APPLIED_JOBS(page),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
