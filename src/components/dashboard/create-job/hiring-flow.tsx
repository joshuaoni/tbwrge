import { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { INITIAL_HIRING_FLOW_STATE } from "@/constants/create-job.constant";
import { CreateJobContext } from "@/providers/job-posting.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowLeft } from "lucide-react";
import { DashboardInputGroup } from "../input-group";
import { CreateJobHiringSelectGroup } from "./hiring-select-group";
import { CreateJobModal } from "./modal";
import { outfit } from "@/constants/app";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const formats = ["bold", "italic", "underline", "list", "bullet"];

const dummyContent = `Subject: Congratulations let's schedule your interview
    <br />
    <br />
    <br />
    Dear [Candidate's name],
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
    <br />
    <br />
    [Schedule your interview](insert link here)
    <br />
    <br />
    Best Regards [Recruiter's name]`;

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
    <div className={`${outfit.className}`}>
      <h3 className="text-3xl font-semibold pb-10 flex items-center gap-5">
        <button onClick={() => ctx.prevScreen()}>
          <ArrowLeft />
        </button>
        <span>Hiring Flow</span>
        <button
          onClick={() => {
            ctx.setHiringFlow(INITIAL_HIRING_FLOW_STATE);
            ctx.setFormData("minimum_fit_score", 0);
          }}
        >
          <ReloadIcon />
        </button>
      </h3>

      <section className="w-full grid grid-cols-2 gap-y-4 gap-x-12 pr-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Step 1: Minimum Candidate Fit Score (%)
          </label>
          <input
            type="text"
            placeholder="70"
            value={
              ctx.formData.minimum_fit_score === 0
                ? ""
                : ctx.formData.minimum_fit_score.toString()
            }
            onChange={(e) =>
              ctx.setFormData("minimum_fit_score", Number(e.target.value))
            }
            pattern="[0-9]+"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>

        {[
          { val: secondStep, key: "secondStep" },
          { val: thirdStep, key: "thirdStep" },
          { val: fourthStep, key: "fourthStep" },
        ].map((item, i) => (
          <div className="space-y-4" key={i}>
            <CreateJobHiringSelectGroup
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
              <div className="w-3/5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please input the quantity of top candidates
                </label>
                <input
                  type="text"
                  placeholder="10"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>
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
          <div className="max-w-96 w-full pt-2 px-4">
            <h4 className="font-bold py-2 border-b">{title}</h4>
            <section className="flex flex-col justify-center text-sm text-[#898989] min-h-[28rem] space-y-4">
              {email.isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Edit Content
                    </label>
                    <div className="min-h-[20rem] border border-gray-200 rounded-lg overflow-hidden">
                      <ReactQuill
                        theme="snow"
                        value={email.content}
                        onChange={(value) =>
                          setEmail({
                            ...email,
                            content: value,
                          })
                        }
                        modules={modules}
                        formats={formats}
                        className="h-[calc(20rem-42px)]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div
                      className="mt-1 prose prose-sm max-w-none text-[#898989] mb-8"
                      dangerouslySetInnerHTML={{ __html: email.content }}
                    />
                  </div>
                </>
              )}
            </section>
            <div className="flex items-center justify-between gap-6 py-4 border-t">
              <button
                className="bg-primary text-white text-[12px] px-6 py-3 rounded-[4px] w-full hover:bg-[#007a61] transition-colors"
                onClick={() => setEmail({ ...email, isEditing: false })}
              >
                Save
              </button>
              <button
                className="bg-[#009379] text-white text-[12px] px-6 py-3 rounded-[4px] w-full hover:bg-gray-200 transition-colors"
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
