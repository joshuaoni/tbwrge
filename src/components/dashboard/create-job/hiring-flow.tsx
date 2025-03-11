import { useContext, useMemo, useState } from "react";

import { INITIAL_HIRING_FLOW_STATE } from "@/constants/create-job.constant";
import { CreateJobContext } from "@/providers/job-posting.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowLeft } from "lucide-react";
import { DashboardInputGroup } from "../input-group";
import { CreateJobHiringSelectGroup } from "./hiring-select-group";
import { CreateJobModal } from "./modal";

const dummyContent = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste
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
    laborum.`;

function CreateJobHiringFlow() {
  const ctx = useContext(CreateJobContext);

  const { secondStep, thirdStep, fourthStep } = ctx.hiringFlow;

  const [screeningEmailModal, setScreeningEmailModal] = useState(false);
  const [interviewEmailModal, setInterviewModal] = useState(false);
  const [rejectionEmailModal, setRejectionEmailModal] = useState(false);

  const [screeningEmail, setScreeningEmail] = useState({
    isEditing: false,
    subject: "Update on your application for job title",
    content: dummyContent,
  });

  const [interviewEmail, setInterviewEmail] = useState({
    isEditing: false,
    subject: "Congratulations let's schedule your interview",
    content: dummyContent,
  });

  const [rejectionEmail, setRejectionEmail] = useState({
    isEditing: false,
    subject: "Update on your application for job title",
    content: dummyContent,
  });

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
          isNaN(ctx.formData.minimum_fit_score)
            ? 0
            : 100 - ctx.formData.minimum_fit_score
        }% Candidates`,
        value: "topFitScore",
        disabled: isDisabled("topFitScore"),
      },
      {
        label: "Send Interview Email Top selected Candidates",
        value: "topSelected",
        disabled: isDisabled("topSelected"),
      },
      {
        label: "Send Rejection Email Top filtered Candidates",
        value: "topFiltered",
        disabled: isDisabled("topFiltered"),
      },
    ],
    [ctx.formData.minimum_fit_score, selectedValues]
  );

  return (
    <div className="">
      <h3 className="text-3xl font-semibold pb-10 flex items-center gap-5">
        <button onClick={() => ctx.prevScreen()}>
          <ArrowLeft />
        </button>
        <span>Hiring Flow</span>
        <button onClick={() => ctx.setHiringFlow(INITIAL_HIRING_FLOW_STATE)}>
          <ReloadIcon />
        </button>
      </h3>

      <section className="w-full grid grid-cols-2 gap-y-4 gap-x-10">
        <DashboardInputGroup
          label="Step 1: Minimum Candidate Fit Score (%)"
          placeholder="70"
          value={ctx.formData.minimum_fit_score.toString()}
          onChange={(val) => ctx.setFormData("minimum_fit_score", Number(val))}
          pattern="[0-9]+"
        />

        {[
          { val: secondStep, key: "secondStep" },
          { val: thirdStep, key: "thirdStep" },
          { val: fourthStep, key: "fourthStep" },
        ].map((item, i) => (
          <div className="space-y-4">
            <CreateJobHiringSelectGroup
              key={i}
              title={"Step " + (i + 2)}
              options={options}
              defaultValue="Choose the next step of your hiring process"
              value={item.val}
              onChange={(val) =>
                ctx.setHiringFlow((prevSteps) => ({
                  ...prevSteps,
                  [item.key]: val,
                }))
              }
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

      {[
        {
          modal: screeningEmailModal,
          setModal: setScreeningEmailModal,
          email: screeningEmail,
          setEmail: setScreeningEmail,
          title: "Edit Screening Email",
        },
        {
          modal: interviewEmailModal,
          setModal: setInterviewModal,
          email: interviewEmail,
          setEmail: setInterviewEmail,
          title: "Edit Interview Email",
        },
        {
          modal: rejectionEmailModal,
          setModal: setRejectionEmailModal,
          email: rejectionEmail,
          setEmail: setRejectionEmail,
          title: "Edit Rejection Email",
        },
      ].map(({ modal, setModal, email, setEmail, title }, index) => (
        <CreateJobModal
          key={index}
          visibility={modal}
          setVisibility={() => setModal(false)}
          showCloseButton
        >
          <div className="max-w-96 w-full py-3 px-4">
            <h4 className="font-bold py-2 border-b">{title}</h4>
            <section className="text-sm text-[#898989] pt-4 min-h-[28rem]">
              {email.isEditing ? (
                <>
                  <label>Subject:</label>
                  <input
                    type="text"
                    value={email.subject}
                    onChange={(e) =>
                      setEmail({
                        ...email,
                        subject: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                </>
              ) : (
                <h5>Subject: {email.subject}</h5>
              )}
              {email.isEditing ? (
                <>
                  <label className="pt-4">Content:</label>
                  <textarea
                    value={email.content}
                    onChange={(e) =>
                      setEmail({
                        ...email,
                        content: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded min-h-[20rem] focus:outline-none"
                  />
                </>
              ) : (
                <p
                  className="py-4"
                  dangerouslySetInnerHTML={{ __html: email.content }}
                />
              )}
            </section>
            <div className="flex items-center justify-between gap-6 py-4 border-t">
              <button
                className="bg-primary text-white font-semibold px-6 py-3 rounded-md w-full"
                onClick={() => setModal(false)}
              >
                Save
              </button>
              <button
                className="bg-lightgreen text-white font-semibold px-6 py-3 rounded-md w-full"
                onClick={() =>
                  email.isEditing
                    ? setEmail({ ...email, isEditing: false })
                    : setEmail({ ...email, isEditing: true })
                }
              >
                {email.isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
        </CreateJobModal>
      ))}
    </div>
  );
}

export default CreateJobHiringFlow;
