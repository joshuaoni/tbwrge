import React from "react";
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import Image from "next/image";
import gem from "../../public/images/gem.png";
const JobsDropdown = () => {
  const [showJobsDropdown, setShowJobsDropdown] = React.useState(false);
  const [dropDownItems, setDropDownItems] = React.useState([
    {
      title: "Job Posts",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "Candidates",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "Jobs",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "Job Applications",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
    {
      title: "Job Offers",
      icon: <Image src={gem} alt="" width={30} height={30} />,
    },
  ]);
  return (
    <>
      <div
        onClick={() => setShowJobsDropdown(!showJobsDropdown)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <ShoppingBag size={20} className="mr-2 text-primary" />
          <span className="font-normal text-[16px]">Jobs Tools</span>
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

export default JobsDropdown;
