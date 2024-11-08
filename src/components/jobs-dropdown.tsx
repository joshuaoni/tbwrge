import React from "react";
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

const JobsDropdown = () => {
  const [showJobsDropdown, setShowJobsDropdown] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setShowJobsDropdown(!showJobsDropdown)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <ShoppingBag size={20} className="mr-2 text-primary" />
          <span className="font-normal text-[16px]">Jobs</span>
        </div>
        {showJobsDropdown ? <ChevronUp /> : <ChevronDown />}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
          showJobsDropdown
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="my-4 ml-3 space-y-4">
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35  text-[16px]">
              Job Post Generator
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35  text-[16px]">
              Job Post Vetting
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35  text-[16px]">
              Job Post Translator
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsDropdown;
