export interface ICandidate {
  id: string;
  reference: string;
  created_at: Date;
  updated_at: Date;
  fit_score: number;
  years_of_experience: number;
  key_skills: number;
  experience: string;
  skills: string;
  cv: string;
  cover_letter: string;
  voicenote: string;
  applicant: Applicant;
  application_answers: ApplicationAnswer[];
}

export interface Applicant {
  id: string;
  reference: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  country_of_residence: string;
}

export interface ApplicationAnswer {
  id: string;
  reference: string;
  created_at: Date;
  updated_at: Date;
  question?: ApplicationAnswer;
  text: string;
}
