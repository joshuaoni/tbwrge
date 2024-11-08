import React from "react";
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import gem from "../../../public/images/gem.png";
const CvDropDown = () => {
  const [showCvDropDown, setShowCvDropDown] = React.useState(false);
  const [dropDownItems, setDropDownItems] = React.useState([
    {
      title: "Summarizer",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "CV Vetting",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "CV Matching & Ranking",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "CV Generator",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "CV Translator",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
  ]);

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
        <div className="mb-2 ml-3 space-y-4">
          {dropDownItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.icon}
              <span className="ml-2 opacity-40">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CvDropDown;
