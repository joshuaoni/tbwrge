import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { CreateJobResponse, createJobWithAi } from "@/actions/create-job";
import { useUserStore } from "@/hooks/use-user-store";
import { CreateJobContext } from "@/providers/job-posting.context";
import toast from "react-hot-toast";
import { DashboardInputGroup, DashboardTextareaGroup } from "../input-group";
import CreateJobFileGroup from "./file-group";

function CreateJobCompanyDetails() {
  const ctx = useContext(CreateJobContext);

  const { userData } = useUserStore();

  const createJobWithAiMutation = useMutation<CreateJobResponse>({
    mutationFn: async () => await createJobWithAi(userData?.token ?? ""),
    onSuccess: (res) => {
      toast.success("Job post generated successfully");
      ctx.setFormData("company_name", res.company_name);
      ctx.setFormData("company_website", res.company_website);
      ctx.setFormData("company_description", res.company_description);
      ctx.setFormData("job_description", res.job_description);
      ctx.setFormData("required_skills", res.required_skills);
      ctx.setFormData("educational_requirements", res.educational_requirements);
      ctx.setFormData(
        "years_of_experience_required",
        res.years_of_experience_required
      );
      ctx.setFormData("job_title", res.job_title);
      ctx.setFormData("job_location", res.job_location_name);
      ctx.setFormData("job_type", res.job_type);
      ctx.setFormData("languages", res.languages);
      ctx.setFormData("job_tags", res.tags);
    },
  });

  return (
    <section className="max-w-screen-sm mx-auto space-y-6">
      <h2 className="text-center text-3xl font-semibold">Create a Job Post</h2>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          createJobWithAiMutation.mutate();
        }}
      >
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

          <button
            disabled={createJobWithAiMutation.isPending}
            className="flex items-center gap-2 border-2 border-[#009379] px-4 py-3 rounded-lg disabled:cursor-not-allowed disabled:bg-black/10"
          >
            <span>
              {createJobWithAiMutation.isPending
                ? "Generating Job Post..."
                : "Generate with AI"}
            </span>
            {createJobWithAiMutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Image src="/ai-logo.png" alt="ai icon" width={24} height={24} />
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateJobCompanyDetails;
