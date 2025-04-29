import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useContext, useState, useRef, useEffect } from "react";

import { CreateJobResponse, createJobAi } from "@/actions/create-job";
import { Company, getCompanies } from "@/actions/get-companies";
import { useUserStore } from "@/hooks/use-user-store";
import { CreateJobContext } from "@/providers/job-posting.context";
import toast from "react-hot-toast";
import { DashboardInputGroup, DashboardTextareaGroup } from "../input-group";
import CreateJobFileGroup from "./file-group";
import { cn } from "@/lib/utils";
import { outfit } from "@/constants/app";

function CreateJobCompanyDetails() {
  const ctx = useContext(CreateJobContext);
  const { userData } = useUserStore();
  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(userData?.token ?? ""),
    enabled: !!userData?.token,
  });

  const createJobAiMutation = useMutation<CreateJobResponse>({
    mutationFn: async () => {
      const data = {
        ...(ctx.formData.company_logo
          ? { company_logo: ctx.formData.company_logo }
          : {}),
        company_name: ctx.formData.company_name,
        company_website: ctx.formData.company_website,
        company_description: ctx.formData.company_description,
        job_title: ctx.formData.job_title,
        ...(selectedCompany ? { company_id: selectedCompany.id } : {}),
      };
      return await createJobAi(userData?.token ?? "", data);
    },
    onSuccess: (res) => {
      toast.success("Job post generated successfully");
      // Company details
      ctx.setFormData("company_name", res.company_name);
      ctx.setFormData("company_website", res.company_website);
      ctx.setFormData("company_description", res.company_description);

      // Job details
      ctx.setFormData("job_title", res.job_title);
      ctx.setFormData("job_description", res.job_description);
      ctx.setFormData("job_type", res.job_type);
      ctx.setFormData("job_location", res.job_location_name);
      ctx.setFormData("job_tags", res.tags);

      // Requirements
      ctx.setFormData("required_skills", res.required_skills);
      ctx.setFormData("educational_requirements", res.educational_requirements);
      ctx.setFormData(
        "years_of_experience_required",
        res.years_of_experience_required
      );
      ctx.setFormData("languages", res.languages);

      // Dates
      ctx.setFormData("start_date", res.start_date);
      ctx.setFormData("end_date", res.end_date);

      // Salary
      ctx.setFormData("salary_range_min", res.salary_range_min);
      ctx.setFormData("salary_range_max", res.salary_range_max);
      ctx.setFormData("filter_out_salary_range", res.filter_out_salary_range);

      // Requirements
      ctx.setFormData("require_cv", res.require_cv);
      ctx.setFormData("require_cover_letter", res.require_cover_letter);
      ctx.setFormData("voicenote_recording", res.require_voicenote);

      // Additional settings
      ctx.setFormData("minimum_fit_score", res.minimum_fit_score);

      // Store job ID for later use
      ctx.setFormData("job_id", res.id);

      ctx.goTo("job");
    },
  });

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    ctx.setFormData("company_name", company.name);
    ctx.setFormData("company_website", company.website);
    ctx.setFormData("company_description", company.description);
    setIsDropdownOpen(false);
  };

  const isFormValid = () => {
    if (!ctx.formData.job_title?.trim()) return false;

    if (showNewCompanyForm) {
      // If adding a new company, check all company fields
      return !!(
        ctx.formData.company_name?.trim() &&
        ctx.formData.company_website?.trim() &&
        ctx.formData.company_description?.trim()
      );
    } else {
      // If selecting existing company, check if one is selected
      return !!selectedCompany;
    }
  };

  return (
    <section
      className={`${outfit.className} max-w-screen-sm mx-auto space-y-6`}
    >
      <h2 className="text-center text-3xl font-semibold">Create a Job Post</h2>

      <form className="space-y-6">
        <DashboardInputGroup
          label="Job Title"
          value={ctx.formData.job_title}
          onChange={(val) => ctx.setFormData("job_title", val)}
        />

        <div className="!mt-0">
          {/*<label className="text-sm font-medium text-gray-700">
            Company Name
          </label> */}
          <div className="relative" ref={dropdownRef}>
            {!showNewCompanyForm && (
              <div className="flex items-center justify-between">
                <div className="relative flex-1">
                  <div className="p-2 pr-0 flex justify-between items-end">
                    <span className="text-[#4A5568] text-sm">Company name</span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCompanyForm(true);
                        setIsDropdownOpen(false);
                        // Clear form fields
                        ctx.setFormData("company_name", "");
                        ctx.setFormData("company_website", "");
                        ctx.setFormData("company_description", "");
                        ctx.setFormData("company_logo", null);
                      }}
                      className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      Add a New Company
                      <PlusCircle className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="relative w-full">
                    <div
                      className={cn(
                        "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer",
                        "flex items-center justify-between"
                      )}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedCompany ? (
                        <div className="flex items-center gap-2">
                          {selectedCompany.logo ? (
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                              <Image
                                src={selectedCompany.logo}
                                alt={selectedCompany.name}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {selectedCompany.name[0]}
                              </span>
                            </div>
                          )}
                          <span>{selectedCompany.name}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Select a company</span>
                      )}
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {isDropdownOpen && !isLoadingCompanies && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="max-h-60 overflow-auto">
                          {companies.map((company) => (
                            <button
                              key={company.id}
                              type="button"
                              onClick={() => handleCompanySelect(company)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              {company.logo ? (
                                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                  <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs font-medium">
                                    {company.name[0]}
                                  </span>
                                </div>
                              )}
                              {company.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showNewCompanyForm ? (
          <>
            <DashboardInputGroup
              label="Company Website"
              value={ctx.formData.company_website}
              onChange={(val) => ctx.setFormData("company_website", val)}
            />
            <DashboardInputGroup
              label="Company Name"
              value={ctx.formData.company_name}
              onChange={(val) => ctx.setFormData("company_name", val)}
            />
            <DashboardTextareaGroup
              label="Company Description"
              value={ctx.formData.company_description}
              onChange={(val) => ctx.setFormData("company_description", val)}
            />
            <CreateJobFileGroup
              label="Company Logo"
              onChange={(file) => ctx.setFormData("company_logo", file)}
            />
          </>
        ) : null}

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => ctx.goTo("job")}
            disabled={!isFormValid()}
            className="px-4 py-3 bg-primary text-white font-medium rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Write your own job post
          </button>

          <button
            type="button"
            disabled={!isFormValid() || createJobAiMutation.isPending}
            onClick={() => createJobAiMutation.mutate()}
            className="p-3 border-2 border-[#006F5C] text-black rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#006F5C] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Generate with AI</span>
            {createJobAiMutation.isPending ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              <Image
                src="/ai-technology.png"
                alt="ai icon"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateJobCompanyDetails;
