import React from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";

const JobTypeDropDown = ({
  jobType,
  setJobType,
}: {
  jobType: string;
  setJobType: (jobType: string) => void;
}) => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className="px-3 w-full py-3 cursor-pointer rounded-lg bg-[#EDF2F7] text-sm text-[#898989] flex items-center"
      >
        {jobType}
        <CaretDownIcon className="ml-auto" />
      </div>
      <div
        className={`overflow-hidden mt-4 rounded-md border duration-300 ease-in-out transform ${
          showDropDown
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div
          onClick={() => {
            setJobType("Remote");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            jobType === "Remote" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Remote
        </div>
        <div
          onClick={() => {
            setJobType("Hybrid");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            jobType === "Hybrid" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Hybrid
        </div>
        <div
          onClick={() => {
            setJobType("Full Time");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            jobType === "Full Time" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Full Time
        </div>
        <div
          onClick={() => {
            setJobType("Part Time");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            jobType === "Part Time" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Part Time
        </div>
        <div
          onClick={() => {
            setJobType("Internship");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            jobType === "Internship" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Internship
        </div>
      </div>
    </div>
  );
};

export default JobTypeDropDown;
