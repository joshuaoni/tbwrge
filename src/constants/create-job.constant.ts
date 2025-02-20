import CreateJobCompanyDetails from "@/components/dashboard/create-job/company-details";
import CreateJobHiringFlow from "@/components/dashboard/create-job/hiring-flow";
import CreateJobJobDetails from "@/components/dashboard/create-job/job-details";
import CreateJobScreening from "@/components/dashboard/create-job/screening";

export const createJobScreens = {
  intro: CreateJobCompanyDetails,
  job: CreateJobJobDetails,
  hiring: CreateJobHiringFlow,
  screening: CreateJobScreening,
};

export const INITIAL_CREATE_JOB_FORM_DATA = {
  job_title: "",
  company_website: "",
  company_name: "",
  company_description: "",
  job_description: "",
  minimum_fit_score: 0,
};

export const INITIAL_HIRING_FLOW_STATE = {
  secondStep: "",
  thirdStep: "",
  fourthStep: "",
};
