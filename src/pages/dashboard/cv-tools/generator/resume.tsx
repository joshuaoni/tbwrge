import classNames from "classnames";

import { FaPhone } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { TbMailFilled } from "react-icons/tb";

import { poppins, prata } from "@/constants/app";
import { forwardRef } from "react";
import { IconType } from "react-icons/lib";
import { ContactInfo, ResumeProps } from "../../../../interfaces/cv-generator.interface";

const contactIcon: Record<string, IconType> = {
  email: TbMailFilled,
  phone: FaPhone,
  linkedin: RiLinkedinFill,
};

function renderContactIcon(type: string) {
  const Icon = contactIcon[type];
  return <Icon size={8} />;
}

const Resume = forwardRef<HTMLDivElement, ResumeProps>(
  ({ name, title, contactInfo, workExperience, education, skills }, ref) => {
    return (
      <div ref={ref} className="bg-white p-6">
        {/* Header */}
        <header
          className={classNames(
            prata.className,
            "mb-10 flex items-start justify-between"
          )}
        >
          <div className="w-40">
            <span className="block text-resume-text font-bold text-sm">
              {title}
            </span>
            <span className="block text-4xl font-bold">{name}</span>
          </div>
          <ul className="text-gray-600 space-y-1">
            {(Object.keys(contactInfo) as (keyof ContactInfo)[]).map(
              (item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="bg-resume-text p-1 rounded-full text-[#DADADA]">
                    {renderContactIcon(item as string)}
                  </span>
                  <span className="text-xs">{contactInfo[item]}</span>
                </li>
              )
            )}
          </ul>
        </header>

        <div className="flex items-start gap-10">
          {/* Left Column */}
          {workExperience![0]?.role && (
            <div className="w-full">
              {/* Work Experience */}
              <section className="mb-10">
                <h2
                  className={classNames(
                    prata.className,
                    "text-resume-text font-bold mb-4"
                  )}
                >
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {workExperience.map((job, index) => (
                    <div key={index}>
                      <h3
                        className={classNames(
                          prata.className,
                          "font-semibold text-gray-800"
                        )}
                      >
                        <span className="block text-sm">{job.role}</span>
                        <span className="block text-gray-500 text-xs">
                          {job.company_name}, {job.start_date} - {job.end_date}
                        </span>
                      </h3>
                      <p
                        className={classNames(
                          poppins.className,
                          "text-xs text-gray-600 mt-1"
                        )}
                      >
                        {job.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Right Column */}
          {education![0].certificate && (
            <div className={classNames(prata.className, "w-full")}>
              {/* Education */}
              <section>
                <h2 className="text-resume-text font-bold mb-4">
                  Education & Learning
                </h2>
                <div className="space-y-6 text-xs">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-800">
                        {edu.certificate}{" "}
                        <span className="text-gray-500">
                          - {edu.institution}, {edu.date}
                        </span>
                      </h3>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Skills */}
        <section>
          <h2
            className={classNames(
              prata.className,
              "text-resume-text font-bold text-lg mb-2"
            )}
          >
            Skills
          </h2>
          <ul className="grid grid-cols-3 text-gray-700 text-sm">
            {skills.map((skill, index) => (
              <li key={index} className={poppins.className}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
);

export default Resume;
