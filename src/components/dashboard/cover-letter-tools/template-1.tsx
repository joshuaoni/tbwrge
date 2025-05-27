import { forwardRef } from "react";
import { CoverLetterGenerator } from "@/interfaces/generator.interface";

interface Props {
  data?: CoverLetterGenerator;
}

const CoverLetterTemplate1 = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        className="relative max-w-4xl mx-auto p-4 flex justify-center bg-white border border-gray-200 rounded-lg text-xs"
      >
        <div className="w-1/4 mt-28">
          <p className="">
            <span className="font-bold">
              {data?.candidate_name || "Candidate Name"}
            </span>
            <br />
            {data?.candidate_address || "Candidate Address"}
          </p>

          <p className="mt-6">
            <span className="font-bold">To</span>
            <br />
            <span className="font-semibold">
              {data?.company || "Company Name"}
            </span>
            <br />
            {data?.company_address || "Company Address"}
          </p>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-[16%] py-4 px-2 flex flex-col items-end bg-white">
          <span className="uppercase tracking-widest text-base font-semibold">
            date
          </span>
          <span className="font-bold">-</span>
          <span>{currentDate}</span>
        </div>

        <div className="border-l-2 border-black pl-6 ml-6 w-2/3">
          <h3 className="text-xl font-extralight">
            {data?.candidate_name || "Candidate Name"}
          </h3>
          <p className="border-b-2 border-orange-300 w-fit font-extralight text-base mb-6">
            Cover Letter
          </p>
          <p className="font-semibold">Dear Hiring Manager,</p>

          <p className="mt-2 text-gray-700 whitespace-pre-line">
            {data?.cover_letter_text ||
              "Cover letter content will appear here."}
          </p>

          <div className="mt-6">
            <p>Best regards,</p>
            <p className="font-bold">
              {data?.candidate_name || "Candidate Name"}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default CoverLetterTemplate1;
