import CreateJobCompanyDetails from "@/components/dashboard/create-job/company-details";
import CreateJobHiringFlow from "@/components/dashboard/create-job/hiring-flow";
import CreateJobJobDetails from "@/components/dashboard/create-job/job-details";
import CreateJobOverview from "@/components/dashboard/create-job/overview";

export const createJobScreens = {
  intro: CreateJobCompanyDetails,
  job: CreateJobJobDetails,
  hiring: CreateJobHiringFlow,
  overview: CreateJobOverview,
};

export const INITIAL_CREATE_JOB_FORM_DATA = {
  job_title: "",
  company_website: "",
  company_name: "",
  company_description: "",
  job_description: "",
  minimum_fit_score: 0,
};
