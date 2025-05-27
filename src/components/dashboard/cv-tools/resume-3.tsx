import { poppins } from "@/constants/app";
import { ResumeProps } from "@/interfaces/cv-generator.interface";
import classNames from "classnames";
import { forwardRef } from "react";

const ResumeThree = forwardRef<HTMLDivElement, ResumeProps>(
  ({ name, title, contactInfo, workExperience, education, skills }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          poppins.className,
          "bg-white p-6 rounded-lg w-full"
        )}
      >
        {/* Header Section */}
        <div className="flex justify-between gap-8 mb-6">
          <div className="w-2/5">
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="text-xs">{title}</p>
          </div>
          <div className="w-full text-xs underline">
            <p>{contactInfo?.email}</p>
            <p>{contactInfo?.linkedin}</p>
            <p>{contactInfo?.phone}</p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="grid grid-cols-[120px_1fr_120px] gap-4 mb-6">
          <div>
            <h2 className="text-xs font-medium">Experience</h2>
          </div>
          <div className="col-span-2">
            {workExperience?.map((job, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_120px] gap-4 mb-4 last:mb-0"
              >
                <div>
                  <p className="text-xs font-medium">
                    {job.role}, {job.company_name}
                  </p>
                  <ul className="text-xs text-gray-600 mt-1">
                    {job.description?.split("\n").map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-600 text-right">
                  {job.start_date} - {job.end_date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="grid grid-cols-[120px_1fr_120px] gap-4 mb-6">
          <div>
            <h2 className="text-xs font-medium">Education</h2>
          </div>
          <div className="col-span-2">
            {education?.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_120px] gap-4 mb-2 last:mb-0"
              >
                <div>
                  <p className="text-xs">{edu.certificate}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-600 text-right">{edu.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-[120px_1fr_120px] gap-4">
          <div>
            <h2 className="text-xs font-medium">Skills</h2>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-3 gap-2">
              {skills?.map((skill, index) => (
                <div key={index} className="text-[10px]">
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

ResumeThree.displayName = "ResumeThree";

export default ResumeThree;
