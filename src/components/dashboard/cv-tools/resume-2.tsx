import { ResumeProps } from "@/interfaces/cv-generator.interface";
import { forwardRef } from "react";
import { outfit } from "@/constants/app";
import { cn } from "@/lib/utils";

const ResumeTwo = forwardRef<HTMLDivElement, ResumeProps>(
  ({ name, title, contactInfo, workExperience, education, skills }, ref) => {
    return (
      <div ref={ref} className={cn(outfit.className, "bg-white w-full p-12")}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-xl font-medium mb-1">{name}</h1>
              <h2 className="text-gray-600">{title}</h2>
            </div>
            <div className="text-sm text-right">
              <a
                href={`mailto:${contactInfo.email}`}
                className="block hover:underline"
              >
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
              >
                {contactInfo.linkedin.replace("https://linkedin.com/in/", "")}
              </a>
              <span className="block">{contactInfo.phone}</span>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <h2 className="text-base font-medium mb-6">Experience</h2>
          <div className="space-y-8">
            {workExperience?.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-medium">
                    {job.role}, {job.company_name}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {job.start_date} - {job.end_date}
                  </span>
                </div>
                <div className="text-sm space-y-2">
                  {job.description?.split("\n").map((desc, i) => (
                    <p key={i}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-12">
          <h2 className="text-base font-medium mb-6">Education</h2>
          <div className="space-y-4">
            {education?.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-medium">{edu.certificate}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">{edu.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-base font-medium mb-4">Skills</h2>
          <div className="grid grid-cols-3 gap-y-2">
            {skills?.map((skill, index) => (
              <div key={index} className="text-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ResumeTwo.displayName = "ResumeTwo";

export default ResumeTwo;
