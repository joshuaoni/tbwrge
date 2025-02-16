import { CreateJobContext } from "@/providers/job-posting.context";
import Image from "next/image";
import { useContext } from "react";
import { DashboardInputGroup, DashboardTextareaGroup } from "../input-group";
import CreateJobFileGroup from "./file-group";

function CreateJobCompanyDetails() {
  const ctx = useContext(CreateJobContext);

  return (
    <section className="max-w-screen-sm mx-auto space-y-6">
      <h2 className="text-center text-3xl font-semibold">Create a Job Post</h2>

      <form className="space-y-6">
        <DashboardInputGroup
          label="Job Title"
          value={ctx.formData.job_title}
          onChange={(val) => ctx.setFormData("job_title", val)}
        />
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
        <CreateJobFileGroup label="Company Logo" />

        <div className="flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => ctx.goTo("job")}
            className="px-4 py-3 bg-primary text-white font-medium rounded-lg"
          >
            Write your own job post
          </button>

          <button className="flex items-center gap-2 border-2 border-[#009379] px-4 py-3 rounded-lg">
            <span>Generate with AI</span>
            <Image src="/ai-logo.png" alt="ai icon" width={24} height={24} />
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateJobCompanyDetails;
