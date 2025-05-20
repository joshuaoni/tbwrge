import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import ManSuit from "../../../../../public/images/man-suit.png";
import RocketIcon from "../../../../../public/images/rocket.png";
import { outfit, poppins } from "@/constants/app";

const categories = [
  { name: "Product Management", count: 34, color: "bg-gray-200 text-gray-700" },
  { name: "Design", count: 92, color: "bg-pink-200 text-pink-800" },
  { name: "Development", count: 104, color: "bg-cyan-200 text-cyan-800" },
  { name: "Marketing", count: 89, color: "bg-pink-200 text-pink-800" },
  { name: "Customer Service", count: 54, color: "bg-cyan-200 text-cyan-800" },
];

const jobs = [
  {
    title: "Product Designer",
    tags: [
      { label: "Full Time", color: "bg-black/20 text-white" },
      { label: "Product", color: "bg-black/20 text-white" },
    ],
    salary: "34K$ - 45K$",
    company: "GitLab",
    companyIcon: "/gitlab-icon.svg", // Replace with your icon path
    info: "1200-3000",
    jobsCount: 20,
    jobsColor: "bg-cyan-200 text-cyan-800",
    time: "1 hour ago",
    cardColor: "bg-gradient-to-t from-[#09742CBF] to-[#014718F0] text-white",
    border: "border-none",
    timeColor: "text-white",
    dashColor: "border-white/50",
  },
  {
    title: "Senior Designer",
    tags: [
      { label: "Full Time", color: "bg-[#BBD3F8] text-black" },
      { label: "Head of Design", color: "bg-[#BBD3F8] text-black" },
    ],
    salary: "25K$ - 45K$",
    company: "Hotjar",
    companyIcon: "/hotjar-icon.svg", // Replace with your icon path
    info: "140-300",
    jobsCount: 40,
    jobsColor: "bg-orange-200 text-orange-800",
    time: "4 hour ago",
    cardColor: "bg-[#E4EEFC] text-gray-900",
    border: "border border-gray-200",
    timeColor: "text-[#0146B1] font-semibold",
    dashColor: "border-white",
  },
  {
    title: "Creative Director",
    tags: [
      { label: "Full Time", color: "bg-[#BBD3F8] text-black" },
      { label: "Design", color: "bg-[#BBD3F8] text-black" },
    ],
    salary: "25K$ - 45K$",
    company: "Github",
    companyIcon: "/github-icon.svg", // Replace with your icon path
    info: "6200-4000",
    jobsCount: 75,
    jobsColor: "bg-orange-200 text-orange-800",
    time: "8 hour ago",
    cardColor: "bg-[#E4EEFC] text-gray-900",
    border: "border border-gray-200",
    timeColor: "text-[#0146B1] font-semibold",
    dashColor: "border-white",
  },
];

const JobOpportunities = () => {
  const isMobile = useIsMobile();

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
          <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20">
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
          <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20">
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
              {jobs.map((job, i) => (
                <div
                  key={job.title}
                  className={`w-full md:w-80 rounded-2xl p-6 ${job.cardColor} ${job.border} shadow-lg flex flex-col gap-4`}
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-[22px] font-semibold">
                      {job.title}
                    </span>
                    <div className="flex gap-2">
                      {job.tags.map((tag, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 rounded-full text-[16px] font-semibold ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-bold mt-4 mb-4">
                    {job.salary}
                  </div>
                  {/* Time with horizontal line */}
                  <div className="flex items-center w-full mb-2">
                    <div className={`flex-1 border-t-2 ${job.dashColor}`}></div>
                    <span
                      className={`ml-2 text-xs whitespace-nowrap ${job.timeColor}`}
                    >
                      {job.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      {/* Company Icon */}
                      <img
                        src={job.companyIcon}
                        alt={job.company}
                        className="w-7 h-7 rounded-full bg-white/80 p-1"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {job.company}
                        </span>
                        <span className="text-xs text-gray-400">
                          {job.info}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`mt-1 px-2 py-0.5 rounded-md text-xs font-semibold ${job.jobsColor}`}
                      >
                        {job.jobsCount} Jobs
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Jobs Button */}
          <div className="my-12">
            <button className="px-6 py-4 rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition">
              View All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities;
