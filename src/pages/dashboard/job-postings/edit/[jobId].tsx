"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Save } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { getJobDetail } from "@/actions/get-job-detail";
import { updateJob } from "@/actions/create-job";
import { useUserStore } from "@/hooks/use-user-store";
import { outfit } from "@/constants/app";
import DashboardWrapper from "@/components/dashboard-wrapper";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const quillStyles = `
  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #e5e7eb;
    font-family: 'Outfit', sans-serif;
  }

  .ql-container.ql-snow {
    border: none;
    font-family: 'Outfit', sans-serif;
  }

  .ql-editor {
    background-color: #F9FAFB;
    font-family: 'Outfit', sans-serif;
    min-height: 200px;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    font-family: 'Outfit', sans-serif;
    color: #9CA3AF;
    font-size: 14px;
    position: absolute;
    content: 'Write job description and requirements here...';
    pointer-events: none;
  }

  .ql-toolbar button {
    font-family: 'Outfit', sans-serif;
  }

  .ql-editor p,
  .ql-editor ol,
  .ql-editor ul,
  .ql-editor pre,
  .ql-editor blockquote,
  .ql-editor h1,
  .ql-editor h2,
  .ql-editor h3,
  .ql-editor h4,
  .ql-editor h5,
  .ql-editor h6 {
    font-family: 'Outfit', sans-serif;
  }
`;

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ size: ["small", false, "large"] }],
    [{ align: [] }],
    ["list", "bullet"],
    ["link", "emoji"],
    ["clean"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "size",
  "align",
  "list",
  "bullet",
  "link",
  "emoji",
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

interface Question {
  id: string;
  text: string;
  is_screening: boolean;
  created_at: string;
  updated_at: string;
  reference: string | null;
}

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const TagInput = ({
  value,
  onChange,
  placeholder,
  className = "",
}: TagInputProps) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const tags = value.split(",").filter((tag) => tag.trim());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTags = [...tags, inputValue.trim()];
      onChange(newTags.join(","));
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      onChange(newTags.join(","));
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags.join(","));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[42px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white text-gray-900 border border-gray-200 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none"
          placeholder={tags.length === 0 ? placeholder : ""}
        />
      </div>
      <p className="text-xs text-gray-500">
        {t("jobPostings.edit.tags.helpText")}
      </p>
    </div>
  );
};

