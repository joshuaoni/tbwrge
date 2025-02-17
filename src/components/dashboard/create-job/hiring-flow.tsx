import { useContext, useMemo, useState } from "react";

import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft } from "lucide-react";
import { DashboardInputGroup } from "../input-group";
import { CreateJobHiringSelectGroup } from "./hiring-select-group";

function CreateJobHiringFlow() {
  const ctx = useContext(CreateJobContext);

  const [secondStep, setSecondStep] = useState("");
  const [thirdStep, setThirdStep] = useState("");
  const [fourthStep, setFourthStep] = useState("");

  const stepActions = {
    topFitScore: [
      { label: "view screening email", onClick: () => {} },
      { label: "view screening page", onClick: () => {} },
    ],
    topSelected: [{ label: "view interview email", onClick: () => {} }],
    topFiltered: [{ label: "view rejection email", onClick: () => {} }],
  };

  function actionsVal(step: string) {
    return step !== "" ? stepActions[step as keyof typeof stepActions] : [];
  }

  const selectedValues = [secondStep, thirdStep, fourthStep].filter(Boolean);

  const isDisabled = (value: string) => selectedValues.includes(value);

  const options = useMemo(
    () => [
      {
        label: `Send Screening Email Top ${
          100 - ctx.formData.minimum_fit_score
        }% Candidates`,
        value: "topFitScore",
        disabled: isDisabled("topFitScore"),
      },
      {
        label: "Send Screening Email Top selected Candidates",
        value: "topSelected",
        disabled: isDisabled("topSelected"),
      },
      {
        label: "Send Screening Email Top filtered Candidates",
        value: "topFiltered",
        disabled: isDisabled("topFiltered"),
      },
    ],
    [ctx.formData.minimum_fit_score, selectedValues]
  );

  return (
    <div className="">
      <h3 className="text-3xl font-semibold pb-10">
        <button onClick={() => ctx.prevScreen()} className="mr-4">
          <ArrowLeft />
        </button>
        Hiring Flow
      </h3>

      <section className="w-full grid grid-cols-2 gap-y-4 gap-x-10">
        <DashboardInputGroup
          label="Step 1: Minimum Candidate Fit Score"
          placeholder="70%"
          value={ctx.formData.minimum_fit_score.toString()}
          onChange={(val) => ctx.setFormData("minimum_fit_score", val)}
        />

        {[
          { val: secondStep, state: setSecondStep },
          { val: thirdStep, state: setThirdStep },
          { val: fourthStep, state: setFourthStep },
        ].map((item, i) => (
          <div className="space-y-4">
            <CreateJobHiringSelectGroup
              key={i}
              title={"Step " + (i + 2)}
              options={options}
              defaultValue="Choose the next step of your hiring process"
              onChange={(val) => item.state(val)}
              actions={actionsVal(item.val)}
            />
            {item.val == "topSelected" && (
              <DashboardInputGroup
                label="Please input the quantity of top candidates"
                placeholder="70%"
                className="w-3/5"
              />
            )}
          </div>
        ))}
      </section>

      <div className="w-full py-6 flex items-center justify-center">
        <button
          onClick={() => ctx.goTo("overview")}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg"
        >
          Publish & View Job Post
        </button>
      </div>
    </div>
  );
}

export default CreateJobHiringFlow;
