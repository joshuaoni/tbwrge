import { ResumeProps } from "@/interfaces/cv-generator.interface";
import { forwardRef } from "react";
import { outfit } from "@/constants/app";
import { cn } from "@/lib/utils";

const Resume = forwardRef<HTMLDivElement, ResumeProps>(
  ({ name, title, contactInfo, workExperience, education, skills }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(outfit.className, "bg-white h-full w-full relative")}
      >
        {/* Curved Background */}
        <div
          className="absolute top-0 left-0 right-0 h-[180px] bg-[#FDF8F3]"
          style={{
            borderBottomLeftRadius: "40% 20%",
            borderBottomRightRadius: "40% 20%",
          }}
        />

        {/* Content */}
        <div className="relative p-8">
          {/* Header Section */}
          <div className="mb-16">
            <h2 className="text-[#C97B43] text-base mb-1">{title}</h2>
            <div className="flex justify-between">
              <div>
                <h1 className="text-[2.5rem] leading-none font-serif">
                  {name.split(" ")[0]}
                  <br />
                  {name.split(" ")[1]}
                </h1>
              </div>
              <div className="text-[12px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-[14px] h-[14px] rounded-full border-2 border-[#C97B43] flex items-center justify-center">
                    <span className="text-[#C97B43] text-[10px]">@</span>
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[14px] h-[14px] rounded-full border-2 border-[#C97B43] flex items-center justify-center">
                    <span className="text-[#C97B43] text-[10px]">in</span>
                  </div>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {contactInfo.linkedin?.replace(
                      "https://linkedin.com/in/",
                      ""
                    ) || ""}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[14px] h-[14px] rounded-full border-2 border-[#C97B43] flex items-center justify-center">
                    <span className="text-[#C97B43] text-[8px]">☎</span>
                  </div>
                  <span>{contactInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[1fr,1fr] gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-[#C97B43] text-lg font-serif mb-2">
                Work experience
              </h2>
              <div className="space-y-8">
                {workExperience?.map((job, index) => (
                  <div key={index}>
                    <h3 className="text-base font-serif mb-1">{job.role}</h3>
                    <p className="text-sm text-[#666666] mb-1">
                      {job.company_name}, {job.start_date} - {job.end_date}
                    </p>
                    <div className="text-sm leading-relaxed">
                      {job.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-[#C97B43] text-lg font-serif mb-2">
                Education & Learning
              </h2>
              <div className="space-y-6">
                {education?.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-base font-serif mb-1">
                      {edu.certificate}
                    </h3>
                    <p className="text-sm text-[#666666]">
                      {edu.institution}, {edu.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Skills Section */}
          <div className="mt-4">
            <h2 className="text-[#C97B43] text-lg font-serif mb-2">Skills</h2>
            <div className="grid grid-cols-3 gap-x-2 gap-y-0">
              {skills?.map((skill, index) => (
                <div key={index} className="text-[12px]">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Resume.displayName = "Resume";

export default Resume;
