import React from "react";
import { ChevronDown, ChevronUp, File, ShoppingBag } from "lucide-react";

const CoverLetterDropDown = () => {
  const [showCoverLetterDropDown, setShowCoverLetterDropDown] =
    React.useState(false);

  return (
    <>
      <div
        onClick={() => setShowCoverLetterDropDown(!showCoverLetterDropDown)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <File size={20} className="mr-2 text-primary" />
          <span className="font-medium">Cover Letter</span>
        </div>
        {showCoverLetterDropDown ? <ChevronUp /> : <ChevronDown />}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
          showCoverLetterDropDown
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="mt-4 ml-3 space-y-4">
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 font-medium text-sm">
              Summarizer
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 font-medium text-sm">
              Cover Letter Vetting
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 font-medium text-sm">
              CV Matching & Ranking
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 font-medium text-sm">
              Cover Letter Generator
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 font-medium text-sm">
              Cover Letter Translator
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverLetterDropDown;
