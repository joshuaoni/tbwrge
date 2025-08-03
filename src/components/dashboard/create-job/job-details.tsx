import { CreateJobContext } from "@/providers/job-posting.context";
import {
  ArrowLeft,
  PlusCircle,
  X,
  ChevronDown,
  Trash2,
  Loader2,
} from "lucide-react";
import { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTeamMember } from "@/actions/add-team-member";
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";
import {
  DashboardCheckBoxInput,
  DashboardInputGroup,
  DashboardSelectGroup,
  DashboardTextareaGroup,
} from "../input-group";
import { outfit } from "@/constants/app";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTeamMembers } from "@/actions/get-team-members";
import { deleteTeamMember } from "@/actions/delete-team-member";
import {
  createScreeningQuestions,
  ScreeningQuestionsResponse,
} from "@/actions/create-screening-questions";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

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

interface TeamMember {
  id: string;
  team: {
    id: string;
    name: string;
    owner: {
      id: string;
    };
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

function CreateJobJobDetails() {
  const { t } = useTranslation();
  const ctx = useContext(CreateJobContext);
  const { userData } = useUserStore();
  const [isTeamMemberDialogOpen, setIsTeamMemberDialogOpen] = useState(false);
  const [teamMemberName, setTeamMemberName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  const { data: teamMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const response = await getTeamMembers(userData?.token);
      return response as TeamMember[];
    },
  });

  const queryClient = useQueryClient();

  const addTeamMemberMutation = useMutation({
    mutationFn: async () => {
      if (!teamMemberName || !teamMemberEmail) {
        throw new Error("Name and email are required");
      }
      return addTeamMember({
        name: teamMemberName,
        email: teamMemberEmail,
        permission: "admin",
        token: userData?.token,
      });
    },
    onSuccess: () => {
      toast.success("Team member added successfully");
      setIsTeamMemberDialogOpen(false);
      setTeamMemberName("");
      setTeamMemberEmail("");
      // Invalidate and refetch team members
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add team member");
    },
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      return deleteTeamMember(memberId, userData?.token || "");
    },
    onSuccess: () => {
      toast.success("Team member removed successfully");
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove team member");
    },
  });

  const handleAddTeamMember = () => {
    if (teamMemberName && teamMemberEmail) {
      addTeamMemberMutation.mutate();
    }
  };

