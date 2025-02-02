import { poppins } from "@/constants/app";
import { ResumeProps } from "@/interfaces/cv-generator.interface";
import classNames from "classnames";
import { forwardRef } from "react";

const ResumeFive = forwardRef<HTMLDivElement, ResumeProps>(
  ({ name, title, contactInfo, workExperience, education, skills }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          poppins.className,
          " max-w-5xl mx-auto bg-white shadow-md  rounded-lg w-full p-6 text-[#222222]"
        )}
      >
        <div className="bg-[#E4F6FB]/50 flex justify-between items-start border-b p-5">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-xl text-[#1C8EB5] font-medium">{title}</p>
            <p className="max-w-sm">
              Over 5 years of professional experience conducting UX research and
              designing interactive end-to-end user flows. I enjoy working in
              close collaboration with teams across technology, business, and
              design.
            </p>
          </div>
          <div className="space-y-1">
            {[
              { label: "Email", value: contactInfo.email },
              { label: "LinkedIn", value: contactInfo.linkedin },
              { label: "Phone", value: contactInfo.phone },
            ].map((contact, index) => (
              <div key={index} className="text-sm font-semibold">
                <p className="text-[#1C8EB5]">{contact.label}</p>
                <p className="underline">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-8 mt-6 p-5">
          {/* Work Experience */}
          <div>
            <h2 className="text-lg font-medium text-[#1C8EB5]">
              Work Experience
            </h2>
            {workExperience.map((job, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-bold text-lg">{job.role}</h3>
                <p className="text-gray-600">
                  {job.company_name}, {job.start_date} - {job.end_date}
                </p>
                <p className="mt-1 text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-medium text-[#1C8EB5]">
              Education & Learning
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-bold text-lg">{edu.certificate}</h3>
                <p className="text-gray-600">
                  {edu.institution}, {edu.date}
                </p>
              </div>
            ))}

            {/* Skills */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-[#1C8EB5]">Skills</h2>
              <p className="mt-2 text-gray-700">
                {skills.map((skill, index) => (
                  <span key={index} className="mr-2 ">
                    {skill}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ResumeFive;
