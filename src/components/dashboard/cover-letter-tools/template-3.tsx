import { forwardRef } from "react";
import { CoverLetterGenerator } from "@/interfaces/generator.interface";

interface Props {
  data?: CoverLetterGenerator;
}

const CoverLetterTemplate2 = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-gray-50 border border-gray-200 text-xs flex items-center justify-center"
      >
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-3xl w-full">
          <div className="flex justify-between items-start">
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
              <p className="text-sm text-gray-600">
                {data?.company || "Company Name"}
              </p>
            </div>
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

export default CoverLetterTemplate2;
