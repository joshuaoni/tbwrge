import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getJobOpen } from "@/actions/get-jobs-open";
import { IGetJobOpenRes } from "@/types/jobs";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { formatDateAndDifference } from "@/actions/get-jobs-open";

const JobDetailsSkeleton = () => (
  <div className="max-w-[1000px] w-full mx-auto px-4 py-8 animate-pulse">
    <div className="w-24 h-8 bg-gray-100 rounded mb-4 md:mb-6" />

    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0" />
        <div className="flex-grow">
          <div className="w-full md:w-2/3 h-6 md:h-7 bg-gray-100 rounded mb-3 md:mb-4" />
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-4 md:h-5 bg-gray-100 rounded" />
            <div className="hidden md:block w-1 h-1 bg-gray-100 rounded-full" />
            <div className="w-20 md:w-24 h-4 md:h-5 bg-gray-100 rounded" />
            <div className="hidden md:block w-1 h-1 bg-gray-100 rounded-full" />
            <div className="w-16 md:w-20 h-4 md:h-5 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4">
          <div className="w-20 h-4 bg-gray-100 rounded mb-1" />
          <div className="w-32 h-5 bg-gray-100 rounded" />
        </div>
      ))}
    </div>

    <div className="space-y-6 md:space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-8">
          <div className="w-32 h-5 bg-gray-100 rounded mb-4" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-100 rounded" />
            <div className="w-3/4 h-4 bg-gray-100 rounded" />
            <div className="w-1/2 h-4 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center px-4 md:px-0">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Job Not Found</h1>
      <Link
        href="/dashboard/job-board"
        className="text-blue-600 hover:underline"
      >
        Back to Jobs
      </Link>
    </div>
  </div>
);

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

const ApplicationForm = () => (
  <div className="bg-white rounded-lg p-6">
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
          {/* Add nationality options */}
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
          {/* Add country options */}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you have an experience in sales?
        </label>
        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]">
          <option value="" className="text-[#6B7280]">
            Select option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you have any Managerial experience?
        </label>
        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280]">
          <option value="" className="text-[#6B7280]">
            Select option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How conversant are you with technology?
        </label>
        <input
          type="text"
          placeholder="Type in answer"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload CV
        </label>
        <input
          type="file"
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
          accept="video/*"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-[#009379] text-[16px] px-[40px] py-[16px] text-white rounded-[20px]"
        >
          Submit Application
        </button>
      </div>
    </form>
  </div>
);

const JobDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<IGetJobOpenRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        const jobs = await getJobOpen({
          search_term: "",
          job_type: "full_time",
          location: "",
          skills: [],
        });

        const foundJob = jobs.find((j) => j.id === id);
        if (!foundJob) {
          throw new Error("Job not found");
        }

        setJob(foundJob);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
      <div className="max-w-[1400px] w-full mx-auto px-4 py-8">
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
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.job_description}
              </p>
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
            <ApplicationForm />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default JobDetailsPage;
