"use client";
import { API_CONFIG } from "@/constants/api_config";
import { useUserStore } from "@/hooks/use-user-store";
import axios from "axios";

export const createJob = async ({
  company_website,
  company_description,
  company_logo,
  company_name,
  job_title,
  start_date,
  end_date,
  job_type,
  job_description,
  required_skills,
  educational_requirements,
  additional_benefits,
  languages,
  country_of_residence,
  years_of_experience_required,
  job_location_name,
  salary_range_min,
  salary_range_max,
  filter_out_salary_range,
  require_cv,
  require_cover_letter,
  require_voicenote,
  visibility_public,
  visibility_private,
  tags,
  hide_personal_details_during_screening,
  job_questions,
  token,
}: {
  company_website: string;
  company_description: string;
  company_name: string;
  company_logo: any;
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
  years_of_experience_required: number;
  job_location_name: string;
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
  job_questions: string[];
  token: string;
}) => {
  try {
    const options = {
      method: "POST",
      url: API_CONFIG.CREATE_JOB, // Replace with your API endpoint
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        company_website,
        company_name,
        company_description,
        company_logo,
        job_title,
        start_date,
        end_date,
        job_type,
        job_description,
        required_skills,
        educational_requirements,
        additional_benefits,
        languages,
        country_of_residence,
        years_of_experience_required,
        job_location_name,
        salary_range_min,
        salary_range_max,
        filter_out_salary_range,
        require_cv,
        require_cover_letter,
        require_voicenote,
        visibility_public,
        visibility_private,
        tags,
        hide_personal_details_during_screening,
        job_questions,
      }),
    };

    const response = await axios(options);
    return response.data; // Return only the response data for convenience
  } catch (error: any) {
    // Handle errors and return meaningful information
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      // Request was made, but no response received
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      // Something else caused an error
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
