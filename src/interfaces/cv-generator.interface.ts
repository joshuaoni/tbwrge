export interface ResumeProps {
  name: string;
  title: string;
  contactInfo: ContactInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
}

interface WorkExperience {
  role: string;
  company_name: string;
  start_date: string;
  end_date: string;
  description?: string;
}

interface Education {
  certificate: string;
  institution: string;
  date: string;
}

export interface CVGeneratorResponse {
  cv_data: CvData;
  cv_url: string;
}

export interface CvData {
  name: string;
  linkedin: string;
  professional_summary: string;
  experience: CVGeneratorExperience[];
  education: CVGeneratorEducation[];
  skills: string[];
  projects: CVGeneratorProject[];
}

export interface CVGeneratorExperience {
  start_date: string;
  end_date: string;
  company_name: string;
  role: string;
}

export interface CVGeneratorEducation {
  certificate: string;
  date: string;
  institution: string;
}

export interface CVGeneratorProject {
  title: string;
  description: string;
}
