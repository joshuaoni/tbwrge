import CreateJobCompanyDetails from "@/components/dashboard/create-job/company-details";
import CreateJobHiringFlow from "@/components/dashboard/create-job/hiring-flow";
import CreateJobJobDetails from "@/components/dashboard/create-job/job-details";
import CreateJobOverview from "@/components/dashboard/create-job/overview";
import CreateJobScreening from "@/components/dashboard/create-job/screening";

export const createJobScreens = {
  intro: CreateJobCompanyDetails,
  job: CreateJobJobDetails,
  hiring: CreateJobHiringFlow,
  screening: CreateJobScreening,
  overview: CreateJobOverview,
};

export const INITIAL_CREATE_JOB_FORM_DATA = {
  job_title: "",
  company_website: "",
  company_name: "",
  company_description: "",
  company_logo: null as File | null,
  job_description: "",
  minimum_fit_score: 0,
  required_skills: "",
  additional_benefits: "",
  educational_requirements: "",
  years_of_experience_required: "",
  job_type: "full_time",
  job_location: "",
  languages: "",
  job_tags: "",
  recruiter_calendar_booking_link: "",
  start_date: "",
  end_date: "",
  salary_range_min: 0,
  salary_range_max: 0,
  filter_out_salary_range: false,
  auto_send_interview_email: false,
  require_cv: false,
  require_cover_letter: false,
  voicenote_recording: false,
  job_visibility: true,
  hide_candidates_personal_details: false,
  job_id: null as string | null,
};

export const INITIAL_HIRING_FLOW_STATE = {
  secondStep: "",
  thirdStep: "",
  fourthStep: "",
};
