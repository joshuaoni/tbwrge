import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckIcon,
  Edit as EditIcon,
  Trash as TrashIcon,
  PlusCircle as PlusCircleIcon,
  Loader2,
  X,
} from "lucide-react";
import { outfit } from "@/constants/app";
import Image from "next/image";
import toast from "react-hot-toast";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getJobDetail } from "@/actions/get-job-detail";
import { useUserStore } from "@/hooks/use-user-store";
import { submitQuestionAnswers } from "@/actions/submit-question-answers";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Define interface for job details
interface JobDetail {
  company_website: string;
  company_name: string;
  company_description: string;
  job_title: string;
  start_date: string;
  end_date: string;
  job_type: string;
  job_description: string;
  required_skills: string;
  educational_requirements: string;
  additional_benefits: string;
  languages: string;
  country_of_residence: string;
  years_of_experience_required: string;
  job_location_name: string;
  salary_currency: string;
  salary_range_min: number;
  salary_range_max: number;
  filter_out_salary_range: boolean;
  require_cv: boolean;
  require_cover_letter: boolean;
  require_voicenote: boolean;
  visibility_public: boolean;
  visibility_private: boolean;
  tags: string;
  hide_personal_details_during_screening: boolean;
  minimum_fit_score: number;
  filter_minimum_fit_score: boolean;
  status: string;
  auto_send_interview_mail_on_close: boolean;
  candidate_interview_count: number;
  interview_link: string;
  company_id: string;
  recruiter_id: string;
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  total_applicants: number;
  user: {
    id: string;
    reference: string;
    created_at: string;
    updated_at: string;
    name: string;
    last_name: string;
    profile_picture: string;
    email: string;
    role: string;
    is_verified: boolean;
    channel: string;
    country_code: string;
    phone: string;
    calendly_link: string;
    google_calender_link: string;
    username: string;
    location: string;
    last_login: string;
    joined_talent_pool: boolean;
  };
  company_logo: string;
  questions: Array<{
    id: string;
    question: string;
    is_screening: boolean;
  }>;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function ScreeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const job_id = searchParams ? searchParams.get("job_id") : null;
  const application_id = searchParams
    ? searchParams.get("application_id")
    : null;
  const { userData } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [questions, setQuestions] = useState<
    { id: string; title: string; answer: string }[]
  >([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [wordCount, setWordCount] = useState(0);
  const limit = 500;

  useEffect(() => {
    async function fetchJobDetail() {
      if (!job_id || !userData?.token) {
        toast.error("Missing job ID or authentication");
        return;
      }

      setIsLoading(true);
      try {
        const data = await getJobDetail({
          job_id,
          token: userData.token,
        });

        setJobDetail(data);

        // Filter questions that are marked as screening questions
        console.log("questions", data.questions);
        if (data.questions && Array.isArray(data.questions)) {
          const screeningQuestions = data.questions
            .filter((q: { is_screening: boolean }) => q.is_screening === true)
            .map((q: { text: string; id: string }) => ({
              title: q.text,
              answer: "",
              id: q.id,
            }));

          // If no screening questions found, add a default one
          if (screeningQuestions.length === 0) {
            screeningQuestions.push({
              id: "default",
              title:
                "Could you describe a project or task you've worked on that best demonstrates your skills for this role?",
              answer: "",
            });
          }

          console.log("screeningQuestions", screeningQuestions);
          setQuestions(screeningQuestions);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    }

    if (job_id) {
      fetchJobDetail();
    }
  }, [job_id, userData]);

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = e.target.value;
    setQuestions(newQuestions);
    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
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

  const handleSubmitScreeningAnswers = async () => {
    if (!application_id || !userData?.token) {
      toast.error("Missing application ID or authentication");
      return;
    }

    // Validate all questions have answers
    const unansweredQuestions = questions.filter((q) => !q.answer.trim());
    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all screening questions");
      return;
    }

    setIsSubmitting(true);
    try {
      // Format answers for submission
      const formattedAnswers = questions.map((question) => ({
        question_id: question.id,
        text: question.answer,
      }));

      // Submit answers
      await submitQuestionAnswers(
        userData.token,
        application_id,
        formattedAnswers
      );

      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit screening answers");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardWrapper>
    );
  }

  if (!jobDetail) {
    return (
      <DashboardWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-700">Job not found</h3>
            <p className="text-gray-500 mt-2">
              The requested job could not be found or you don't have access.
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Go Back
            </button>
          </div>
        </div>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} container mx-auto py-8 px-4`}>
        <h3 className="text-3xl font-semibold py-4">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft />
          </button>
          <span>Job Screening</span>
        </h3>

        <div className="flex gap-8">
          {/* Left Column - Job Details */}
          <section className="w-[50%]">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {jobDetail.company_logo ? (
                    <Image
                      src={jobDetail.company_logo}
                      alt={jobDetail.company_name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                      <span className="text-white font-medium text-xl">
                        {jobDetail.company_name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold mb-2">
                    {jobDetail.job_title}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <div className="text-[15px] text-gray-600">
                      {jobDetail.company_name}
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-gray-600">
                      <span>{jobDetail.job_location_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Job Type</div>
                <div className="font-medium">
                  {jobDetail.job_type.replace("_", " ")}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Experience</div>
                <div className="font-medium">
                  {jobDetail.years_of_experience_required}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Salary Range</div>
                <div className="font-medium">
                  {jobDetail.salary_currency}{" "}
                  {jobDetail.salary_range_min.toLocaleString()} -{" "}
                  {jobDetail.salary_range_max.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="font-medium">{jobDetail.job_location_name}</div>
              </div>
            </div>

            <Section title="About the Company">
              <p className="text-gray-700 leading-relaxed">
                {jobDetail.company_description}
              </p>
            </Section>

            <Section title="Job Description">
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: jobDetail.job_description }}
              />
            </Section>

            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {jobDetail.required_skills.split(",").map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Educational Requirements">
              <p className="text-gray-700 leading-relaxed">
                {jobDetail.educational_requirements}
              </p>
            </Section>

            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {jobDetail.languages.split(",").map((language: string) => (
                  <span
                    key={language}
                    className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm"
                  >
                    {language.trim()}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Additional Benefits">
              <p className="text-gray-700 leading-relaxed">
                {jobDetail.additional_benefits}
              </p>
            </Section>

            <Section title="Tags">
              <div className="flex flex-wrap gap-2">
                {jobDetail.tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </Section>
          </section>

          {/* Right Column - Screening Questions */}
          <section className="w-[50%] bg-white rounded-lg p-6 h-fit">
            <p className="text-sm text-[#898989] mb-6">
              Thank you for taking the time to apply for the{" "}
              {jobDetail?.job_title} position at {jobDetail?.company_name} and
              for sharing your qualifications and experiences with us.
              <br />
              As the next step in our hiring process, we'd love to invite you to
              screening process to get to know you better.
            </p>

            {questions.map((question, i) => (
              <div key={i} className="my-6">
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium">
                    {question.title}
                  </label>

                  <textarea
                    rows={5}
                    className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                    placeholder="Type your answer here"
                    value={question.answer}
                    onChange={(e) => handleTextareaChange(e, i)}
                  />
                  <span className="absolute bottom-2 right-4 text-xs font-medium text-gray-500">
                    {wordCount} / {limit}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmitScreeningAnswers}
                disabled={
                  isSubmitting || questions.some((q) => !q.answer.trim())
                }
                className="bg-[#009379] text-white p-3 rounded-lg font-medium hover:bg-[#009379]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Screening Answers"
                )}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Success Popup */}
      <Dialog
        open={showSuccessPopup}
        onOpenChange={(open) => {
          if (!open) {
            setShowSuccessPopup(false);
            router.back();
          }
        }}
      >
        <DialogContent className="bg-white p-6 max-w-[500px] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">
                Screening Answers Submitted Successfully!
              </h2>
            </div>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                router.back();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-600">
            Thank you for completing the screening questions. Your answers have
            been submitted successfully.
          </p>
        </DialogContent>
      </Dialog>
    </DashboardWrapper>
  );
}
