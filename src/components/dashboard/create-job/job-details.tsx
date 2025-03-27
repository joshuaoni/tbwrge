import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import {
  DashboardCheckBoxInput,
  DashboardInputGroup,
  DashboardSelectGroup,
  DashboardTextareaGroup,
} from "../input-group";
import { outfit } from "@/constants/app";
function CreateJobJobDetails() {
  const ctx = useContext(CreateJobContext);

  return (
    <div className={`${outfit.className}`}>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description & Requirements
            </label>
            <textarea
              value={ctx.formData.job_description}
              onChange={(e) =>
                ctx.setFormData("job_description", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              rows={6}
            />
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
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] [color-scheme:light]"
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
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] [color-scheme:light]"
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
    </div>
  );
}

export default CreateJobJobDetails;