export default function EditJobPage() {
  const router = useRouter();
  const { jobId } = router.query;
  const { userData } = useUserStore();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    company_website: "",
    company_name: "",
    company_description: "",
    job_title: "",
    start_date: "",
    end_date: "",
    job_type: "full_time",
    job_description: "",
    required_skills: "",
    educational_requirements: "",
    additional_benefits: "",
    languages: "",
    country_of_residence: "",
    years_of_experience_required: "",
    job_location_name: "",
    salary_currency: "USD",
    salary_range_min: 0,
    salary_range_max: 0,
    filter_out_salary_range: false,
    require_cv: false,
    require_cover_letter: false,
    require_voicenote: false,
    visibility_public: true,
    visibility_private: false,
    tags: "",
    hide_personal_details_during_screening: false,
    minimum_fit_score: 20,
    filter_minimum_fit_score: true,
    status: "open",
    auto_send_interview_mail_on_close: false,
    candidate_interview_count: 0,
    interview_link: "",
    company_id: null,
    recruiter_id: null,
    job_questions: [] as string[],
    screening_questions: [] as string[],
    recruiter_calendar_booking_link: "",
    job_visibility: true,
    voicenote_recording: false,
    auto_send_interview_email: false,
    hide_candidates_personal_details: false,
    questions: [] as Question[],
  });

  // Fetch job details
  const { data: jobData, isLoading } = useQuery({
    queryKey: ["job-detail", jobId],
    queryFn: async () => {
      return await getJobDetail({
        job_id: jobId as string,
        token: userData?.token,
      });
    },
    enabled: !!jobId && !!userData?.token,
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (jobData) {
      setFormData({
        company_website: jobData.company_website || "",
        company_name: jobData.company_name || "",
        company_description: jobData.company_description || "",
        job_title: jobData.job_title || "",
        start_date: jobData.start_date || "",
        end_date: jobData.end_date || "",
        job_type: jobData.job_type || "full_time",
        job_description: jobData.job_description || "",
        required_skills: jobData.required_skills || "",
        educational_requirements: jobData.educational_requirements || "",
        additional_benefits: jobData.additional_benefits || "",
        languages: jobData.languages || "",
        country_of_residence: jobData.country_of_residence || "",
        years_of_experience_required:
          jobData.years_of_experience_required || "",
        job_location_name: jobData.job_location_name || "",
        salary_currency: jobData.salary_currency || "USD",
        salary_range_min: jobData.salary_range_min || 0,
        salary_range_max: jobData.salary_range_max || 0,
        filter_out_salary_range: jobData.filter_out_salary_range || false,
        require_cv: jobData.require_cv || false,
        require_cover_letter: jobData.require_cover_letter || false,
        require_voicenote: jobData.require_voicenote || false,
        visibility_public: jobData.visibility_public || true,
        visibility_private: jobData.visibility_private || false,
        tags: jobData.tags || "",
        hide_personal_details_during_screening:
          jobData.hide_personal_details_during_screening || false,
        minimum_fit_score: jobData.minimum_fit_score || 20,
        filter_minimum_fit_score: jobData.filter_minimum_fit_score || true,
        status: jobData.status || "open",
        auto_send_interview_mail_on_close:
          jobData.auto_send_interview_mail_on_close || false,
        candidate_interview_count: jobData.candidate_interview_count || 0,
        interview_link: jobData.interview_link || "",
        company_id: jobData.company_id || null,
        recruiter_id: jobData.recruiter_id || null,
        job_questions: jobData.questions?.map((q: any) => q.text) || [],
        screening_questions: jobData.screening_questions || [],
        recruiter_calendar_booking_link:
          jobData.recruiter_calendar_booking_link || "",
        job_visibility: jobData.job_visibility || true,
        voicenote_recording: jobData.voicenote_recording || false,
        auto_send_interview_email: jobData.auto_send_interview_email || false,
        hide_candidates_personal_details:
          jobData.hide_candidates_personal_details || false,
        questions: jobData.questions || [],
      });
    }
  }, [jobData]);

  const updateJobMutation = useMutation({
    mutationFn: async () => {
      return await updateJob(userData?.token ?? "", jobId as string, formData);
    },
    onSuccess: () => {
      toast.success(t("jobPostings.edit.messages.updateSuccess"));
      router.push(`/dashboard/job-postings?jobId=${jobId}&view=details`);
    },
    onError: (error: any) => {
      toast.error(error.message || t("jobPostings.edit.messages.updateError"));
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateJobMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className={`${outfit.className} p-6`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} p-6`}>
        <style dangerouslySetInnerHTML={{ __html: quillStyles }} />

        <div className="mb-6">
          <h3 className="text-3xl font-semibold py-4 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft />
            </button>
            <span>{t("jobPostings.edit.title")}</span>
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          {/* Company Header */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {jobData?.company_logo ? (
                  <Image
                    src={jobData.company_logo}
                    alt={formData.company_name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {formData.company_name[0] || "C"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) =>
                    handleInputChange("job_title", e.target.value)
                  }
                  className="text-2xl font-semibold mb-2 w-full border-none outline-none bg-transparent"
                  placeholder={t("jobPostings.edit.jobTitle")}
                />
                <div className="text-[15px] text-gray-600 mb-1">
                  {formData.company_name}
                </div>
                <input
                  type="text"
                  value={formData.job_location_name}
                  onChange={(e) =>
                    handleInputChange("job_location_name", e.target.value)
                  }
                  className="text-[14px] text-gray-600 w-full border-none outline-none bg-transparent"
                  placeholder={t("jobPostings.edit.jobLocation")}
                />
              </div>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">
                {t("jobPostings.edit.jobDetails.jobType")}
              </div>
              <select
                value={formData.job_type}
                onChange={(e) => handleInputChange("job_type", e.target.value)}
                className="font-medium bg-transparent border-none outline-none w-full"
              >
                <option value="full_time">
                  {t("jobPostings.edit.jobTypeOptions.fullTime")}
                </option>
                <option value="part_time">
                  {t("jobPostings.edit.jobTypeOptions.partTime")}
                </option>
                <option value="contract">
                  {t("jobPostings.edit.jobTypeOptions.contract")}
                </option>
                <option value="internship">
                  {t("jobPostings.edit.jobTypeOptions.internship")}
                </option>
                <option value="freelance">
                  {t("jobPostings.edit.jobTypeOptions.freelance")}
                </option>
              </select>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">
                {t("jobPostings.edit.jobDetails.experience")}
              </div>
              <input
                type="text"
                value={formData.years_of_experience_required}
                onChange={(e) =>
                  handleInputChange(
                    "years_of_experience_required",
                    e.target.value
                  )
                }
                className="font-medium bg-transparent border-none outline-none w-full"
                placeholder={t(
                  "jobPostings.edit.jobDetails.experiencePlaceholder"
                )}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">
                {t("jobPostings.edit.jobDetails.salaryRange")}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.salary_range_min}
                  onChange={(e) =>
                    handleInputChange(
                      "salary_range_min",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="font-medium bg-transparent border-none outline-none w-full"
                  placeholder={t("jobPostings.edit.jobDetails.salaryMin")}
                />
                <span className="font-medium">-</span>
                <input
                  type="number"
                  value={formData.salary_range_max}
                  onChange={(e) =>
                    handleInputChange(
                      "salary_range_max",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="font-medium bg-transparent border-none outline-none w-full"
                  placeholder={t("jobPostings.edit.jobDetails.salaryMax")}
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">
                {t("jobPostings.edit.jobDetails.location")}
              </div>
              <input
                type="text"
                value={formData.job_location_name}
                onChange={(e) =>
                  handleInputChange("job_location_name", e.target.value)
                }
                className="font-medium bg-transparent border-none outline-none w-full"
                placeholder={t("jobPostings.edit.jobLocation")}
              />
            </div>
          </div>

          {/* Company Description */}
          <Section title={t("jobPostings.edit.sections.aboutCompany")}>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              {formData.company_description}
            </div>
          </Section>

          {/* Job Description with ReactQuill */}
          <Section title={t("jobPostings.edit.sections.jobDescription")}>
            <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[300px]">
              <div className="h-[calc(300px-42px)]">
                <ReactQuill
                  theme="snow"
                  value={formData.job_description}
                  onChange={(value: string) =>
                    handleInputChange("job_description", value)
                  }
                  modules={modules}
                  formats={formats}
                  className="bg-gray-50 h-full"
                  style={{ height: "100%" }}
                  placeholder={t(
                    "jobPostings.edit.sections.jobDescriptionPlaceholder"
                  )}
                />
              </div>
            </div>
          </Section>

          {/* Required Skills */}
          <Section title={t("jobPostings.edit.sections.requiredSkills")}>
            <TagInput
              value={formData.required_skills}
              onChange={(value) => handleInputChange("required_skills", value)}
              placeholder={t(
                "jobPostings.edit.sections.requiredSkillsPlaceholder"
              )}
            />
          </Section>

          {/* Educational Requirements */}
          <Section
            title={t("jobPostings.edit.sections.educationalRequirements")}
          >
            <textarea
              value={formData.educational_requirements}
              onChange={(e) =>
                handleInputChange("educational_requirements", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t(
                "jobPostings.edit.sections.educationalRequirementsPlaceholder"
              )}
              rows={3}
            />
          </Section>

          {/* Languages */}
          <Section title={t("jobPostings.edit.sections.languages")}>
            <TagInput
              value={formData.languages}
              onChange={(value) => handleInputChange("languages", value)}
              placeholder={t("jobPostings.edit.sections.languagesPlaceholder")}
            />
          </Section>

          {/* Additional Benefits */}
          <Section title={t("jobPostings.edit.sections.additionalBenefits")}>
            <textarea
              value={formData.additional_benefits}
              onChange={(e) =>
                handleInputChange("additional_benefits", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t(
                "jobPostings.edit.sections.additionalBenefitsPlaceholder"
              )}
              rows={3}
            />
          </Section>

          {/* Tags */}
          <Section title={t("jobPostings.edit.sections.tags")}>
            <TagInput
              value={formData.tags}
              onChange={(value) => handleInputChange("tags", value)}
              placeholder={t("jobPostings.edit.sections.tagsPlaceholder")}
            />
          </Section>

          {/* Job Dates */}
          <Section title={t("jobPostings.edit.sections.jobDuration")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("jobPostings.edit.sections.startDate")}
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    handleInputChange("start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("jobPostings.edit.sections.endDate")}
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    handleInputChange("end_date", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Section>

          {/* Job Requirements */}
          <Section title={t("jobPostings.edit.sections.jobRequirements")}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="require_cv"
                  checked={formData.require_cv}
                  onChange={(e) =>
                    handleInputChange("require_cv", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="require_cv" className="text-sm">
                  {t("jobPostings.edit.requirements.requireCv")}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="require_cover_letter"
                  checked={formData.require_cover_letter}
                  onChange={(e) =>
                    handleInputChange("require_cover_letter", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="require_cover_letter" className="text-sm">
                  {t("jobPostings.edit.requirements.requireCoverLetter")}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="require_voicenote"
                  checked={formData.require_voicenote}
                  onChange={(e) =>
                    handleInputChange("require_voicenote", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="require_voicenote" className="text-sm">
                  {t("jobPostings.edit.requirements.requireVoicenote")}
                </label>
              </div>
            </div>
          </Section>

          {/* Job Visibility */}
          <Section title={t("jobPostings.edit.sections.jobVisibility")}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="job_visibility"
                  checked={formData.job_visibility}
                  onChange={(e) =>
                    handleInputChange("job_visibility", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="job_visibility" className="text-sm">
                  {t("jobPostings.edit.visibility.makeJobPublic")}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="filter_out_salary_range"
                  checked={formData.filter_out_salary_range}
                  onChange={(e) =>
                    handleInputChange(
                      "filter_out_salary_range",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="filter_out_salary_range" className="text-sm">
                  {t("jobPostings.edit.visibility.hideSalaryRange")}
                </label>
              </div>
            </div>
          </Section>

          {/* Questions Section */}
          <Section title={t("jobPostings.edit.sections.applicationQuestions")}>
            <div className="space-y-6">
              {/* Job Application Questions */}
              <div>
                <h3 className="text-sm font-medium mb-4">
                  {t("jobPostings.edit.questions.jobApplicationQuestions")}
                </h3>
                <div className="space-y-4">
                  {formData.questions
                    .filter((q) => !q.is_screening)
                    .map((question, index) => (
                      <div key={question.id} className="flex gap-2">
                        <input
                          type="text"
                          value={question.text}
                          onChange={(e) => {
                            const newQuestions = [...formData.questions];
                            const questionIndex = newQuestions.findIndex(
                              (q) => q.id === question.id
                            );
                            if (questionIndex !== -1) {
                              newQuestions[questionIndex] = {
                                ...question,
                                text: e.target.value,
                              };
                              handleInputChange("questions", newQuestions);
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t(
                            "jobPostings.edit.questions.enterQuestion"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newQuestions = formData.questions.filter(
                              (q) => q.id !== question.id
                            );
                            handleInputChange("questions", newQuestions);
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {t("jobPostings.edit.questions.remove")}
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newQuestion: Question = {
                        id: crypto.randomUUID(),
                        text: "",
                        is_screening: false,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        reference: null,
                      };
                      handleInputChange("questions", [
                        ...formData.questions,
                        newQuestion,
                      ]);
                    }}
                    className="px-4 py-2 text-[#009379] hover:bg-[#009379]/10 rounded-lg transition-colors"
                  >
                    {t("jobPostings.edit.questions.addApplicationQuestion")}
                  </button>
                </div>
              </div>

              {/* Screening Questions */}
              <div>
                <h3 className="text-sm font-medium mb-4">
                  {t("jobPostings.edit.questions.screeningQuestions")}
                </h3>
                <div className="space-y-4">
                  {formData.questions
                    .filter((q) => q.is_screening)
                    .map((question, index) => (
                      <div key={question.id} className="flex gap-2">
                        <input
                          type="text"
                          value={question.text}
                          onChange={(e) => {
                            const newQuestions = [...formData.questions];
                            const questionIndex = newQuestions.findIndex(
                              (q) => q.id === question.id
                            );
                            if (questionIndex !== -1) {
                              newQuestions[questionIndex] = {
                                ...question,
                                text: e.target.value,
                              };
                              handleInputChange("questions", newQuestions);
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t(
                            "jobPostings.edit.questions.enterScreeningQuestion"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newQuestions = formData.questions.filter(
                              (q) => q.id !== question.id
                            );
                            handleInputChange("questions", newQuestions);
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {t("jobPostings.edit.questions.remove")}
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newQuestion: Question = {
                        id: crypto.randomUUID(),
                        text: "",
                        is_screening: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        reference: null,
                      };
                      handleInputChange("questions", [
                        ...formData.questions,
                        newQuestion,
                      ]);
                    }}
                    className="px-4 py-2 text-[#009379] hover:bg-[#009379]/10 rounded-lg transition-colors"
                  >
                    {t("jobPostings.edit.questions.addScreeningQuestion")}
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* Recruiter Calendar Link */}
          <Section title={t("jobPostings.edit.sections.recruiterCalendar")}>
            <input
              type="url"
              value={formData.recruiter_calendar_booking_link}
              onChange={(e) =>
                handleInputChange(
                  "recruiter_calendar_booking_link",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("jobPostings.edit.calendar.placeholder")}
            />
          </Section>

          {/* Minimum Fit Score */}
          <Section title={t("jobPostings.edit.sections.minimumFitScore")}>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="0"
                max="100"
                value={formData.minimum_fit_score}
                onChange={(e) =>
                  handleInputChange(
                    "minimum_fit_score",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </Section>

          {/* Additional Settings */}
          <Section title={t("jobPostings.edit.sections.additionalSettings")}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="auto_send_interview_email"
                  checked={formData.auto_send_interview_email}
                  onChange={(e) =>
                    handleInputChange(
                      "auto_send_interview_email",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="auto_send_interview_email" className="text-sm">
                  {t("jobPostings.edit.settings.autoSendInterviewEmails")}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hide_candidates_personal_details"
                  checked={formData.hide_candidates_personal_details}
                  onChange={(e) =>
                    handleInputChange(
                      "hide_candidates_personal_details",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="hide_candidates_personal_details"
                  className="text-sm"
                >
                  {t("jobPostings.edit.settings.hideCandidatesPersonalDetails")}
                </label>
              </div>
            </div>
          </Section>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t("jobPostings.edit.actions.cancel")}
            </button>
            <button
              type="submit"
              disabled={updateJobMutation.isPending}
              className="bg-[#009379] text-white px-8 py-2 rounded-lg hover:bg-[#007a65] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {updateJobMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("jobPostings.edit.actions.updating")}
                </>
              ) : (
                <>{t("jobPostings.edit.actions.updateJob")}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
}