  useEffect(() => {
    if (teamMembers && !ctx.formData.recruiter_id) {
      const owner = teamMembers.find(
        (member) => member.user.id === member.team.owner.id
      );
      if (owner) {
        ctx.setFormData("recruiter_id", owner.user.id);
      }
    }
  }, [teamMembers, ctx.formData.recruiter_id]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isFormValid = () => {
    // First check if salary range is valid
    const minSalary = Number(ctx.formData.salary_range_min);
    const maxSalary = Number(ctx.formData.salary_range_max);
    const isSalaryValid =
      !isNaN(minSalary) &&
      !isNaN(maxSalary) &&
      minSalary > 0 &&
      maxSalary > 0 &&
      minSalary < maxSalary;

    // Check if job description exceeds character limit
    const isJobDescriptionValid = ctx.formData.job_description.length <= 1000;

    const requiredFields = {
      job_description: ctx.formData.job_description?.trim(),
      required_skills: ctx.formData.required_skills?.trim(),
      educational_requirements: ctx.formData.educational_requirements?.trim(),
      years_of_experience_required:
        ctx.formData.years_of_experience_required?.trim(),
      job_type: ctx.formData.job_type?.trim(),
      job_location: ctx.formData.job_location?.trim(),
      languages: ctx.formData.languages?.trim(),
      additional_benefits: ctx.formData.additional_benefits?.trim(),
      job_tags: ctx.formData.job_tags?.trim(),
      recruiter_id: ctx.formData.recruiter_id,
      recruiter_calendar_booking_link:
        ctx.formData.recruiter_calendar_booking_link?.trim(),
      start_date: ctx.formData.start_date?.trim(),
      end_date: ctx.formData.end_date?.trim(),
    };

    return (
      Object.values(requiredFields).every(
        (value) => value !== undefined && value !== null && value !== ""
      ) &&
      isSalaryValid &&
      isJobDescriptionValid
    );
  };

  // Mutation for generating screening questions
  const screeningQuestionsMutation = useMutation({
    mutationFn: async () => {
      return createScreeningQuestions(userData?.token || undefined, {
        job_title: ctx.formData.job_title || "",
        job_description: ctx.formData.job_description || "",
        required_skills: ctx.formData.required_skills || "",
        educational_requirements: ctx.formData.educational_requirements || "",
      });
    },
    onSuccess: (data: ScreeningQuestionsResponse) => {
      // Update context with the generated questions
      ctx.setFormData("screening_questions", data);

      // Navigate to screening page
      ctx.goTo("hiring");
    },
    onError: (error: Error) => {
      toast.error("Failed to generate screening questions. Please try again.");
      console.error("Screening questions error:", error);

      // Navigate to hiring page anyway, but without generated questions
      ctx.goTo("hiring");
    },
  });

  const handleNextClick = async () => {
    if (!isFormValid()) return;

    try {
      setIsGeneratingQuestions(true);
      await screeningQuestionsMutation.mutateAsync();
    } catch (error) {
      console.error("Failed to generate screening questions:", error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Add custom styles for ReactQuill
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
}

.ql-editor.ql-blank::before {
  font-style: normal;
  font-family: 'Outfit', sans-serif;
  color: #9CA3AF;
  font-size: 14px;
  position: absolute;
  content: '${t("jobPostings.edit.editorPlaceholder")}';
  pointer-events: none;
}

.ql-toolbar button {
  font-family: 'Outfit', sans-serif;
}

/* Apply Outfit font to all text in the editor */
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

  return (
    <div className={`${outfit.className}`}>
      <style>{quillStyles}</style>
      <h3 className="text-sm font-semibold py-4 flex items-center">
        <button onClick={() => ctx.prevScreen()} className="mr-1">
          <ArrowLeft width={16} height={16} />
        </button>
        {ctx.formData.job_title ?? "Job Title is missing"}
      </h3>
      <div className="flex gap-8">
        <section className="w-full space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("createJob.jobDetails.jobDescriptionRequirements")}{" "}
                <span className="text-red">
                  {t("createJob.common.required")}
                </span>
              </label>
              <span className="text-sm text-gray-500">
                {ctx.formData.job_description.length}/1000
              </span>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[300px]">
              <div className="h-[calc(300px-42px)]">
                <ReactQuill
                  theme="snow"
                  value={ctx.formData.job_description}
                  onChange={(value: string) => {
                    // Always update the form data to show actual character count
                    ctx.setFormData("job_description", value);
                  }}
                  modules={modules}
                  formats={formats}
                  className="bg-gray-50 h-full"
                  style={{ height: "100%" }}
                  placeholder="Write a detailed job description including requirements, and what makes this role unique..."
                />
                {/* Character Counter */}
                <div className="flex justify-between items-center mt-2 px-2">
                  <div className="flex items-center gap-2">
                    {ctx.formData.job_description.length > 1000 && (
                      <span className="text-red text-sm font-medium flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Character limit exceeded
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      ctx.formData.job_description.length > 1000
                        ? "text-red"
                        : ctx.formData.job_description.length > 800
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {ctx.formData.job_description.length}/1000
                  </span>
                </div>
              </div>
            </div>
            {/* Error message below the text editor */}
            {ctx.formData.job_description.length > 1000 && (
              <div className="flex items-center gap-2 mt-2 text-red text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Job description must be 1000 characters or less
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.requiredSkills")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[48px]">
              {ctx.formData.required_skills
                .split(",")
                .filter(Boolean)
                .map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-white px-2 py-1 rounded text-sm"
                  >
                    {skill.trim()}
                    <button
                      onClick={() => {
                        const skills = ctx.formData.required_skills
                          .split(",")
                          .filter((_, i) => i !== index);
                        ctx.setFormData("required_skills", skills.join(","));
                      }}
                      className="text-gray-500 hover:text-red"
                    >
                      ×
                    </button>
                  </span>
                ))}
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
                placeholder={t("createJob.jobDetails.placeholders.skillsInput")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const newSkill = input.value.trim();
                    if (newSkill) {
                      const currentSkills = ctx.formData.required_skills
                        .split(",")
                        .filter(Boolean);
                      ctx.setFormData(
                        "required_skills",
                        [...currentSkills, newSkill].join(",")
                      );
                      input.value = "";
                    }
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.educationalRequirements")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <input
              type="text"
              value={ctx.formData.educational_requirements}
              onChange={(e) =>
                ctx.setFormData("educational_requirements", e.target.value)
              }
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.requiredYearsExperience")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <input
              type="text"
              value={ctx.formData.years_of_experience_required}
              onChange={(e) =>
                ctx.setFormData("years_of_experience_required", e.target.value)
              }
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.jobType")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <select
              value={ctx.formData.job_type}
              onChange={(e) => ctx.setFormData("job_type", e.target.value)}
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]"
            >
              <option value="">
                {t("createJob.jobDetails.selectJobType")}
              </option>
              <option value="full_time">
                {t("createJob.jobDetails.jobTypeOptions.fullTime")}
              </option>
              <option value="part_time">
                {t("createJob.jobDetails.jobTypeOptions.partTime")}
              </option>
              <option value="contract">
                {t("createJob.jobDetails.jobTypeOptions.contract")}
              </option>
              <option value="internship">
                {t("createJob.jobDetails.jobTypeOptions.internship")}
              </option>
              <option value="remote">
                {t("createJob.jobDetails.jobTypeOptions.remote")}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.jobLocation")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <input
              type="text"
              value={ctx.formData.job_location}
              onChange={(e) => ctx.setFormData("job_location", e.target.value)}
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.languages")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <input
              type="text"
              value={ctx.formData.languages}
              onChange={(e) => ctx.setFormData("languages", e.target.value)}
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.additionalBenefits")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <input
              type="text"
              value={ctx.formData.additional_benefits}
              onChange={(e) =>
                ctx.setFormData("additional_benefits", e.target.value)
              }
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>
        </section>

        <section className="w-full space-y-4 px-6">
          <h4 className="font-bold text-sm">
            {t("createJob.jobDetails.jobSettings")}
          </h4>
          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.jobTags")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[48px]">
              {ctx.formData.job_tags
                .split(",")
                .filter(Boolean)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-white px-2 py-1 rounded text-sm"
                  >
                    {tag.trim()}
                    <button
                      onClick={() => {
                        const tags = ctx.formData.job_tags
                          .split(",")
                          .filter((_, i) => i !== index);
                        ctx.setFormData("job_tags", tags.join(","));
                      }}
                      className="text-gray-500 hover:text-red"
                    >
                      ×
                    </button>
                  </span>
                ))}
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
                placeholder={t("createJob.jobDetails.placeholders.tagsInput")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const newTag = input.value.trim();
                    if (newTag) {
                      const currentTags = ctx.formData.job_tags
                        .split(",")
                        .filter(Boolean);
                      ctx.setFormData(
                        "job_tags",
                        [...currentTags, newTag].join(",")
                      );
                      input.value = "";
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-gray-700">
                {t("createJob.jobDetails.assignRecruiter")}{" "}
                <span className="text-red">
                  {t("createJob.common.required")}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsTeamMemberDialogOpen(true)}
                className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                {t("createJob.jobDetails.addTeamMember")}
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-left flex items-center justify-between"
              >
                <span
                  className={
                    teamMembers?.find(
                      (m) => m.user.id === ctx.formData.recruiter_id
                    )?.user.name
                      ? "text-gray-900"
                      : "text-gray-400"
                  }
                >
                  {teamMembers?.find(
                    (m) => m.user.id === ctx.formData.recruiter_id
                  )?.user.name
                    ? `${
                        teamMembers.find(
                          (m) => m.user.id === ctx.formData.recruiter_id
                        )?.user.name
                      } (${
                        teamMembers.find(
                          (m) => m.user.id === ctx.formData.recruiter_id
                        )?.user.email
                      })`
                    : t("createJob.jobDetails.assignRecruiter")}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  {teamMembers?.map((member) => (
                    <div
                      key={member.user.id}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <div
                        onClick={() => {
                          ctx.setFormData("recruiter_id", member.user.id);
                          setIsDropdownOpen(false);
                        }}
                        className="flex-1 text-sm"
                      >
                        {member.user.name} ({member.user.email})
                      </div>
                      {member.user.id !== member.team.owner.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Are you sure you want to remove this team member?"
                              )
                            ) {
                              deleteTeamMemberMutation.mutate(member.id);
                            }
                          }}
                          className="ml-2 text-gray-400 hover:text-red p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("createJob.jobDetails.recruiterCalendarLink")}{" "}
              <span className="text-red">{t("createJob.common.required")}</span>
            </label>
            <input
              type="text"
              value={ctx.formData.recruiter_calendar_booking_link}
              onChange={(e) =>
                ctx.setFormData(
                  "recruiter_calendar_booking_link",
                  e.target.value
                )
              }
              className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("createJob.jobDetails.startDate")}{" "}
                <span className="text-red">
                  {t("createJob.common.required")}
                </span>
              </label>
              <input
                type="date"
                value={ctx.formData.start_date}
                onChange={(e) => ctx.setFormData("start_date", e.target.value)}
                data-empty={!ctx.formData.start_date}
                className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:light] [&[data-empty=true]]:text-gray-400 text-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("createJob.jobDetails.endDate")}{" "}
                <span className="text-red">
                  {t("createJob.common.required")}
                </span>
              </label>
              <input
                type="date"
                value={ctx.formData.end_date}
                onChange={(e) => ctx.setFormData("end_date", e.target.value)}
                data-empty={!ctx.formData.end_date}
                className="text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:light] [&[data-empty=true]]:text-gray-400 text-gray-900"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("createJob.jobDetails.salaryRangeMin")}{" "}
                <span className="text-red">
                  {t("createJob.common.required")}
                </span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={ctx.formData.salary_range_min || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  ctx.setFormData(
                    "salary_range_min",
                    value ? Number(value) : 0
                  );
                }}
                className={`text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] ${
                  ctx.formData.salary_range_min <= 0 ? "border-red" : ""
                }`}
                placeholder={t("createJob.jobDetails.enterMinimumSalary")}
              />
              {ctx.formData.salary_range_min <= 0 && (
                <p className="mt-1 text-xs text-red">
                  {t("createJob.jobDetails.minimumSalaryError")}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("createJob.jobDetails.salaryRangeMax")}{" "}
                <span className="text-red">
                  {t("createJob.common.required")}
                </span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={ctx.formData.salary_range_max || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  ctx.setFormData(
                    "salary_range_max",
                    value ? Number(value) : 0
                  );
                }}
                className={`text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] ${
                  ctx.formData.salary_range_max <= ctx.formData.salary_range_min
                    ? "border-red"
                    : ""
                }`}
                placeholder={t("createJob.jobDetails.enterMaximumSalary")}
              />
              {ctx.formData.salary_range_max <= ctx.formData.salary_range_min &&
                ctx.formData.salary_range_max > 0 && (
                  <p className="mt-1 text-xs text-red">
                    {t("createJob.jobDetails.maximumSalaryError")}
                  </p>
                )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={ctx.formData.filter_out_salary_range}
                onChange={(e) =>
                  ctx.setFormData("filter_out_salary_range", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {t("createJob.jobDetails.filterSalaryRange")}
              </label>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={ctx.formData.auto_send_interview_email}
                onChange={(e) =>
                  ctx.setFormData("auto_send_interview_email", e.target.checked)
                }
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 flex-1">
                {t("createJob.jobDetails.autoSendInterviewEmail")}
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t("createJob.jobDetails.applicationRequirements")}
              </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ctx.formData.require_cv}
                    onChange={(e) =>
                      ctx.setFormData("require_cv", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">
                    {t("createJob.jobDetails.requirementOptions.cv")}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ctx.formData.require_cover_letter}
                    onChange={(e) =>
                      ctx.setFormData("require_cover_letter", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">
                    {t("createJob.jobDetails.requirementOptions.coverLetter")}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ctx.formData.voicenote_recording}
                    onChange={(e) =>
                      ctx.setFormData("voicenote_recording", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">
                    {t(
                      "createJob.jobDetails.requirementOptions.voicenoteRecording"
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t("createJob.jobDetails.jobVisibility")}
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={ctx.formData.job_visibility}
                    onChange={() => ctx.setFormData("job_visibility", true)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">
                    {t("createJob.jobDetails.visibilityOptions.public")}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!ctx.formData.job_visibility}
                    onChange={() => ctx.setFormData("job_visibility", false)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">
                    {t("createJob.jobDetails.visibilityOptions.private")}
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t("createJob.jobDetails.diversitySettings")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ctx.formData.hide_candidates_personal_details}
                  onChange={(e) =>
                    ctx.setFormData(
                      "hide_candidates_personal_details",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  {t("createJob.jobDetails.hideCandidatesPersonalDetails")}
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full py-6 flex items-center justify-center gap-2">
        <button
          onClick={handleNextClick}
          disabled={!isFormValid() || isGeneratingQuestions}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#009379]/90 transition-colors flex items-center gap-2"
        >
          {isGeneratingQuestions ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t("createJob.jobDetails.pleaseWait")}
            </>
          ) : (
            t("createJob.jobDetails.next")
          )}
        </button>
        {/* Error Messages */}
        {/* {!isFormValid() && (
          <span className="text-sm text-red">
            Please fill in all required fields
          </span>
        )} */}
      </div>

      <Dialog
        open={isTeamMemberDialogOpen}
        onOpenChange={setIsTeamMemberDialogOpen}
      >
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">
                {t("createJob.jobDetails.teamMember.title")}
              </DialogTitle>
              <button
                onClick={() => setIsTeamMemberDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div>
              <label className="text-gray-600 text-base mb-2 block">
                {t("createJob.jobDetails.teamMember.name")}
              </label>
              <input
                type="text"
                value={teamMemberName}
                onChange={(e) => setTeamMemberName(e.target.value)}
                placeholder={t(
                  "createJob.jobDetails.teamMember.namePlaceholder"
                )}
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FF] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 text-base mb-2 block">
                {t("createJob.jobDetails.teamMember.email")}
              </label>
              <input
                type="email"
                value={teamMemberEmail}
                onChange={(e) => setTeamMemberEmail(e.target.value)}
                placeholder={t(
                  "createJob.jobDetails.teamMember.emailPlaceholder"
                )}
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FF] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4 border-t">
              <button
                onClick={handleAddTeamMember}
                disabled={
                  !teamMemberName ||
                  !teamMemberEmail ||
                  addTeamMemberMutation.isPending
                }
                className="w-full py-3 bg-[#065844] text-white rounded-lg text-sm font-medium hover:bg-[#054e3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addTeamMemberMutation.isPending
                  ? t("createJob.jobDetails.teamMember.adding")
                  : t("createJob.jobDetails.teamMember.save")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateJobJobDetails;
