import classNames from "classnames";
import { forwardRef } from "react";

import { poppins } from "@/constants/app";
import { ResumeProps } from "@/interfaces/cv-generator.interface";

const ResumeFour = forwardRef<HTMLDivElement, ResumeProps>(
  ({ name, title, contactInfo, workExperience, education, skills }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          poppins.className,
          "w-full px-4 py-5 space-y-4 bg-white shadow-md  rounded-lg  p-6"
        )}
      >
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="w-1/3 space-y-8">
            <div className="mb-8 space-y-2.5">
              <h1 className="text-4xl font-bold text-[#222222]">{name}</h1>
              <h2 className="font-semibold text-[#0E6CC2]">{title}</h2>
              <p className="text-[#222222] text-xs">
                Our 5 years of professional experience conducted at university
                and college by investors, our first visit and local, I Mike
                wasting to close collaboration with them as the technology,
                business and design.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#0E6CC2]">Contents</h3>
              <div className="text-xs text-[#222222] space-y-1">
                <p className="underline">{contactInfo.email}</p>
                <p className="underline">{contactInfo.linkedin}</p>
                <p className="underline">{contactInfo.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0E6CC2] mb-2">
                Skills
              </h3>
              <ul className="space-y-0.5 text-[#222222] text-xs">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-2/3 space-y-4">
            {workExperience.map((job, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-bold text-[#222222]">{job.role}</h4>
                <p className="text-[#0E6CC2] text-sm font-semibold">
                  {job.company_name},&nbsp;{job.start_date} - {job.end_date}
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[#222222] text-xs">
                  {job.description?.split("\n").map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Education */}
        <div>
          <h3 className="text-sm font-semibold text-[#0E6CC2]">
            Education & Learning
          </h3>
          <div className="grid grid-cols-2 gap-y-4">
            {education.map((education, index) => (
              <div key={index}>
                <h4 className="font-semibold text-[#222222]">
                  {education.certificate}
                </h4>
                <p className="text-[#444444] text-sm">
                  {education.institution},&nbsp;
                  {education.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ResumeFour;
