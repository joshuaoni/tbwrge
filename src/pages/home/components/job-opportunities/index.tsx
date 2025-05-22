import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import ManSuit from "../../../../../public/images/man-suit.png";
import RocketIcon from "../../../../../public/images/rocket.png";
import { outfit, poppins } from "@/constants/app";
import { useQuery } from "@tanstack/react-query";
import { getJobOpenings } from "@/actions/get-current-jobs";
import { useUserStore } from "@/hooks/use-user-store";
import { getJobOpen } from "@/actions/get-jobs-open";
import { FaBuilding } from "react-icons/fa";
import { useRouter } from "next/router";

const categories = [
  { name: "Product Management", count: 34, color: "bg-gray-200 text-gray-700" },
  { name: "Design", count: 92, color: "bg-pink-200 text-pink-800" },
  { name: "Development", count: 104, color: "bg-cyan-200 text-cyan-800" },
  { name: "Marketing", count: 89, color: "bg-pink-200 text-pink-800" },
  { name: "Customer Service", count: 54, color: "bg-cyan-200 text-cyan-800" },
];

const JobOpportunities = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { userData } = useUserStore();
  const [page, setPage] = useState(0);
  const jobsPerPage = 3;

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job-openings", userData?.token],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getJobOpen({
        search_term: "",
        job_type: "full_time",
        skills: [],
        location: "",
      });
    },
    enabled: !!userData?.token,
  });

  return (
    <div
      className="relative h-fit pt-24 md:pt-[74px] flex items-center justify-center p-4 py-12 md:py-0 md:p-12 md:px-16 bg-black"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div className="relative z-10">
        {/* Navigation Arrows and Frame Number */}
        <div className="absolute top-8 right-12 flex items-center space-x-4 z-10">
          <button
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            {/* Left Arrow SVG */}
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 4l-4 4 4 4" />
            </svg>
          </button>
          <button
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() =>
              setPage((p) =>
                Math.min(
                  p + 1,
                  jobs && jobs.length
                    ? Math.floor((jobs.length - 1) / jobsPerPage)
                    : 0
                )
              )
            }
            disabled={
              !jobs ||
              jobs.length <= jobsPerPage ||
              page >= Math.floor((jobs.length - 1) / jobsPerPage)
            }
          >
            {/* Right Arrow SVG */}
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="w-full text-2xl md:text-3xl font-bold text-white mb-8">
            Latest Job Opportunities
          </h2>
          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-8">
            {/* Left Sidebar */}
            <div className="flex flex-col justify-start w-full md:w-1/4 ">
              <div className="flex flex-col gap-[30px] border-l-4 border-white pl-4">
                {categories.map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="text-white text-lg">{cat.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-semibold ${cat.color}`}
                    >
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Cards */}
            <div className="flex-1 flex flex-col md:flex-row gap-6 justify-center items-center">
              {isLoading ? (
                <div className="text-white text-lg">Loading jobs...</div>
              ) : isError ? (
                <div className="text-red-500 text-lg">Failed to load jobs.</div>
              ) : jobs && jobs.length > 0 ? (
                jobs
                  .slice(page * jobsPerPage, page * jobsPerPage + jobsPerPage)
                  .map((job: any) => (
                    <div
                      key={job.id}
                      className={`w-full md:w-80 rounded-2xl p-6 bg-[#E4EEFC] text-gray-900 border border-gray-200 shadow-lg flex flex-col gap-4`}
                    >
                      <div className="flex flex-col gap-4">
                        <span
                          className="text-[22px] font-semibold truncate w-full block"
                          title={job.job_title}
                        >
                          {job.job_title}
                        </span>
                        <div className="flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[16px] font-semibold bg-black/20 text-white`}
                          >
                            {job.job_type?.replace("_", " ") || "Job"}
                          </span>
                          {job.tags &&
                            job.tags
                              .split(",")
                              .slice(0, 1)
                              .map((tag: string, j: number) => (
                                <span
                                  key={j}
                                  className={`px-3 py-1 rounded-full text-[16px] font-semibold bg-black/20 text-white`}
                                >
                                  {tag.trim()}
                                </span>
                              ))}
                        </div>
                      </div>
                      <div className="text-[20px] font-bold mt-4 mb-4">
                        {job.salary_range_min && job.salary_range_max
                          ? `${job.salary_range_min}${
                              job.salary_currency
                                ? ` ${job.salary_currency}`
                                : ""
                            } - ${job.salary_range_max}${
                              job.salary_currency
                                ? ` ${job.salary_currency}`
                                : ""
                            }`
                          : "Salary not specified"}
                      </div>
                      {/* Time with horizontal line */}
                      <div className="flex items-center w-full mb-2">
                        <div className={`flex-1 border-t-2 border-white`}></div>
                        <span
                          className={`ml-2 text-xs whitespace-nowrap text-[#0146B1] font-semibold`}
                        >
                          {job.created_at
                            ? new Date(job.created_at).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          {/* Company Icon */}
                          {job.company_logo ? (
                            <img
                              src={job.company_logo}
                              alt={job.company_name}
                              className="w-7 h-7 rounded-full bg-white/80 p-1"
                            />
                          ) : (
                            <FaBuilding className="w-7 h-7 text-gray-400 bg-white/80 rounded-full p-1" />
                          )}
                          <div className="flex flex-col">
                            <span
                              className="text-sm font-semibold truncate block max-w-[120px]"
                              title={job.company_name}
                            >
                              {job.company_name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {job.job_location_name || "Remote"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`mt-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-cyan-200 text-cyan-800`}
                          >
                            {job.total_applicants} Applicants
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-white text-lg">No jobs found.</div>
              )}
            </div>
          </div>

          {/* View All Jobs Button */}
          <div className="my-12">
            <button
              onClick={() => router.push("/dashboard/job-board")}
              className="px-6 py-4 rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities;
