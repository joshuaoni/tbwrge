export type CVRewriterResponse = IRewriter[];

export interface IRewriter {
  cv_data: CvData;
  cv_url: string;
}

export interface CvData {
  name: string;
  linkedin: string;
  professional_summary: string;
  experience: Experience[];
  education: Education[];
  skills: any[];
  projects: Project[];
}

export interface Experience {
  start_date: string;
  end_date: string;
  company_name: string;
  role: string;
}

export interface Education {
  certificate: string;
  date: string;
  institution: string;
}

export interface Project {
  title: string;
  description: string;
}
