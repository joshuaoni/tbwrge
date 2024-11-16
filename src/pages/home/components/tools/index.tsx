import React from "react";
import JobTools from "../../../../../public/images/icons/job-tools.png";
import CVTools from "../../../../../public/images/icons/cv-tools.png";
import CoverLetterTools from "../../../../../public/images/icons/cover-letter-tools.png";
import Image from "next/image";

const Tools = () => {
  const tools = [
    {
      icon: JobTools,
      title: "Job Tools",
      description:
        "Easily customize to match your hiring needs and brand with flexible, easy-to-use tools for a streamlined recruitment process!",
    },
    {
      icon: CVTools,
      title: "CV Tools",
      description:
        "Candivet’s CV tools, including the summarizer, help HR professionals quickly analyze and condense candidate profiles, streamlining the hiring process.",
    },
    {
      icon: CoverLetterTools,
      title: "Cover Letter Tools",
      description:
        "Candivet’s cover letter tools streamline the process, allowing HR professionals to quickly generate, analyze, and tailor cover letters, saving time and improving efficiency.",
    },
  ];
  return (
    <div className=" bg-white  flex flex-col  spaec-y-4 items-center ">
      <div className="bg-[#F8F9FF]  flex flex-col w-full md:w-[80%] my-12 pb-8  space-y-4 mb-12 items-center">
        <h1 className="text-[25px] font-extrabold p-4 text-center">
          Our Tools simplifies your vetting process
        </h1>
        <p className="text-sm text-[#2D2D2D] text-center px-4  md:px-24">
          Our tools make it easier to find and employ the perfect candidate for
          the job, with our Ai integrated CV analyzer tools amongst others, you
          are sure to find the right candidate.
        </p>
        <div className="flex flex-col md:flex-row items-center  mt-6 space-y-4 md:space-y-0 md:space-x-8 ">
          {tools.map((tool, index) => (
            <div className="flex flex-col bg-white space-y-6  min-h-[400px] max-w-[300px] rounded-lg items-center justify-center px-4 ">
              <Image src={tool.icon} alt={tool.title} width={60} height={60} />
              <h1 className="font-bold text-xl">{tool.title}</h1>
              <p className="text-center">{tool.description}</p>
              <span className="text-green-700"> Learn More</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
