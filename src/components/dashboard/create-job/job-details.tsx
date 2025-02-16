import { CreateJobContext } from "@/providers/job-posting.context";
import { useContext } from "react";
import {
  DashboardCheckBoxInput,
  DashboardInputGroup,
  DashboardTextareaGroup,
} from "../input-group";

function CreateJobJobDetails() {
  const ctx = useContext(CreateJobContext);

  return (
    <div className="">
      <h3 className="text-3xl font-semibold py-4">Job Title</h3>
      <div className="flex gap-20">
        <section className="w-full space-y-4">
          <h4 className="font-bold">Job Description & Requirements</h4>
          <DashboardTextareaGroup label="Job Decription & Requirements" />
          <DashboardInputGroup label="Required Skills" />
          <DashboardInputGroup label="Educational Requirements" />
          <DashboardInputGroup label="Required Years of Experience" />
          <DashboardInputGroup label="Job Type" />
          <DashboardInputGroup label="Job Location" />
          <DashboardInputGroup label="Languages" />
        </section>
        <section className="w-full space-y-4">
          <h4 className="font-bold">Job Settings</h4>
          <DashboardInputGroup label="Job Tags" />
          <DashboardInputGroup label="Recruiter's Calendar Booking Link" />
          <div className="flex gap-4">
            <DashboardInputGroup label="Start Date" />
            <DashboardInputGroup label="End Date" />
          </div>
          <div className="flex gap-4">
            <DashboardInputGroup label="Salary Range" />
            <DashboardInputGroup label="Salary Range" />
          </div>
          <DashboardCheckBoxInput label="Filter out Candidates exceeding salary range" />
          <DashboardCheckBoxInput label="Automatically Send Interview Email" />
          <div>
            <label>Application Requirements</label>
            <div className="flex justify-between items-center gap-2">
              <DashboardCheckBoxInput label="CV" />
              <DashboardCheckBoxInput label="Cover Letter" />
              <DashboardCheckBoxInput label="Voicenote Recording" />
            </div>
          </div>

          <div className="space-y-2">
            <label>Job Visibility</label>
            <DashboardCheckBoxInput label="Public (Visible on Job Board)" />
            <DashboardCheckBoxInput label="Private (Only accessible via generated link or embed code)" />
          </div>

          <div>
            <label className="pb-2">Diversity & Inclusion Settings</label>
            <DashboardCheckBoxInput label="Hide Candidates Names or personal details during initial screening" />
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
