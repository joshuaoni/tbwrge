import React from "react";
import {
  ChevronDown,
  ChevronUp,
  File,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";

const CvDropDown = () => {
  const [showCvDropDown, setShowCvDropDown] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setShowCvDropDown(!showCvDropDown)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <GraduationCap size={20} className="mr-2 text-primary" />
          <span className="font-medium">CV</span>
        </div>
        {showCvDropDown ? <ChevronUp /> : <ChevronDown />}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
          showCvDropDown
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="mt-4 ml-3 space-y-4">
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 f text-sm">Summarizer</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 f text-sm">CV Vetting</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 f text-sm">
              CV Matching & Ranking
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 f text-sm">
              CV Generator
            </span>
          </div>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag size={20} className="mr-2 text-primary" />
            <span className="font-light opacity-35 f text-sm">
              CV Translator
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CvDropDown;
