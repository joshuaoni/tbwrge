import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getJobDetail } from "@/actions/get-job-detail";
import { IGetJobOpenRes } from "@/types/jobs";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { formatDateAndDifference } from "@/lib/utils";
import { outfit } from "@/constants/app";
import { useUserStore } from "@/hooks/use-user-store";
import { JobDetailsSkeleton } from "@/components/job-details-skeleton";
import { ErrorState } from "@/components/error-state";
import { countries } from "@/constants/countries";
import {
  submitJobApplication,
  JobApplicationFormData,
} from "@/actions/submit-job-application";
import { toast } from "react-hot-toast";
import { submitQuestionAnswers } from "@/actions/submit-question-answers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

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

const JobHeader = ({
  job,
  timeAgo,
}: {
  job: IGetJobOpenRes;
  timeAgo: string;
}) => (
  <div>
    <Link
      href="/dashboard/job-board"
      className="inline-flex items-center text-gray-600 mb-6"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back to Jobs
    </Link>

    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company_name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-slate-300 flex items-center justify-center">
              <span className="text-white font-medium text-xl">
                {job.company_name[0]}
              </span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{job.job_title}</h1>
          <div className="flex flex-col gap-1">
            <div className="text-[15px] text-gray-600">{job.company_name}</div>
            <div className="flex items-center gap-2 text-[14px] text-gray-600">
              <span>{job.job_location_name}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QuickInfo = ({ job }: { job: IGetJobOpenRes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">Job Type</div>
      <div className="font-medium">{job.job_type.replace("_", " ")}</div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">Experience</div>
      <div className="font-medium">{job.years_of_experience_required}</div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">Salary Range</div>
      <div className="font-medium">
        {job.salary_range_min && job.salary_range_max
          ? `${
              job.salary_currency || "USD"
            } ${job.salary_range_min.toLocaleString()} - ${job.salary_range_max.toLocaleString()}`
          : "Not specified"}
      </div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">Location</div>
      <div className="font-medium">{job.job_location_name}</div>
    </div>
  </div>
);

const ApplicationForm = ({
  jobId,
  questions,
}: {
  jobId: string;
  questions: any[];
  onClose?: () => void;
}) => {
  const router = useRouter();
  const { userData } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    linkedinProfile: "",
    currentCompany: "",
    currentPosition: "",
    nationality: "",
    countryOfResidence: "",
    relevantExperience: "",
    skillsSummary: "",
    cv: null as File | null,
    coverLetter: null as File | null,
    voicenote: null as File | null,
  });

  const [questionAnswers, setQuestionAnswers] = useState<
    Record<string, string>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleQuestionAnswerChange = (questionId: string, value: string) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit job application
      const applicationResponse = await submitJobApplication(userData?.token!, {
        job_id: jobId as string,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        date_of_birth: formData.dateOfBirth || undefined,
        linkedin: formData.linkedinProfile || undefined,
        current_company: formData.currentCompany || undefined,
        current_position: formData.currentPosition || undefined,
        nationality: formData.nationality || undefined,
        country_of_residence: formData.countryOfResidence || undefined,
        experience: formData.relevantExperience,
        skills: formData.skillsSummary,
        cv: formData.cv || undefined,
        cover_letter: formData.coverLetter || undefined,
        voicenote: formData.voicenote || undefined,
      });

      // Submit question answers if there are any
      if (questions.length > 0) {
        const formattedAnswers = questions.map((question) => ({
          question_id: question.id,
          text: questionAnswers[question.id] || "",
        }));

        console.log("applicationResponse", applicationResponse);
        await submitQuestionAnswers(
          userData?.token!,
          applicationResponse.id,
          formattedAnswers
        );
      }

      setShowSuccessPopup(true);
      // router.back();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Job Application</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
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
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-[#6B7280] [color-scheme:light]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile Link
          </label>
          <input
            type="url"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleInputChange}
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
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleInputChange}
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
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleInputChange}
            placeholder="Manager, etc..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]"
          >
            <option value="">Select Nationality</option>
            {countries.map((country) => (
              <option key={country.code} value={country.nationality}>
                {country.nationality}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country of Residence
          </label>
          <select
            name="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Relevant Experience <span className="text-red-500">*</span>
          </label>
          <textarea
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleInputChange}
            placeholder="Describe your past roles"
            required
            rows={4}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            name="skillsSummary"
            value={formData.skillsSummary}
            onChange={handleInputChange}
            placeholder="Highlight your key skills"
            required
            rows={4}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload CV
          </label>
          <input
            type="file"
            name="cv"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Cover Letter (Optional)
          </label>
          <input
            type="file"
            name="coverLetter"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Application Video/demo (Optional)
          </label>
          <input
            type="file"
            name="voicenote"
            onChange={handleFileChange}
            accept="video/*"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
          />
        </div>

        {/* Add application questions */}
        {questions
          .filter(
            (question) =>
              question.is_screening === false ||
              question.is_screening === undefined
          )
          .map((question) => (
            <div key={question.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {question.text}
              </label>
              <textarea
                value={questionAnswers[question.id] || ""}
                onChange={(e) =>
                  handleQuestionAnswerChange(question.id, e.target.value)
                }
                placeholder="Enter your answer"
                rows={3}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>
          ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>

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
                Application Submitted Successfully!
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
            Thank you for applying! We will review your application and get back
            to you soon.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const JobDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<IGetJobOpenRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUserStore();

  useEffect(() => {
    const fetchJob = async () => {
      if (!id || !userData?.token) return;

      try {
        setIsLoading(true);
        setError(null);

        const jobData = await getJobDetail({
          job_id: id as string,
          token: userData.token,
        });
        console.log({ jobData });

        setJob(jobData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, userData?.token]);

  if (isLoading) {
    return (
      <DashboardWrapper>
        <JobDetailsSkeleton />
      </DashboardWrapper>
    );
  }

  if (error || !job) {
    return (
      <DashboardWrapper>
        <ErrorState />
      </DashboardWrapper>
    );
  }

  const timeAgo = formatDateAndDifference(job.start_date);

  return (
    <DashboardWrapper>
      <div
        className={`${outfit.className} details max-w-[1400px] w-full mx-auto py-8`}
      >
        <div className="flex gap-8">
          {/* Left column - Job details */}
          <div className="w-1/2">
            <JobHeader job={job} timeAgo={timeAgo} />
            <QuickInfo job={job} />

            {job.company_description && (
              <Section title="About the Company">
                <p className="text-gray-700 leading-relaxed">
                  {job.company_description}
                </p>
              </Section>
            )}

            <Section title="Job Description">
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: job.job_description }}
              />
            </Section>

            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {job.required_skills.split(",").map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </Section>

            {job.educational_requirements && (
              <Section title="Educational Requirements">
                <p className="text-gray-700 leading-relaxed">
                  {job.educational_requirements}
                </p>
              </Section>
            )}

            {job.languages && (
              <Section title="Languages">
                <div className="flex flex-wrap gap-2">
                  {job.languages.split(",").map((language: string) => (
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

            {job.additional_benefits && (
              <Section title="Additional Benefits">
                <p className="text-gray-700 leading-relaxed">
                  {job.additional_benefits}
                </p>
              </Section>
            )}

            {job.tags && (
              <Section title="Tags">
                <div className="flex flex-wrap gap-2">
                  {job.tags.split(",").map((tag: string) => (
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
          </div>

          {/* Right column - Application form */}
          <div className="w-1/2">
            <ApplicationForm jobId={job.id} questions={job.questions} />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default JobDetailsPage;
