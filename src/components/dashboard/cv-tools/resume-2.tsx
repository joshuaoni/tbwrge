import { poppins } from "@/constants/app";
import { ResumeProps } from "@/interfaces/cv-generator.interface";
import classNames from "classnames";
import { forwardRef } from "react";

const ResumeTwo = forwardRef<
  HTMLDivElement,
  Omit<ResumeProps, "skills" | "education">
>(({ name, title, contactInfo, workExperience }, ref) => {
  return (
    <div
      className={classNames(
        poppins.className,
        "bg-white shadow-md p-6 rounded-lg w-full"
      )}
    >
      {/* Header Section */}
      <div className="flex justify-between gap-8 mb-6">
        <div className="w-2/5">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-sm">{title}</p>
        </div>
        <div className="w-full text-sm underline">
          <p>{contactInfo?.email}</p>
          <p>{contactInfo?.linkedin}</p>
          <p>{contactInfo?.phone}</p>
        </div>
      </div>

      {/* Experience Section */}
      <div>
        <h2 className="text-sm font-medium mb-4">Experience</h2>

        {/* Job 1 */}
        {workExperience.map((job, index) => (
          <div key={index} className="mb-6 flex gap-8 justify-between">
            <p className="text-sm text-gray-500 w-2/5">
              {job.start_date} - {job.end_date}
            </p>
            <div className="w-full">
              <h3 className="text-md font-semibold text-gray-800">
                {job.role}, {job.company_name}
              </h3>
              <ul className="text-xs mt-2 space-y-1">
                {job.description?.split("\n").map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ResumeTwo;
