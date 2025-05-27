export interface JobPostGeneratorResponse {
  job_title: string | null;
  location: string | null;
  company: string | null;
  employment_type: string | null;
  experience: string | null;
  about_us: string | null;
  responsibilities: string[];
  requirements: string[];
  what_we_offer: string[];
  how_to_apply: string | null;
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
