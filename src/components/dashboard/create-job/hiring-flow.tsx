import { useContext, useMemo, useState } from "react";

import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft } from "lucide-react";
import { DashboardInputGroup } from "../input-group";
import { CreateJobHiringSelectGroup } from "./hiring-select-group";
import { CreateJobModal } from "./modal";

function CreateJobHiringFlow() {
  const ctx = useContext(CreateJobContext);

  const [secondStep, setSecondStep] = useState("");
  const [thirdStep, setThirdStep] = useState("");
  const [fourthStep, setFourthStep] = useState("");

  const [screeningEmailModal, setScreeningEmailModal] = useState(false);
  const [interviewEmailModal, setInterviewModal] = useState(false);
  const [rejectionEmailModal, setRejectionEmailModal] = useState(false);

  const [screeningEmailSubject, setScreeningEmailSubject] = useState("");

  const stepActions = {
    topFitScore: [
      {
        label: "view screening email",
        onClick: () => setScreeningEmailModal(true),
      },
      { label: "view screening page", onClick: () => ctx.goTo("screening") },
    ],
    topSelected: [
      { label: "view interview email", onClick: () => setInterviewModal(true) },
    ],
    topFiltered: [
      {
        label: "view rejection email",
        onClick: () => setRejectionEmailModal(true),
      },
    ],
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
          // onClick={() => ctx.goTo("overview")}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg"
        >
          Publish & View Job Post
        </button>
      </div>

      <CreateJobModal
        visibility={screeningEmailModal}
        setVisibility={() => setScreeningEmailModal(false)}
        showCloseButton
      >
        <div className="max-w-96 w-full py-3 px-4">
          <h4 className="font-bold py-2 border-b">Screening Email</h4>

          <section className="text-sm text-[#898989] pt-4 min-h-[28rem]">
            <h5>Subject: Update on your application for job title</h5>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste
              nobis beatae soluta. Expedita nesciunt ducimus temporibus,
              distinctio sunt iusto repellendus ea reiciendis.
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              totam blanditiis, repudiandae corrupti consequuntur fuga quis?
              Tempore. <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              totam blanditiis, repudiandae corrupti consequuntur fuga quis?
              Tempore, id exercitationem, molestiae hic commodi illo numquam
              laborum.
            </p>
          </section>
          <div className="flex items-center justify-between gap-6 py-4 border-t">
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-md w-full">
              Save
            </button>
            <button className="bg-lightgreen text-white font-semibold px-6 py-3 rounded-md w-full">
              Edit
            </button>
          </div>
        </div>
      </CreateJobModal>
      <CreateJobModal
        visibility={interviewEmailModal}
        setVisibility={() => setInterviewModal(false)}
        showCloseButton
      >
        <div className="max-w-96 w-full py-3 px-4">
          <h4 className="font-bold py-2 border-b">Send Interview Email</h4>

          <section className="text-sm text-[#898989] pt-4 min-h-[28rem]">
            <h5>Subject: Congratulations let's schedule your interview</h5>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste
              nobis beatae soluta. Expedita nesciunt ducimus temporibus,
              distinctio sunt iusto repellendus ea reiciendis.
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              totam blanditiis, repudiandae corrupti consequuntur fuga quis?
              Tempore. <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              totam blanditiis, repudiandae corrupti consequuntur fuga quis?
              Tempore, id exercitationem, molestiae hic commodi illo numquam
              laborum.
            </p>
          </section>
          <div className="flex items-center justify-between gap-6 py-4 border-t">
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-md w-full">
              Save
            </button>
            <button className="bg-lightgreen text-white font-semibold px-6 py-3 rounded-md w-full">
              Edit
            </button>
          </div>
        </div>
      </CreateJobModal>
      <CreateJobModal
        visibility={rejectionEmailModal}
        setVisibility={() => setRejectionEmailModal(false)}
        showCloseButton
      >
        <div className="max-w-96 w-full py-3 px-4">
          <h4 className="font-bold py-2 border-b">Rejection Email</h4>

          <section className="text-sm text-[#898989] pt-4 min-h-[28rem]">
            <h5>Subject: Update on your application for job title</h5>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste
              nobis beatae soluta. Expedita nesciunt ducimus temporibus,
              distinctio sunt iusto repellendus ea reiciendis.
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              totam blanditiis, repudiandae corrupti consequuntur fuga quis?
              Tempore. <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              totam blanditiis, repudiandae corrupti consequuntur fuga quis?
              Tempore, id exercitationem, molestiae hic commodi illo numquam
              laborum.
            </p>
          </section>
          <div className="flex items-center justify-between gap-6 py-4 border-t">
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-md w-full">
              Save
            </button>
            <button className="bg-lightgreen text-white font-semibold px-6 py-3 rounded-md w-full">
              Edit
            </button>
          </div>
        </div>
      </CreateJobModal>
    </div>
  );
}

export default CreateJobHiringFlow;
