import { ReactNode } from "react";

export interface IJob {
  company_website: null | string;
  company_name: null | string;
  company_description: null | string;
  job_title: null | string;
  start_date: Date | null;
  end_date: Date | null;
  job_type: null | string;
  job_description: null | string;
  required_skills: null | string;
  educational_requirements: null | string;
  additional_benefits: null | string;
  languages: null | string;
  country_of_residence: null | string;
  years_of_experience_required: null | string;
  job_location_name: null | string;
  salary_currency: null;
  salary_range_min: number | null;
  salary_range_max: number | null;
  filter_out_salary_range: boolean;
  require_cv: boolean;
  require_cover_letter: boolean;
  require_voicenote: boolean;
  visibility_public: boolean;
  visibility_private: boolean;
  tags: null | string;
  hide_personal_details_during_screening: boolean;
  minimum_fit_score: number;
  filter_minimum_fit_score: boolean;
  status: string;
  id: string;
  reference: string;
  created_at: Date;
  updated_at: Date;
  total_applicants: number;
  user: User;
  company_logo: null;
  questions: Question[];
}

export interface Question {
  id: string;
  reference: null;
  created_at: Date;
  updated_at: Date;
  text: string;
}

export interface User {
  id: string;
  reference: null;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  channel: string;
}
