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
import { motion, AnimatePresence } from "framer-motion";

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

  const handleJobClick = (jobId: string) => {
    const path = `/dashboard/job-board/${jobId}`;
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleViewAllJobs = () => {
    const path = "/dashboard/job-board";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

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

  const featuredCardClass =
    "bg-gradient-to-t from-[#09742CBF] to-[#014718F0] text-white border-none";
  const featuredTimeClass = "text-white";
  const featuredDashClass = "border-white/50";

  // Skeleton card component
  const JobCardSkeleton = () => (
    <div className="w-full md:w-80 rounded-2xl p-6 bg-gray-200 border border-gray-100 shadow-lg flex flex-col gap-4 animate-pulse min-h-[260px]">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-gray-300 rounded-full" />
        <div className="h-6 w-16 bg-gray-300 rounded-full" />
      </div>
      <div className="h-7 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="flex items-center w-full mb-2">
        <div className="flex-1 border-t-2 border-gray-300" />
        <div className="ml-2 h-4 w-16 bg-gray-300 rounded" />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-300" />
          <div className="flex flex-col">
            <div className="h-4 w-20 bg-gray-300 rounded mb-1" />
            <div className="h-3 w-14 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-20 bg-cyan-100 rounded" />
      </div>
    </div>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div
      className={`${outfit.className} overflow-hidden relative h-fit pt-12 md:pt-16 lg:pt-24 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black`}
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
      <div className="relative z-10 w-full max-w-7xl">
        {/* Navigation Arrows and Frame Number */}
        <div className="hidden md:flex absolute top-8 right-0 items-center space-x-4 z-10">
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
        <div className="flex flex-col items-center justify-center md:mt-4">
          <h2 className="md:text-left text-center w-full text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
            Latest Job Opportunities
          </h2>
          <div className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8">
            {/* Left Sidebar - Hidden on Mobile */}
            <div className="hidden md:flex flex-col justify-start w-full md:min-w-[236px] md:w-1/4">
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

            {/* Job Cards - Mobile Carousel */}
            <div className="w-full md:flex-1">
              {isLoading || !jobs || jobs.length === 0 ? (
                <div className="flex gap-4 md:gap-6 lg:gap-8">
                  {[...Array(3)].map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}
                </div>
              ) : isError ? (
                <div className="text-red-500 text-lg">Failed to load jobs.</div>
              ) : (
                <div className="relative">
                  {/* Mobile Carousel */}
                  <div className="md:hidden overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${page * 100}%)` }}
                    >
                      {jobs?.slice(0, 3).map((job, idx) => (
                        <div
                          key={job.id}
                          className="w-full flex-shrink-0 px-2 md:px-4"
                        >
                          <motion.div
                            custom={idx}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={cardVariants}
                            className={`cursor-pointer hover:scale-[1.01] transition-all duration-200 w-full rounded-2xl p-4 md:p-6 ${
                              idx === 0
                                ? featuredCardClass
                                : "bg-[#E4EEFC] text-gray-900 border border-gray-200"
                            } shadow-lg flex flex-col gap-4`}
                            onClick={() => handleJobClick(job.id)}
                          >
                            {/* Job Card Content */}
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
                            <div className="flex items-center w-full mb-2">
                              <div
                                className={`flex-1 border-t-2 ${
                                  idx === 0 ? featuredDashClass : "border-white"
                                }`}
                              ></div>
                              <span
                                className={`ml-2 text-xs whitespace-nowrap font-semibold ${
                                  idx === 0
                                    ? featuredTimeClass
                                    : "text-[#0146B1]"
                                }`}
                              >
                                {job.created_at
                                  ? new Date(
                                      job.created_at
                                    ).toLocaleDateString()
                                  : ""}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2">
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
                                  N/A Applicants
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Grid */}
                  <div className="hidden md:flex flex-row gap-4 md:gap-6 justify-center items-center">
                    {[...Array(3)].map((_, idx) => {
                      const job =
                        jobs && jobs.length > idx
                          ? jobs[page * jobsPerPage + idx]
                          : null;
                      if (job) {
                        return (
                          <motion.div
                            key={job.id}
                            custom={idx}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={cardVariants}
                            className={`cursor-pointer hover:scale-[1.01] transition-all duration-200 w-80 rounded-2xl p-6 ${
                              idx === 0
                                ? featuredCardClass
                                : "bg-[#E4EEFC] text-gray-900 border border-gray-200"
                            } shadow-lg flex flex-col gap-4`}
                            onClick={() => handleJobClick(job.id)}
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
                              <div
                                className={`flex-1 border-t-2 ${
                                  idx === 0 ? featuredDashClass : "border-white"
                                }`}
                              ></div>
                              <span
                                className={`ml-2 text-xs whitespace-nowrap font-semibold ${
                                  idx === 0
                                    ? featuredTimeClass
                                    : "text-[#0146B1]"
                                }`}
                              >
                                {job.created_at
                                  ? new Date(
                                      job.created_at
                                    ).toLocaleDateString()
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
                                  N/A Applicants
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      } else {
                        return <JobCardSkeleton key={idx} />;
                      }
                    })}
                  </div>

                  {/* Mobile Navigation Arrows */}
                  <div className="md:hidden absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
                    <button
                      className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                    >
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
                      onClick={() => setPage((p) => Math.min(p + 1, 2))}
                      disabled={page >= 2}
                    >
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
                </div>
              )}
            </div>
          </div>

          {/* View All Jobs Button */}
          <div className="mt-8 md:mt-12 lg:mt-16">
            <button
              onClick={handleViewAllJobs}
              className="text-sm px-6 md:px-8 lg:px-[30px] py-3 md:py-4 lg:py-[16px] rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition w-full md:w-fit"
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
