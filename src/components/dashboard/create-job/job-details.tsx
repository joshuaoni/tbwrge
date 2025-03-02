import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import {
  DashboardCheckBoxInput,
  DashboardInputGroup,
  DashboardSelectGroup,
  DashboardTextareaGroup,
} from "../input-group";

function CreateJobJobDetails() {
  const ctx = useContext(CreateJobContext);

  return (
    <div className="">
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.prevScreen()} className="mr-4">
          <ArrowLeft />
        </button>
        {ctx.formData.job_title ?? "Job Title is missing"}
      </h3>
      <div className="flex gap-20">
        <section className="w-full space-y-4">
          <h4 className="font-bold">Job Description & Requirements</h4>
          <DashboardTextareaGroup
            label="Job Decription & Requirements"
            value={ctx.formData.job_description}
            onChange={(val) => ctx.setFormData("job_description", val)}
          />
          <DashboardInputGroup
            label="Required Skills"
            value={ctx.formData.required_skills}
            onChange={(val) => ctx.setFormData("required_skills", val)}
          />
          <DashboardInputGroup
            label="Educational Requirements"
            value={ctx.formData.educational_requirements}
            onChange={(val) => ctx.setFormData("educational_requirements", val)}
          />
          <DashboardInputGroup
            label="Required Years of Experience"
            value={ctx.formData.years_of_experience_required}
            onChange={(val) =>
              ctx.setFormData("years_of_experience_required", val)
            }
          />
          <DashboardSelectGroup
            title="Job Type"
            defaultValue="Select Job Type"
            options={[
              { label: "Full Time", value: "full-time" },
              { label: "Part Time", value: "part-time" },
              { label: "Contract", value: "contract" },
              { label: "Internship", value: "internship" },
              { label: "Remote", value: "remote" },
            ]}
            onChange={function (val: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <DashboardInputGroup
            label="Job Location"
            value={ctx.formData.job_location}
            onChange={(val) => ctx.setFormData("job_location", val)}
          />
          <DashboardInputGroup
            label="Languages"
            value={ctx.formData.languages}
            onChange={(val) => ctx.setFormData("languages", val)}
          />
        </section>
        <section className="w-full space-y-4">
          <h4 className="font-bold">Job Settings</h4>
          <DashboardInputGroup
            label="Job Tags"
            value={ctx.formData.job_tags}
            onChange={(val) => ctx.setFormData("job_tags", val)}
          />
          <DashboardInputGroup
            label="Recruiter's Calendar Booking Link"
            value={ctx.formData.recruiter_calendar_booking_link}
            onChange={(v) =>
              ctx.setFormData("recruiter_calendar_booking_link", v)
            }
          />
          <div className="flex gap-4">
            <DashboardInputGroup
              label="Start Date"
              value={ctx.formData.start_date}
              onChange={(val) => ctx.setFormData("start_date", val)}
            />
            <DashboardInputGroup
              label="End Date"
              value={ctx.formData.end_date}
              onChange={(val) => ctx.setFormData("end_date", val)}
            />
          </div>
          <div className="flex gap-4">
            <DashboardInputGroup
              label="Salary Range Min"
              value={String(ctx.formData.salary_range_min)}
              onChange={(val) =>
                ctx.setFormData("salary_range_min", Number(val))
              }
            />
            <DashboardInputGroup
              label="Salary Range Max"
              value={String(ctx.formData.salary_range_max)}
              onChange={(val) =>
                ctx.setFormData("salary_range_max", Number(val))
              }
            />
          </div>
          <DashboardCheckBoxInput
            label="Filter out Candidates exceeding salary range"
            value={ctx.formData.filter_out_salary_range}
            onChange={(val) => ctx.setFormData("filter_out_salary_range", val)}
          />
          <DashboardCheckBoxInput
            label="Automatically Send Interview Email"
            value={ctx.formData.auto_send_interview_email}
            onChange={(val) =>
              ctx.setFormData("auto_send_interview_email", val)
            }
          />
          <div>
            <label>Application Requirements</label>
            <div className="flex justify-between items-center gap-2">
              <DashboardCheckBoxInput
                label="CV"
                value={ctx.formData.require_cv}
                onChange={(val) => ctx.setFormData("require_cv", val)}
              />
              <DashboardCheckBoxInput
                label="Cover Letter"
                value={ctx.formData.require_cover_letter}
                onChange={(val) => ctx.setFormData("require_cover_letter", val)}
              />
              <DashboardCheckBoxInput
                label="Voicenote Recording"
                value={ctx.formData.voicenote_recording}
                onChange={(val) => ctx.setFormData("voicenote_recording", val)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>Job Visibility</label>
            <DashboardCheckBoxInput
              label="Public (Visible on Job Board)"
              value={ctx.formData.job_visibility}
              onChange={() => ctx.setFormData("job_visibility", true)}
            />
            <DashboardCheckBoxInput
              label="Private (Only accessible via generated link or embed code)"
              value={!ctx.formData.job_visibility}
              onChange={() => ctx.setFormData("job_visibility", false)}
            />
          </div>

          <div>
            <label className="pb-2">Diversity & Inclusion Settings</label>
            <DashboardCheckBoxInput
              label="Hide Candidates Names or personal details during initial screening"
              value={ctx.formData.hide_candidates_personal_details}
              onChange={(val) =>
                ctx.setFormData("hide_candidates_personal_details", val)
              }
            />
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
