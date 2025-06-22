import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getJobDetail } from "@/actions/get-job-detail";
import { IGetJobOpenRes } from "@/types/jobs";
import { formatDateAndDifference } from "@/lib/utils";
import { outfit } from "@/constants/app";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BriefcaseBusiness, File, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";

const EmbeddedJobsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { jobs: jobsParam } = router.query;
  const [jobs, setJobs] = useState<IGetJobOpenRes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("starting fetch");
    const fetchJobs = async () => {
      if (!jobsParam || typeof jobsParam !== "string") return;

      try {
        setIsLoading(true);
        setError(null);

        const jobIds = jobsParam.split(",");
        const jobPromises = jobIds.map((jobId) =>
          getJobDetail({ job_id: jobId.trim() })
        );

        console.log("jobpromises: ", jobPromises);

        const fetchedJobs = await Promise.all(jobPromises);
        console.log("fetchedJobs: ", fetchedJobs);
        setJobs(fetchedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [jobsParam]);

  const handleJobClick = (jobId: string) => {
    // Open job details in a new tab to avoid iframe navigation issues
    const jobUrl = `${window.location.origin}/embedded-job-post/${jobId}`;
    window.open(jobUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className={`${outfit.className} w-full mx-auto`}>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className={`${outfit.className} w-full mx-auto`}>
          <div className="bg-white rounded-lg p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {error ? "Error Loading Jobs" : "No Jobs Found"}
              </h2>
              <p className="text-gray-500">
                {error || "No jobs were found with the provided IDs."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats for the embedded jobs
  const totalJobs = jobs.length;
  console.log("totalJobs: ", jobs);

  // Get unique companies
  const companies = [...new Set(jobs.map((job) => job.company_name))];
  const companyText =
    companies.length === 1
      ? `Explore openings at ${companies[0]}`
      : companies.length <= 3
      ? `Explore openings at ${companies.join(", ")}`
      : `Explore openings at ${companies.slice(0, 2).join(", ")} and ${
          companies.length - 2
        } more companies`;

  const stats = [
    {
      title: "Available Positions",
      value: totalJobs,
      icon: <BriefcaseBusiness size={20} className="text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className={`${outfit.className} w-full mx-auto`}>
        <div className="bg-white rounded-lg p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {companyText}
            </h1>
            <p className="text-gray-600">
              Find your next opportunity with these current job openings.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex items-center space-x-8 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="shadow-[0px_4px_20px_rgba(0,0,0,0.1)] rounded-2xl justify-center p-4 bg-white h-24 flex flex-col w-full md:w-64"
              >
                <div className="flex items-center space-x-2">
                  {stat.icon}
                  <span className="text-sm font-light">{stat.title}</span>
                </div>
                <h2 className="text-xl font-bold mt-2">{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* Jobs Table */}
          <div className="w-full">
            {/* Header */}
            <div className="w-full h-[39.292px] rounded-[7.76px] pt-[11.65px] pb-[11.65px] bg-[#D6D6D6] gap-4 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center mb-4">
              <div className="h-[16px] pl-4 text-[#898989] flex items-center justify-start">
                <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
                  Job Title
                </p>
              </div>
              <div className="h-[16px] text-[#898989] flex items-center justify-start">
                <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
                  Job Type
                </p>
              </div>
              <div className="h-[16px] text-[#898989] flex items-center justify-start">
                <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
                  Skills
                </p>
              </div>
              <div className="h-[16px] text-[#898989] flex items-center justify-start">
                <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
                  Languages
                </p>
              </div>
              <div className="h-[16px] text-[#898989] flex items-center justify-start">
                <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
                  Tags
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="w-full divide-y divide-gray-100">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job.id)}
                  className="w-full hover:bg-gray-50 cursor-pointer transition-all duration-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="h-[51px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center hover:scale-[1.01] transition-all duration-200">
                    {/* Job Title */}
                    <div className="h-[51px] rounded-[10px] p-[4px] pl-0 gap-[10px] flex items-center">
                      <div className="w-full h-full bg-[#F9F9F9] rounded-[10px] pl-[8px] pr-[8px] gap-[10px] flex">
                        <div className="flex items-center justify-center w-[38px] h-[38px]">
                          {job.company_logo ? (
                            <div className="w-[38px] h-[38px] rounded-full overflow-hidden">
                              <Image
                                src={job.company_logo}
                                alt={job.job_title || ""}
                                width={38}
                                height={38}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-[38px] h-[38px] bg-slate-300 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {job.company_name?.[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="w-[217px] h-[37px] gap-[4px] flex flex-col">
                          <div className="w-[217px] h-[18px] flex items-center">
                            <span className="font-inter font-medium text-[14px] leading-[15px] tracking-[0%] truncate text-[#333333]">
                              {job.job_title}
                            </span>
                          </div>
                          <div className="w-[217px] h-[18px] flex items-center">
                            <p className="font-inter font-normal text-[12px] leading-[15px] tracking-[0%] truncate text-[#8F8F8F]">
                              {job.company_name}, {job.job_location_name} -{" "}
                              {formatDistanceToNow(new Date(job.start_date), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Type */}
                    <div className="w-full h-[19px] flex items-center justify-start">
                      <p className="font-inter font-normal text-[14px] leading-[100%] tracking-[5%] text-black">
                        {job.job_type
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="w-full flex justify-start items-center gap-2 overflow-hidden">
                      <div className="flex justify-start items-center overflow-hidden">
                        {(() => {
                          const skillsList = (job.required_skills || "")
                            .split(",")
                            .map((skill: string) => skill.trim());
                          const displayItems = skillsList.slice(0, 1);
                          const remainingCount = skillsList.length - 1;

                          return (
                            <>
                              <span
                                className="text-sm text-black truncate"
                                title={skillsList.join(", ")}
                              >
                                {displayItems.join(", ")}
                              </span>
                              {remainingCount > 0 && (
                                <span
                                  className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                                  title={skillsList.slice(1).join(", ")}
                                >
                                  +{remainingCount}
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="w-full flex justify-start items-center overflow-hidden">
                      <div className="flex justify-start items-center overflow-hidden">
                        {(() => {
                          const languageList = (job.languages || "")
                            .split(",")
                            .map((lang: string) => lang.trim());
                          const displayItems = languageList.slice(0, 1);
                          const remainingCount = languageList.length - 1;

                          return (
                            <>
                              <span
                                className="text-sm text-black truncate"
                                title={languageList.join(", ")}
                              >
                                {displayItems.join(", ")}
                              </span>
                              {remainingCount > 0 && (
                                <span
                                  className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                                  title={languageList.slice(1).join(", ")}
                                >
                                  +{remainingCount}
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="w-full overflow-hidden">
                      <div className="flex justify-start items-center overflow-hidden">
                        {(() => {
                          const tagsList = (job.tags || "")
                            .split(",")
                            .map((tag: string) => tag.trim());
                          const displayItems = tagsList.slice(0, 1);
                          const remainingCount = tagsList.length - 1;

                          return (
                            <>
                              <span
                                className="text-sm text-black truncate"
                                title={tagsList.join(", ")}
                              >
                                {displayItems.join(", ")}
                              </span>
                              {remainingCount > 0 && (
                                <span
                                  className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600"
                                  title={tagsList.slice(1).join(", ")}
                                >
                                  +{remainingCount}
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">Powered by Candivet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedJobsPage;
