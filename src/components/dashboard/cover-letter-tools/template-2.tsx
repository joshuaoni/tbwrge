import { forwardRef } from "react";
import { CoverLetterGenerator } from "@/interfaces/generator.interface";

interface Props {
  data?: CoverLetterGenerator;
}

const CoverLetterTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        className="bg-gray-50 border border-gray-200 text-xs flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
          <div className="flex justify-between items-start border-b border-[#16153D] pb-2">
            {/* Left Section */}
            <div>
              <h1 className="text-base font-semibold">
                {data?.candidate_name || "Candidate Name"}
              </h1>
              <p className="text-sm text-gray-600 font-medium mt-2">
                Cover Letter
              </p>
            </div>

            {/* Right Section */}
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {data?.candidate_address || "Candidate Address"}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="text-sm text-gray-600 mt-4">
            <p>{currentDate}</p>
            <p>{data?.company || "Company Name"}</p>
            <p>{data?.company_address || "Company Address"}</p>
          </div>

          {/* Letter Content */}
          <div className="mt-6">
            <p className="font-semibold text-base">Dear Hiring Manager,</p>
            <p className="mt-4 text-gray-700 whitespace-pre-line">
              {data?.cover_letter_text ||
                "Cover letter content will appear here."}
            </p>
          </div>

          {/* Closing */}
          <div className="mt-6">
            <p>Best regards,</p>
            <p>{data?.candidate_name || "Candidate Name"}</p>
          </div>
        </div>
      </div>
    );
  }
);

export default CoverLetterTemplate;
