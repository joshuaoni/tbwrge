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
import { getTalentProfile } from "@/actions/talent-profile";
import { getAppliedJobItems } from "@/actions/get-applied-job-items";
import { useTranslation } from "react-i18next";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-sm font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const JobHeader = ({
  job,
  timeAgo,
}: {
  job: IGetJobOpenRes;
  timeAgo: string;
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Link
        href="/dashboard/applications"
        className="inline-flex items-center text-gray-600 mb-6 text-sm"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t("jobBoard.backToApplications")}
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
                <span className="text-white font-medium text-sm">
                  {job.company_name[0]}
                </span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-sm font-semibold mb-2">{job.job_title}</h1>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-600">{job.company_name}</div>
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
};

const QuickInfo = ({ job }: { job: IGetJobOpenRes }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">
          {t("jobBoard.jobType")}
        </div>
        <div className="font-medium">{job.job_type.replace("_", " ")}</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">
          {t("jobBoard.experience")}
        </div>
        <div className="font-medium">{job.years_of_experience_required}</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">
          {t("jobBoard.salaryRange")}
        </div>
        <div className="font-medium text-sm">
          {job.salary_range_min && job.salary_range_max
            ? `${
                job.salary_currency || "USD"
              } ${job.salary_range_min.toLocaleString()} - ${job.salary_range_max.toLocaleString()}`
            : t("jobBoard.notSpecified")}
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">
          {t("jobBoard.location")}
        </div>
        <div className="font-medium text-sm">{job.job_location_name}</div>
      </div>
    </div>
  );
};

const ApplicationDetailsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<IGetJobOpenRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const { userData } = useUserStore();

  useEffect(() => {
    const fetchJobAndCheckApplication = async () => {
      if (!id || !userData?.token) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch job details
        const jobData = await getJobDetail({
          job_id: id as string,
          token: userData.token,
        });
        setJob(jobData);

        // Check if user has already applied
        const appliedJobs = await getAppliedJobItems(userData.token);
        setHasApplied(appliedJobs.includes(id as string));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndCheckApplication();
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
      <div className={`${outfit.className} details w-full mx-auto`}>
        <div className="flex gap-8">
          {/* Left column - Job details */}
          <div className="w-1/2">
            <JobHeader job={job} timeAgo={timeAgo} />
            <QuickInfo job={job} />

            {job.company_description && (
              <Section title={t("jobBoard.aboutCompany")}>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {job.company_description}
                </p>
              </Section>
            )}

            <Section title={t("jobBoard.jobDescription")}>
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: job.job_description }}
              />
            </Section>

            <Section title={t("jobBoard.requiredSkills")}>
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
              <Section title={t("jobBoard.educationalRequirements")}>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {job.educational_requirements}
                </p>
              </Section>
            )}

            {job.languages && (
              <Section title={t("jobBoard.languages")}>
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
              <Section title={t("jobBoard.additionalBenefits")}>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {job.additional_benefits}
                </p>
              </Section>
            )}

            {job.tags && (
              <Section title={t("jobBoard.tags")}>
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

          {/* Right column - Application form or status */}
          <div className="w-1/2">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-500"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold">
                  {t("jobApplication.applicationSubmitted")}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t("jobApplication.alreadyApplied")}
                </p>
                <div className="pt-4">
                  <Link
                    href="/dashboard/applications"
                    className="inline-flex items-center text-primary hover:text-primary/90"
                  >
                    <span className="text-sm">
                      {t("jobApplication.viewYourApplications")}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2"
                    >
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ApplicationDetailsPage;
