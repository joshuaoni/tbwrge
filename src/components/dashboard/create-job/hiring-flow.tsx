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

const screeningEmailTemplate = `Subject: Application Update - Next Steps for [Job Title] Position
<br />
<br />
Dear [Candidate's Name],
<br />
<br />
Thank you for applying to the [Job Title] position at [Company Name]. We're impressed with your profile and would like to learn more about your experience and skills.
<br />
<br />
As the next step in our process, we've prepared a few screening questions to better understand your qualifications. Please take your time to thoughtfully respond to each question.
<br />
<br />
[Link to Screening Questions]
<br />
<br />
Please complete these questions within the next 5 business days. Your responses will help us evaluate your fit for the role.
<br />
<br />
Best regards,
<br />
[Recruiter's Name]
[Company Name]`;

const interviewEmailTemplate = `Subject: Interview Invitation - [Job Title] Position
<br />
<br />
Dear [Candidate's Name],
<br />
<br />
We're excited to move forward with your application for the [Job Title] position at [Company Name]. Your qualifications and experience align well with what we're looking for, and we'd love to schedule an interview to discuss the role in detail.
<br />
<br />
Please use the link below to select an interview time that works best for you:
<br />
[Calendar Booking Link]
<br />
<br />
The interview will be approximately [Duration] and will be conducted [Format: video/in-person].
<br />
<br />
Looking forward to speaking with you!
<br />
<br />
Best regards,
[Recruiter's Name]
[Company Name]`;

const rejectionEmailTemplate = `Subject: Update on Your Application for [Job Title]
<br />
<br />
Dear [Candidate's Name],
<br />
<br />
Thank you for taking the time to apply for the [Job Title] position at [Company Name] and for your interest in joining our team.
<br />
<br />
After careful consideration of all applications, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.
<br />
<br />
We appreciate your interest in [Company Name] and encourage you to apply for future positions that match your skills and experience.
    <br />
    <br />
We wish you the best in your job search and future career endeavors.
<br />
    <br />
Best regards,
[Recruiter's Name]
[Company Name]`;

