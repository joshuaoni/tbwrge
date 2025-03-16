import React from "react";
import JobTools from "../../../../../public/images/icons/job-tools.png";
import CVTools from "../../../../../public/images/icons/cv-tools.png";
import CoverLetterTools from "../../../../../public/images/icons/cover-letter-tools.png";
import Image from "next/image";
import { poppins } from "@/constants/app";
import { ArrowRight } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      icon: JobTools,
      title: "Job Tools",
      description:
        "Designed to streamline the job posting and candidate selection process for recruiters, helping them save time while finding the best candidates for each position.",
    },
    {
      icon: CVTools,
      title: "CV Tools",
      description:
        "Provides job seekers and recruiters with advanced tools to create, refine, and analyze CVs, ensuring candidates are represented at their best and matched accurately with job requirements.",
    },
    {
      icon: CoverLetterTools,
      title: "Cover Letter Tools",
      description:
        "Empowers candidates to create targeted, well-written cover letters that align with specific job requirements, and assist recruiters in evaluating them efficiently.",
    },
  ];
  return (
    <div
      className={`${poppins.className} bg-[#F8F9FF] flex flex-col  spaec-y-4 items-center`}
    >
      <div className="bg-[#F8F9FF]  flex flex-col w-full md:w-[80%] my-12 pb-8  space-y-4 mb-12 items-center">
        <h1 className="text-[25px] font-extrabold p-4 text-center">
          Our Tools Simplify Your Journey
        </h1>
        <p className="text-sm text-[#2D2D2D] text-center px-4 md:w-full w-[90%] md:px-24">
          Intuitive, AI-powered tools for candidates and recruiters. From
          tailored CVs and cover letters to community forums and job matching,
          our platform simplifies career growth and hiring.
        </p>
        <div className="flex md:w-full w-[80%] flex-col md:flex-row items-center  mt-6 space-y-8 md:space-y-0 md:space-x-8 ">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-1 bg-white h-[380px] rounded-[20px] border border-[#E5F4F2] shadow-[34.85px_29.63px_48.34px_0px_#3366FF0D]"
            >
              <div className="flex flex-col w-full p-8">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src={tool.icon}
                    alt={tool.title}
                    width={60}
                    height={60}
                  />
                </div>
                <h1 className="font-bold text-xl text-center mb-6">
                  {tool.title}
                </h1>
                <div className="flex-1">
                  <p className="text-center text-[14px]">{tool.description}</p>
                </div>
                <div className="pt-6">
                  <span className="font-semibold text-green-700 text-center flex items-center justify-center gap-2 cursor-pointer hover:underline group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
