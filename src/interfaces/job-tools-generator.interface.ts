export interface JobPostGeneratorResponse {
  company_website: string;
  company_name: string;
  company_description: string;
  job_title: string;
  start_date: any;
  end_date: any;
  job_type: string;
  job_description: string;
  required_skills: string;
  educational_requirements: string;
  additional_benefits: string;
  languages: any;
  country_of_residence: any;
  years_of_experience_required: string;
  job_location_name: string;
  salary_currency: any;
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
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  total_applicants: number;
  user: JobPostUser;
  company_logo: string;
  questions: any[];
}

export interface JobPostUser {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  channel: string;
  last_name: any;
  country_code: any;
  phone: any;
  profile_picture: any;
}