function CreateJobHiringFlow() {
  const ctx = useContext(CreateJobContext);

  const { secondStep, thirdStep, fourthStep } = ctx.hiringFlow;

  const [screeningEmailModal, setScreeningEmailModal] = useState(false);
  const [interviewEmailModal, setInterviewModal] = useState(false);
  const [rejectionEmailModal, setRejectionEmailModal] = useState(false);
  const [interviewValue, setInterviewValue] = useState<string>("");

  const [screeningEmail, setScreeningEmail] = useState({
    isEditing: false,
    subject: "Update on your application",
    content: screeningEmailTemplate,
  });

  const [interviewEmail, setInterviewEmail] = useState({
    isEditing: false,
    subject: "Interview Invitation",
    content: interviewEmailTemplate,
  });

  const [rejectionEmail, setRejectionEmail] = useState({
    isEditing: false,
    subject: "Application Update",
    content: rejectionEmailTemplate,
  });

  // Update hiring flows when steps change
  const updateHiringFlows = (step: string, stepNumber: number) => {
    if (!step) return;

    console.log("Current minimum_fit_score:", ctx.formData.minimum_fit_score);
    const screeningValue = 100 - ctx.formData.minimum_fit_score;
    console.log("Calculated screening value:", screeningValue);

    const newFlow = {
      title: (step === "topFitScore"
        ? "screening"
        : step === "topSelected"
        ? "interview"
        : "rejection") as "screening" | "interview" | "rejection",
      value:
        step === "topFitScore"
          ? screeningValue
          : step === "topSelected"
          ? Number(interviewValue) || null
          : null,
      step: stepNumber,
      email_template:
        step === "topFitScore"
          ? screeningEmail.content
          : step === "topSelected"
          ? interviewEmail.content
          : rejectionEmail.content,
    };

    console.log("New flow:", newFlow);

    const existingFlows = [...ctx.formData.hiring_flows];
    const flowIndex = existingFlows.findIndex((f) => f.step === stepNumber);

    if (flowIndex !== -1) {
      existingFlows[flowIndex] = newFlow;
    } else {
      existingFlows.push(newFlow);
    }

    ctx.setFormData("hiring_flows", existingFlows);
  };

  // Update fit score when minimum score changes
  const updateFitScore = (score: number) => {
    console.log("Updating fit score to:", score);
    const existingFlows = [...ctx.formData.hiring_flows];
    const fitScoreFlow = existingFlows.find((f) => f.title === "fit_score");

    if (fitScoreFlow) {
      fitScoreFlow.value = score;
    }

    // Find and update screening flow if it exists
    const screeningFlow = existingFlows.find((f) => f.title === "screening");
    if (screeningFlow) {
      screeningFlow.value = 100 - score;
      console.log("Updated screening value to:", screeningFlow.value);
    }

    ctx.setFormData("hiring_flows", existingFlows);
    ctx.setFormData("minimum_fit_score", score);
  };

  const stepActions = {
    topFitScore: [
      {
        label: "View & edit screening email",
        onClick: () => setScreeningEmailModal(true),
      },
      {
        label: "View & edit screening page",
        onClick: () => ctx.goTo("screening"),
      },
    ],
    topSelected: [
      {
        label: "View & edit interview email",
        onClick: () => setInterviewModal(true),
      },
    ],
    topFiltered: [
      {
        label: "View & edit rejection email",
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
        label: `Send Interview Email Top ${interviewValue || 0} Candidates`,
        value: "topSelected",
        disabled: isDisabled("topSelected"),
      },
      {
        label: "Send Rejection Email to Filtered Candidates",
        value: "topFiltered",
        disabled: isDisabled("topFiltered"),
      },
    ],
    [ctx.formData.minimum_fit_score, selectedValues, interviewValue]
  );

  const renderActions = (actions: { label: string; onClick: () => void }[]) => {
    return actions.map((action, index) => (
      <button
        key={index}
        onClick={action.onClick}
        className="text-primary hover:text-primary/80"
      >
        {action.label}
      </button>
    ));
  };

  const isFormValid = () => {
    // Check if minimum fit score is valid
    if (
      !ctx.formData.minimum_fit_score ||
      ctx.formData.minimum_fit_score <= 0
    ) {
      return false;
    }

    // Check if any step has "topSelected" but no valid interview value
    const steps = [secondStep, thirdStep, fourthStep];
    const hasInvalidInterviewStep = steps.some(
      (step) =>
        step === "topSelected" &&
        (!interviewValue || Number(interviewValue) <= 0)
    );

    if (hasInvalidInterviewStep) {
      return false;
    }

    return true;
  };

  return (
    <div className={`${outfit.className}`}>
      <h3 className="text-sm font-semibold flex items-center gap-1">
        <button onClick={() => ctx.prevScreen()}>
          <ArrowLeft width={16} height={16} />
        </button>
        <span>Hiring Flow</span>
        <button
          onClick={() => {
            ctx.setHiringFlow(INITIAL_HIRING_FLOW_STATE);

            updateFitScore(70);
          }}
        >
          <ReloadIcon />
        </button>
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Step 1 */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="h-16">
              {/* Empty space to match action buttons */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                onChange={(e) => updateFitScore(Number(e.target.value))}
                pattern="[0-9]+"
                className="text-sm w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex flex-col gap-2 h-16 justify-end">
              {stepActions[secondStep as keyof typeof stepActions]?.map(
                (action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="text-[#009379] hover:text-[#009379]/80 text-right"
                  >
                    {action.label}
                  </button>
                )
              )}
            </div>
            <CreateJobHiringSelectGroup
              title="Step 2"
              options={options}
              defaultValue="Choose the next step of your hiring process"
              value={secondStep}
              onChange={(val) => {
                ctx.setHiringFlow((prevSteps) => ({
                  ...prevSteps,
                  secondStep: val,
                }));
                updateHiringFlows(val, 2);
              }}
            />
            {secondStep === "topSelected" && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please input the quantity of top candidates
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Example: 10"
                  value={interviewValue}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const numValue = value ? Number(value) : 0;
                    setInterviewValue(value);
                    const existingFlows = [...ctx.formData.hiring_flows];
                    const flowIndex = existingFlows.findIndex(
                      (f) => f.step === 2
                    );

                    const newFlow = {
                      title: "interview" as const,
                      value: numValue,
                      step: 2,
                      email_template: interviewEmail.content,
                    };

                    if (flowIndex !== -1) {
                      existingFlows[flowIndex] = newFlow;
                    } else {
                      existingFlows.push(newFlow);
                    }

                    ctx.setFormData("hiring_flows", existingFlows);
                  }}
                  className={`text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] ${
                    !interviewValue || Number(interviewValue) <= 0
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {(!interviewValue || Number(interviewValue) <= 0) && (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter a valid number greater than 0
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex flex-col gap-2 h-16 justify-end">
              {stepActions[thirdStep as keyof typeof stepActions]?.map(
                (action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="text-[#009379] hover:text-[#009379]/80 text-right"
                  >
                    {action.label}
                  </button>
                )
              )}
            </div>
            <CreateJobHiringSelectGroup
              title="Step 3"
              options={options}
              defaultValue="Choose the next step of your hiring process"
              value={thirdStep}
              onChange={(val) => {
                ctx.setHiringFlow((prevSteps) => ({
                  ...prevSteps,
                  thirdStep: val,
                }));
                updateHiringFlows(val, 3);
              }}
            />
            {thirdStep === "topSelected" && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please input the quantity of top candidates
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="10"
                  value={interviewValue}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const numValue = value ? Number(value) : 0;
                    setInterviewValue(value);
                    const existingFlows = [...ctx.formData.hiring_flows];
                    const flowIndex = existingFlows.findIndex(
                      (f) => f.step === 3
                    );

                    const newFlow = {
                      title: "interview" as const,
                      value: numValue,
                      step: 3,
                      email_template: interviewEmail.content,
                    };

                    if (flowIndex !== -1) {
                      existingFlows[flowIndex] = newFlow;
                    } else {
                      existingFlows.push(newFlow);
                    }

                    ctx.setFormData("hiring_flows", existingFlows);
                  }}
                  className={`text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] ${
                    !interviewValue || Number(interviewValue) <= 0
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {(!interviewValue || Number(interviewValue) <= 0) && (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter a valid number greater than 0
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex flex-col gap-2 h-16 justify-end">
              {stepActions[fourthStep as keyof typeof stepActions]?.map(
                (action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="text-[#009379] hover:text-[#009379]/80 text-right"
                  >
                    {action.label}
                  </button>
                )
              )}
            </div>
            <CreateJobHiringSelectGroup
              title="Step 4"
              options={options}
              defaultValue="Choose the next step of your hiring process"
              value={fourthStep}
              onChange={(val) => {
                ctx.setHiringFlow((prevSteps) => ({
                  ...prevSteps,
                  fourthStep: val,
                }));
                updateHiringFlows(val, 4);
              }}
            />
            {fourthStep === "topSelected" && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please input the quantity of top candidates
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="10"
                  value={interviewValue}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const numValue = value ? Number(value) : 0;
                    setInterviewValue(value);
                    const existingFlows = [...ctx.formData.hiring_flows];
                    const flowIndex = existingFlows.findIndex(
                      (f) => f.step === 4
                    );

                    const newFlow = {
                      title: "interview" as const,
                      value: numValue,
                      step: 4,
                      email_template: interviewEmail.content,
                    };

                    if (flowIndex !== -1) {
                      existingFlows[flowIndex] = newFlow;
                    } else {
                      existingFlows.push(newFlow);
                    }

                    ctx.setFormData("hiring_flows", existingFlows);
                  }}
                  className={`text-sm w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] ${
                    !interviewValue || Number(interviewValue) <= 0
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {(!interviewValue || Number(interviewValue) <= 0) && (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter a valid number greater than 0
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full py-6 flex items-center justify-center gap-2">
        <button
          onClick={() => ctx.goTo("overview")}
          disabled={!isFormValid()}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#009379]/90 transition-colors"
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
          step: 2,
        },
        {
          modal: interviewEmailModal,
          setModal: setInterviewModal,
          email: interviewEmail,
          setEmail: setInterviewEmail,
          title: "Edit Interview Email",
          step: 3,
        },
        {
          modal: rejectionEmailModal,
          setModal: setRejectionEmailModal,
          email: rejectionEmail,
          setEmail: setRejectionEmail,
          title: "Edit Rejection Email",
          step: 4,
        },
      ].map(({ modal, setModal, email, setEmail, title, step }, index) => (
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
                        onChange={(value) => {
                          setEmail({
                            ...email,
                            content: value,
                          });
                        }}
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
                onClick={() => {
                  setEmail({ ...email, isEditing: false });
                  // Update hiring flows with new email template
                  const flows = [...ctx.formData.hiring_flows];
                  const flowIndex = flows.findIndex((f) => f.step === step);
                  if (flowIndex !== -1) {
                    flows[flowIndex].email_template = email.content;
                    ctx.setFormData("hiring_flows", flows);
                  }
                }}
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
