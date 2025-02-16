import { useContext } from "react";

import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft } from "lucide-react";
import { DashboardInputGroup, DashboardSelectGroup } from "../input-group";

function CreateJobHiringFlow() {
  const ctx = useContext(CreateJobContext);

  return (
    <div className="">
      <h3 className="text-3xl font-semibold pb-10">
        {" "}
        <button onClick={() => ctx.prevScreen()} className="mr-4">
          <ArrowLeft />
        </button>
        Hiring Flow
      </h3>
      <div className="flex gap-20 items-start ">
        <section className="w-full space-y-4">
          <DashboardInputGroup
            label="Step 1"
            placeholder="First state application fit score"
          />
          <DashboardInputGroup
            label="Minimum Candidate Fit Score"
            placeholder="70%"
            className="w-1/3"
          />

          <DashboardSelectGroup
            className="pt-14"
            title="Step 2"
            options={[
              {
                label: "Send Screening Email Top 30% Candidates",
                value: "30_candidates",
              },
              {
                label: "Send Screening Email Top selected Candidates",
                value: "30_candidates",
              },
              {
                label: "Send Screening Email Top filtered Candidates",
                value: "30_candidates",
              },
            ]}
            defaultValue="Send Screening Email Top 30% Candidates"
            onChange={function (val: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </section>
        <section className="w-full space-y-4">
          <DashboardSelectGroup
            title="Step 3"
            options={[
              {
                label: "Send Screening Email Top 30% Candidates",
                value: "30_candidates",
              },
              {
                label: "Send Screening Email Top selected Candidates",
                value: "30_candidates",
              },
              {
                label: "Send Screening Email Top filtered Candidates",
                value: "30_candidates",
              },
            ]}
            defaultValue="Send Screening Email Top Selected Candidates"
            onChange={function (val: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <DashboardInputGroup
            label="Please input the quantity of top candidates"
            placeholder="70%"
            className="w-1/3"
          />

          <DashboardSelectGroup
            className="pt-14"
            title="Step 4"
            options={[
              {
                label: "Send Screening Email Top 30% Candidates",
                value: "30_candidates",
              },
              {
                label: "Send Screening Email Top selected Candidates",
                value: "30_candidates",
              },
              {
                label: "Send Screening Email Top filtered Candidates",
                value: "30_candidates",
              },
            ]}
            defaultValue="Send Screening Email Top Filtered Candidates"
            onChange={function (val: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </section>
      </div>

      <div className="w-full py-6 flex items-center justify-center">
        <button
          onClick={() => ctx.goTo("overview")}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg"
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
}

export default CreateJobHiringFlow;
