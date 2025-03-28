import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft, PlusCircle, X, ChevronDown, Trash2 } from "lucide-react";
import { useContext, useState, useEffect, useRef } from "react";
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

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

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
    content: 'Write job description and responsibilities here...';
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
  const ctx = useContext(CreateJobContext);
  const { userData } = useUserStore();
  const [isTeamMemberDialogOpen, setIsTeamMemberDialogOpen] = useState(false);
  const [teamMemberName, setTeamMemberName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`${outfit.className}`}>
      <style>{quillStyles}</style>
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.prevScreen()} className="mr-4">
          <ArrowLeft />
        </button>
        {ctx.formData.job_title ?? "Job Title is missing"}
      </h3>
      <div className="flex gap-8">
        <section className="w-full space-y-4">
          <h4 className="font-bold">Job Description & Requirements</h4>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Job Description & Responsibilities
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
                    if (value.length <= 1000) {
                      ctx.setFormData("job_description", value);
                    }
                  }}
                  modules={modules}
                  formats={formats}
                  className="bg-gray-50 h-full"
                  style={{ height: "100%" }}
                  placeholder="Write a detailed job description including responsibilities, requirements, and what makes this role unique..."
                />
              </div>
            </div>
          </div>

          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Skills
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
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
                placeholder="Type a skill and press Enter"
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
              Educational Requirements
            </label>
            <input
              type="text"
              value={ctx.formData.educational_requirements}
              onChange={(e) =>
                ctx.setFormData("educational_requirements", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Years of Experience
            </label>
            <input
              type="text"
              value={ctx.formData.years_of_experience_required}
              onChange={(e) =>
                ctx.setFormData("years_of_experience_required", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              value={ctx.formData.job_type}
              onChange={(e) => ctx.setFormData("job_type", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]"
            >
              <option value="">Select Job Type</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Location
            </label>
            <input
              type="text"
              value={ctx.formData.job_location}
              onChange={(e) => ctx.setFormData("job_location", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Languages
            </label>
            <input
              type="text"
              value={ctx.formData.languages}
              onChange={(e) => ctx.setFormData("languages", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Benefits
            </label>
            <input
              type="text"
              value={ctx.formData.additional_benefits}
              onChange={(e) =>
                ctx.setFormData("additional_benefits", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>
        </section>

        <section className="w-full space-y-4 px-6">
          <h4 className="font-bold">Job Settings</h4>
          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Tags
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
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
                placeholder="Type a tag and press Enter"
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
                Assign recruiter
              </span>
              <button
                type="button"
                onClick={() => setIsTeamMemberDialogOpen(true)}
                className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Add a Team Member
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
                    : "Assign recruiter"}
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
                          className="ml-2 text-gray-400 hover:text-red-500 p-1"
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
              Recruiter's Calendar Booking Link
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
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={ctx.formData.start_date}
                onChange={(e) => ctx.setFormData("start_date", e.target.value)}
                data-empty={!ctx.formData.start_date}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:light] [&[data-empty=true]]:text-gray-400 text-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={ctx.formData.end_date}
                onChange={(e) => ctx.setFormData("end_date", e.target.value)}
                data-empty={!ctx.formData.end_date}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:light] [&[data-empty=true]]:text-gray-400 text-gray-900"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range Min
              </label>
              <input
                type="number"
                value={ctx.formData.salary_range_min}
                onChange={(e) =>
                  ctx.setFormData("salary_range_min", Number(e.target.value))
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range Max
              </label>
              <input
                type="number"
                value={ctx.formData.salary_range_max}
                onChange={(e) =>
                  ctx.setFormData("salary_range_max", Number(e.target.value))
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
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
                Filter out Candidates exceeding salary range
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={ctx.formData.auto_send_interview_email}
                onChange={(e) =>
                  ctx.setFormData("auto_send_interview_email", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                Automatically Send Interview Email
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Application Requirements
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
                  <label className="text-sm text-gray-700">CV</label>
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
                  <label className="text-sm text-gray-700">Cover Letter</label>
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
                    Voicenote Recording
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Visibility
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
                    Public (Visible on Job Board)
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
                    Private (Only accessible via generated link or embed code)
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Diversity & Inclusion Settings
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
                  Hide Candidates Names or personal details during initial
                  screening
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full py-6 flex items-center justify-center">
        <button
          onClick={() => {
            ctx.goTo("hiring");
            // set query params
          }}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg"
        >
          Next
        </button>
      </div>

      <Dialog
        open={isTeamMemberDialogOpen}
        onOpenChange={setIsTeamMemberDialogOpen}
      >
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">
                Add a Team Member
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
              <label className="text-gray-600 text-base mb-2 block">Name</label>
              <input
                type="text"
                value={teamMemberName}
                onChange={(e) => setTeamMemberName(e.target.value)}
                placeholder="John James"
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FF] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 text-base mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={teamMemberEmail}
                onChange={(e) => setTeamMemberEmail(e.target.value)}
                placeholder="John@gmail.com"
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
                {addTeamMemberMutation.isPending ? "Adding..." : "Save"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateJobJobDetails;
