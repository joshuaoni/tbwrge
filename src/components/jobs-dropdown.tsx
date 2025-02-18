import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import gem from "../../public/images/gem.png";
const JobsDropdown = () => {
  const [showJobsDropdown, setShowJobsDropdown] = React.useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [dropDownItems, setDropDownItems] = React.useState([
    {
      link: "/dashboard/job-tools/generator",
      title: "Job Post Generator",
      icon: 'Pro',
    },
    {
      link: "/dashboard/job-tools/vetting",
      title: "Job Post Vetting",
      icon: 'Pro',
    },
    {
      link: "/dashboard/job-tools/translator",
      title: "Job Post Translator",
      icon: 'Pro',
    },
    {
      link: "/dashboard/job-tools/report-generator/",
      title: "Candidate Report Generator",
      icon: 'Pro',
    },
    {
      link: "/dashboard/job-tools/generate-interview-questions/",
      title: "Ai Interview and Screening Generator",
      icon: 'Pro',
    },
    {
      link: "/dashboard/job-tools/screening-question-assistant/",
      title: "Screening Assistant",
      icon: 'Pro',
    },
    {
      link: "/dashboard/job-tools/ai-prep",
      title: "Prep Guide",
      icon: 'Pro',
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
          showJobsDropdown || pathName.includes("/dashboard/job-tools")
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="mb-2 ml-3 space-y-4 cursor-pointer">
          {dropDownItems.map((item, index) => {
            const isActiveRoute = item.link === pathName;
            return (
              <div
                onClick={() => router.push(item.link)}
                key={index}
                className={`flex relative ${
                  isActiveRoute
                    ? "bg-primary  py-3 hover:bg-primary/80 transition-colors transform duration-300 border-l-2 border-l-primary text-white z-30 font-bold"
                    : " font-normal"
                } items-center hover:bg-primary  hover:py-3 hover:bg-primary/80 hover:transition-colors hover:transform hover:duration-300 hover:border-l-2 hover:border-l-primary hover:text-white z-30 hover:font-bold`}
              >
                <div
                  className={`h-7 w-[5px] ${
                    isActiveRoute ? "bg-white" : "bg-transparent"
                  } absolute -left-[2px] rounded-r `}
                />
                <div className="flex ml-3 items-center">
                <p className='py-1 text-black px-4 bg-white rounded-lg text-sm font-bold border-[1px] border-solid border-green-600'>{item.icon}</p>
                  <span className="ml-2 opacity-40 text-sm ">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JobsDropdown;
