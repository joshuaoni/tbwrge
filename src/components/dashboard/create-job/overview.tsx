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
import { outfit } from "@/constants/app";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

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
  const [createdJobEmbedLink, setCreatedJobEmbedLink] = useState("");
  const [postedJobLink, setPostedJobLink] = useState("");
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
  console.log({ ctx }, ctx.formData);

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
        recruiter_id: ctx.formData.recruiter_id,
        job_questions: questions.map((q) => q.title),
        screening_questions: ctx.formData.screening_questions,
        hiring_flows: ctx.formData.hiring_flows,
      };

      if (ctx.formData.job_id) {
        try {
          return await updateJob(
            userData?.token ?? "",
            ctx.formData.job_id,
            completeFormData
          );
        } catch (error: any) {
          toast.error(error.message || "Failed to update job");
          throw error; // Re-throw to prevent form submission
        }
      } else {
        return await createJob(userData?.token ?? "", completeFormData);
      }
    },
    onSuccess: (data) => {
      const jobDetailsLink = `${window.location.origin}/dashboard/job-board/${data.id}`;
      const jobEmbedLink = `${window.location.origin}/embedded-job-post/${data.id}`;
      const postedJobLink = `${window.location.origin}/dashboard/job-postings?jobId=${data.id}&view=details`;
      setCreatedJobLink(jobDetailsLink);
      setCreatedJobEmbedLink(jobEmbedLink);
      setPostedJobLink(postedJobLink);
      setShowSuccessPopup(true);
    },
    onError: (error) => {
      toast.error("Failed to create job post");
      console.error("Error creating job:", error);
    },
  });

  return (
    <div className={`${outfit.className}`}>
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.goTo("hiring")} className="mr-4">
          <ArrowLeft />
        </button>
        <span>Create Job Post</span>
      </h3>
      <div className="flex gap-8">
        <section className="w-full">
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {ctx.formData.company_logo ? (
                  <Image
                    src={URL.createObjectURL(ctx.formData.company_logo)}
                    alt={ctx.formData.company_name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {ctx.formData.company_name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-2">
                  {ctx.formData.job_title}
                </h1>
                <div className="flex flex-col gap-1">
                  <div className="text-[15px] text-gray-600">
                    {ctx.formData.company_name}
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <span>{ctx.formData.job_location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Job Type</div>
              <div className="font-medium">
                {ctx.formData.job_type.replace("_", " ")}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Experience</div>
              <div className="font-medium">
                {ctx.formData.years_of_experience_required}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Salary Range</div>
              <div className="font-medium">
                {ctx.formData.salary_range_min && ctx.formData.salary_range_max
                  ? `USD ${ctx.formData.salary_range_min.toLocaleString()} - ${ctx.formData.salary_range_max.toLocaleString()}`
                  : "Not specified"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Location</div>
              <div className="font-medium">{ctx.formData.job_location}</div>
            </div>
          </div>

          {ctx.formData.company_description && (
            <Section title="About the Company">
              <p className="text-gray-700 leading-relaxed">
                {ctx.formData.company_description}
              </p>
            </Section>
          )}

          <Section title="Job Description">
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: ctx.formData.job_description }}
            />
          </Section>

          <Section title="Required Skills">
            <div className="flex flex-wrap gap-2">
              {ctx.formData.required_skills.split(",").map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </Section>

          {ctx.formData.educational_requirements && (
            <Section title="Educational Requirements">
              <p className="text-gray-700 leading-relaxed">
                {ctx.formData.educational_requirements}
              </p>
            </Section>
          )}

          {ctx.formData.languages && (
            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {ctx.formData.languages.split(",").map((language: string) => (
                  <span
                    key={language}
                    className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm"
                  >
                    {language.trim()}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {ctx.formData.additional_benefits && (
            <Section title="Additional Benefits">
              <p className="text-gray-700 leading-relaxed">
                {ctx.formData.additional_benefits}
              </p>
            </Section>
          )}

          {ctx.formData.job_tags && (
            <Section title="Tags">
              <div className="flex flex-wrap gap-2">
                {ctx.formData.job_tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </section>

        <section className="w-full h-fit p-6 pb-8">
          <h2 className="text-xl font-semibold mb-6">Job Application</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-[#6B7280] [color-scheme:light]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile Link
              </label>
              <input
                type="url"
                placeholder="Enter link"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Company
              </label>
              <input
                type="text"
                placeholder="Enter N/A if none"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Position
              </label>
              <input
                type="text"
                placeholder="Manager, etc..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]">
                <option value="" className="text-[#6B7280]">
                  Select Nationality
                </option>
                <option value="nig">Nigeria</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country of Residence
              </label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]">
                <option value="" className="text-[#6B7280]">
                  Select Country
                </option>
                <option value="nig">Nigeria</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relevant Experience (Max 300 words)
              </label>
              <textarea
                placeholder="Describe your past roles"
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills Summary (Max 300 words)
              </label>
              <textarea
                placeholder="Highlight your key skills"
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>

            {/* Custom Questions Section */}
            {questions.map((question, i) => (
              <div key={i} className="my-6">
                <div className="flex justify-end gap-2">
                  {editingIndex === i ? (
                    <div
                      onClick={() => handleSaveEdit(i)}
                      className="text-green-600 cursor-pointer"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleEditQuestion(i)}
                      className="text-blue-600 cursor-pointer"
                    >
                      <EditIcon />
                    </div>
                  )}
                  <div
                    onClick={() => handleDeleteQuestion(i)}
                    className="text-red-600 cursor-pointer"
                  >
                    <TrashIcon />
                  </div>
                </div>

                <div className="w-full space-y-2 relative">
                  {editingIndex === i ? (
                    <input
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                    />
                  ) : (
                    <label
                      onClick={() => handleEditQuestion(i)}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {question.title}
                    </label>
                  )}
                  <input
                    placeholder="Type your answer here"
                    value={question.answer}
                    onChange={(e) => handleInputChange(e, i)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                  />
                </div>
              </div>
            ))}

            <div
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
              className="flex items-center gap-2 mt-6 mb-6 justify-center px-4 cursor-pointer"
            >
              <PlusCircleIcon />
              <span className="capitalize font-bold">Add custom question</span>
            </div>

            {ctx.formData.require_cv && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required={ctx.formData.require_cv}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
                />
              </div>
            )}

            {ctx.formData.require_cover_letter && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Cover Letter
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required={ctx.formData.require_cover_letter}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
                />
              </div>
            )}

            {ctx.formData.voicenote_recording && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Application Video/demo
                </label>
                <input
                  type="file"
                  accept="video/*"
                  required={ctx.formData.voicenote_recording}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
                />
              </div>
            )}
          </form>
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
        jobEmbedLink={createdJobEmbedLink}
        postedJobLink={postedJobLink}
      />
    </div>
  );
}

export default CreateJobOverview;
