import { ArrowLeft } from "lucide-react";
import React from "react";
import JobDetail from "./job-detail";
import JobDescription from "./job-description";
import AdvancedOptions from "./components/advanced-options";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "@/actions/create-job";
import { useUserStore } from "@/hooks/use-user-store";
import ReviewScreen from "./review-screen";
import toast from "react-hot-toast";

const CreateJobFlow = ({
  setStartCreateJobFlow,
}: {
  setStartCreateJobFlow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [companyLogo, setCompanyLogo] = React.useState<any>(null);
  const [createdJob, setCreatedJob] = React.useState(null);
  const storedDetails = JSON.parse(
    localStorage.getItem("job-creation-details") as string
  );
  const { userData } = useUserStore();
  const {
    mutate: jobCreationMutate,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["create-job"],
    mutationFn: async () => {
      let jobType =
        storedDetails?.type === "Full Time"
          ? "full_time"
          : storedDetails?.type === "Part Time"
          ? "part_time"
          : storedDetails?.type === "Hybrid"
          ? "hybrid"
          : "internship";
      console.log(companyLogo);
      const formData = new FormData();
      let response = await createJob(userData?.token as string, {
        company_website: storedDetails?.website,
        company_description: storedDetails?.description,
        company_name: storedDetails?.name,
        job_title: storedDetails?.title,
        start_date: new Date(storedDetails?.startDate)
          .toISOString()
          .split("T")[0],
        end_date: new Date(storedDetails?.endDate).toISOString().split("T")[0],
        job_type: jobType,
        job_description: storedDetails?.JobDescription,
        required_skills: storedDetails?.skills,
        educational_requirements: storedDetails?.education,
        additional_benefits: storedDetails?.benefits,
        languages: storedDetails?.language,
        country_of_residence: storedDetails?.residence,
        years_of_experience_required: storedDetails?.YOE,
        salary_range_min: Number(storedDetails?.salaryRange.min),
        salary_range_max: Number(storedDetails?.salaryRange.max),
        filter_out_salary_range: storedDetails?.filterSalaryRange,
        require_cv: storedDetails?.applicationRequirements.includes("CV"),
        require_cover_letter:
          storedDetails?.applicationRequirements.includes("CoverLetter"),
        require_voicenote:
          storedDetails?.applicationRequirements.includes("VoiceNote"),
        visibility_public: storedDetails?.jobVisibility === "Public",
        visibility_private: storedDetails?.jobVisibility === "Private",
        tags: storedDetails?.tags,
        hide_personal_details_during_screening:
          storedDetails?.diversityInclusionSettings,
        job_location_name: storedDetails?.JobLocation,
        status: "DRAFT",
        salary_currency: "USD",
        minimum_fit_score: 0,
        filter_minimum_fit_score: false,
        auto_send_interview_mail_on_close: false,
        candidate_interview_count: 0,
        interview_link: "",
      });
      console.log("the data is", response);
      setCreatedJob(response);
    },
    onSuccess: (data: any) => {
      setCurrentStep(4);
      // localStorage.removeItem("job-creation-details");
    },
    onError: (error) => {
      toast.error("An error occurred while creating the job");
    },
  });
  const handleCreateJob = async () => {
    jobCreationMutate();
  };
  console.log("the response of the job creation is", data);
  return (
    <div className=" h-screen pl-4  w-screen pt-[100px]">
      <div className="flex items-center space-x-3">
        <ArrowLeft
          onClick={() => setStartCreateJobFlow(false)}
          className="w-6 h-6 cursor-pointer"
        />
        <h1 className="text-xl font-bold ">Create Job Post</h1>
      </div>
      {currentStep === 1 && (
        <JobDetail
          setCompanyLogo={setCompanyLogo}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 2 && <JobDescription setCurrentStep={setCurrentStep} />}
      {currentStep === 3 && (
        <AdvancedOptions
          handleCreateJob={handleCreateJob}
          setCurrentStep={setCurrentStep}
          isPending={isPending}
        />
      )}
      {currentStep === 4 && (
        <ReviewScreen createdJob={createdJob} setCurrentStep={setCurrentStep} />
      )}
    </div>
  );
};

export default CreateJobFlow;
