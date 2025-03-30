export type IGetJobOpenJobType =
  | "full_time"
  | "part_time"
  | "hybrid"
  | "internship";

export interface IGetJobOpenRes {
  id: string;
  company_logo?: string;
  job_title: string;
  company_name: string;
  job_location_name: string;
  start_date: string;
  job_type: string;
  required_skills: string;
  languages: string;
  tags: string;
  company_description: string;
  job_description: string;
  educational_requirements: string;
  additional_benefits: string;
  years_of_experience_required: string;
  salary_range_min: number | null;
  salary_range_max: number | null;
  salary_currency: string | null;
  created_at: string;
  questions: { id: string; text: string; is_screening: boolean }[];
}
