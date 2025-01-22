export type CVTranslatorResponse = CVTranslationResult[];

export interface CVTranslationResult {
  cv_data: CvData;
  cv_url: string;
}

export interface CvData {
  name: string;
  linkedin: string;
  professional_summary: string;
  experience: CVTranslatorExperience[];
  education: CVTranslatorEducation[];
  skills: string[];
  projects: CVTranslatorProject[];
}

export interface CVTranslatorExperience {
  start_date: string;
  end_date: string;
  company_name: string;
  role: string;
}

export interface CVTranslatorEducation {
  certificate: string;
  date: string;
  institution: string;
}

export interface CVTranslatorProject {
  title: string;
  description: string;
}
