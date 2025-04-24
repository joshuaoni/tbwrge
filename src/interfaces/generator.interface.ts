import { ForwardRefExoticComponent, RefAttributes } from "react";

export type CoverLetterGeneratorResponse = CoverLetterGenerator[];

export interface CoverLetterGenerator {
  candidate_address?: string;
  candidate_name: string;
  company?: string;
  company_address?: string;
  cover_letter_text: string;
}

export interface CoverLetterProps {
  name: string;
  letter: string;
}

export interface TemplateWrapperProps {
  template: ForwardRefExoticComponent<
    { data?: CoverLetterGenerator } & RefAttributes<HTMLDivElement>
  >;
  data?: CoverLetterGenerator;
}
