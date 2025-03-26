import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, CheckIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { createJob, CreateJobResponse, updateJob } from "@/actions/create-job";
import EditIcon from "@/components/icons/edit";
import PlusCircleIcon from "@/components/icons/plus-circle";
import TrashIcon from "@/components/icons/trash";
import { useUserStore } from "@/hooks/use-user-store";
import { CreateJobContext } from "@/providers/job-posting.context";
import {
  DashboardFileGroup,
  DashboardInputGroup,
  DashboardSelectGroup,
  DashboardTextareaGroup,
} from "../input-group";
import Image from "next/image";
import { JobCreatedSuccessPopup } from "./success-popup";

function CreateJobOverview() {
  const [questions, setQuestions] = useState<
    { title: string; answer: string }[]
  >([
    {
      title:
        "Could you describe a project or task you've worked on that best demonstrates your skills for this role?",
      answer: "",
    },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [createdJobLink, setCreatedJobLink] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = e.target.value;
    setQuestions(newQuestions);
  };

  const handleEditQuestion = (index: number) => {
    setEditingIndex(index);
    setNewQuestion(questions[index].title);
  };

  const handleSaveEdit = (index: number) => {
    if (!newQuestion) return toast.error("Question cannot be empty");

    const updatedQuestions = [...questions];
    updatedQuestions[index].title = newQuestion;
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setNewQuestion("");
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const ctx = useContext(CreateJobContext);

  const { userData } = useUserStore();

  const createJobMutation = useMutation<CreateJobResponse>({
    mutationFn: async () => {
      const completeFormData = {
        company_website: ctx.formData.company_website,
        company_name: ctx.formData.company_name,
        company_description: ctx.formData.company_description,
        job_title: ctx.formData.job_title,
        start_date: ctx.formData.start_date,
        end_date: ctx.formData.end_date,
        job_type: ctx.formData.job_type,
        job_description: ctx.formData.job_description,
        required_skills: ctx.formData.required_skills,
        educational_requirements: ctx.formData.educational_requirements,
        additional_benefits: ctx.formData.additional_benefits,
        languages: ctx.formData.languages,
        country_of_residence: "",
        years_of_experience_required: ctx.formData.years_of_experience_required,
        job_location_name: ctx.formData.job_location,
        salary_currency: "USD",
        salary_range_min: ctx.formData.salary_range_min,
        salary_range_max: ctx.formData.salary_range_max,
        filter_out_salary_range: ctx.formData.filter_out_salary_range,
        require_cv: ctx.formData.require_cv,
        require_cover_letter: ctx.formData.require_cover_letter,
        require_voicenote: ctx.formData.voicenote_recording,
        visibility_public: ctx.formData.job_visibility,
        visibility_private: !ctx.formData.job_visibility,
        tags: ctx.formData.job_tags,
        hide_personal_details_during_screening:
          ctx.formData.hide_candidates_personal_details,
        minimum_fit_score: ctx.formData.minimum_fit_score,
        filter_minimum_fit_score: true,
        status: "open",
        auto_send_interview_mail_on_close:
          ctx.formData.auto_send_interview_email,
        candidate_interview_count: 0,
        interview_link: ctx.formData.recruiter_calendar_booking_link,
        company_id: null,
        recruiter_id: userData?.user?.id,
        job_questions: questions.map((q) => q.title),
      };

      if (ctx.formData.job_id) {
        return await updateJob(
          userData?.token ?? "",
          ctx.formData.job_id,
          completeFormData
        );
      } else {
        return await createJob(userData?.token ?? "", completeFormData);
      }
    },
    onSuccess: (data) => {
      const jobLink = `${window.location.origin}/jobs/${data.id}`;
      setCreatedJobLink(jobLink);
      setShowSuccessPopup(true);
    },
    onError: (error) => {
      toast.error("Failed to create job post");
      console.error("Error creating job:", error);
    },
  });

  return (
    <div className="">
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.goTo("hiring")} className="mr-4">
          <ArrowLeft />
        </button>
        <span>Create Job Post</span>
      </h3>
      <div className="flex gap-20">
        <section className="w-full">
          <div className="flex justify-between items-center my-6">
            <span>{ctx.formData.company_name}</span>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-100">
              <Image
                src={
                  ctx.formData.company_logo
                    ? URL.createObjectURL(ctx.formData.company_logo)
                    : "/placeholder-logo.png"
                }
                alt="company logo"
                width={100}
                height={100}
                className="w-full h-full object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <p>{ctx.formData.company_description}</p>
            <p>{ctx.formData.company_website}</p>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold mt-6">Job Information</h4>
          </div>

          {[
            { title: "Job Title", value: ctx.formData.job_title },
            {
              title: "Job Description & Responsibilities",
              value: ctx.formData.job_description,
            },
            {
              title: "Required Skills",
              value: ctx.formData.required_skills
                .split(",")
                .filter(Boolean)
                .map((skill) => skill.trim()),
            },
            {
              title: "Experience",
              value: `Minimum ${ctx.formData.years_of_experience_required} years of professional software development experience`,
            },
            { title: "Job Type", value: ctx.formData.job_type },
            { title: "Location", value: ctx.formData.job_location },
            {
              title: "Salary Range",
              value: `€${ctx.formData.salary_range_min} - €${ctx.formData.salary_range_max} USD per year`,
            },
            {
              title: "Benefits",
              value: ctx.formData.additional_benefits,
            },
            { title: "Job ID", value: "JOB12345" },
            { title: "Job Expiry", value: ctx.formData.end_date || "Not set" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start gap-10 my-6"
            >
              <span className="font-semibold w-1/3">{item.title}</span>
              {Array.isArray(item.value) ? (
                <ul className="list-disc w-full">
                  {item.value.map((val, index) => (
                    <li key={index}>{val}</li>
                  ))}
                </ul>
              ) : (
                <span className="w-full">{item.value}</span>
              )}
            </div>
          ))}
        </section>
        <section className="w-11/12 px-4 h-fit pb-8">
          <h4 className="text-lg font-semibold mb-4">Job Application</h4>

          <form className="space-y-4">
            <DashboardInputGroup label="Full Name" />
            <DashboardInputGroup label="Email" />
            <DashboardInputGroup label="Phone Number" />
            <DashboardInputGroup
              label="Date of Birth"
              placeholder="mm-dd-yyyy"
            />
            <DashboardInputGroup label="Linked Profile Link (optional)" />
            <DashboardInputGroup label="Current Company" />
            <DashboardInputGroup label="Current Position" />
            <DashboardSelectGroup
              title="Nationality"
              defaultValue="Select Nationality"
              options={[{ label: "Nigeria", value: "nig" }]}
              onChange={function (val: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DashboardSelectGroup
              title="Country of Residence"
              defaultValue="Number of years of Experience"
              options={[{ label: "Nigeria", value: "nig" }]}
              onChange={function (val: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DashboardTextareaGroup
              label="Relevant Experience Summary (Max 200 words)"
              placeholder="Describe our your past roles"
            />
            <DashboardTextareaGroup
              label="Relevant Skills Summary (Max 100 words)"
              placeholder="Highlight your key skills"
            />
            <DashboardFileGroup label="Upload CV" />
            <DashboardFileGroup label="Upload Cover Letter(Optional)" />
            <DashboardFileGroup label="Upload Application Voice note(Optional)" />
          </form>

          {questions.map((question, i) => (
            <div key={i} className="my-6">
              <div className="flex justify-end gap-2">
                {editingIndex === i ? (
                  <button
                    onClick={() => handleSaveEdit(i)}
                    className="text-green-600"
                  >
                    <CheckIcon />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditQuestion(i)}
                    className="text-blue-600"
                  >
                    <EditIcon />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteQuestion(i)}
                  className="text-red-600"
                >
                  <TrashIcon />
                </button>
              </div>

              <div className="w-full space-y-2 relative">
                {editingIndex === i ? (
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full rounded text-sm bg-gray-50 focus:outline-none"
                  />
                ) : (
                  <label
                    onClick={() => handleEditQuestion(i)}
                    className="block text-gray-700 text-sm font-medium"
                  >
                    {question.title}
                  </label>
                )}
                <input
                  placeholder="Type your answer here"
                  value={question.answer}
                  onChange={(e) => handleInputChange(e, i)}
                  className="w-full bg-gray-100 p-2 border rounded focus:outline-none"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              setQuestions([
                ...questions,
                {
                  title: "Enter your question here",
                  answer: "",
                },
              ]);
              setEditingIndex(questions.length);
            }}
            className="flex items-center gap-2 mt-6 px-4"
          >
            <PlusCircleIcon />
            <span className="capitalize font-bold">Add custom question</span>
          </button>
        </section>
      </div>
      <div className="w-full py-6 flex items-center justify-center">
        <button
          onClick={() => createJobMutation.mutate()}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg"
        >
          Publish & View Job Post
        </button>
      </div>

      <JobCreatedSuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        jobLink={createdJobLink}
      />
    </div>
  );
}

export default CreateJobOverview;
