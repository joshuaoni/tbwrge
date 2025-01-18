import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import gem from "../../../public/images/gem.png";
const CvDropDown = () => {
  const [showCvDropDown, setShowCvDropDown] = React.useState(false);
  const router = useRouter();

  const [dropDownItems, setDropDownItems] = React.useState([
    {
      link: "/dashboard/cv-tools/summarizer",
      title: "Summarizer",
      icon: <Image src={gem} alt="" width={20} height={20} />,
    },
    {
      link: "/dashboard/cv-tools/vetting",
      title: "CV Vetting",
      icon: <Image src={gem} alt="" width={20} height={20} />,
    },
    {
      link: "/dashboard/cv-tools/head-to-head",
      title: "CV Head to Head",
      icon: <Image src={gem} alt="" width={20} height={20} />,
    },
    {
      link: "/dashboard/cv-tools/generator",
      title: "CV Generator",
      icon: <Image src={gem} alt="" width={20} height={20} />,
    },
    {
      link: "/dashboard/cv-tools/translator",
      title: "CV Translator",
      icon: <Image src={gem} alt="" width={20} height={20} />,
    },
    {
      link: "/dashboard/cv-tools/rewriter",
      title: "CV Rewriter",
      icon: <Image src={gem} alt="" width={20} height={20} />,
    },
    {
      link: "/dashboard/cv-tools/ranking",
      title: "CV Ranking",
      icon: <Image src={gem} alt="" width={20} height={20} />,
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
          <span className="font-medium">CV Tools</span>
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
        <div className="mb-2 ml-3 space-y-4 cursor-pointer">
          {dropDownItems.map((item, index) => {
            const pathName = usePathname();
            const isActiveRoute = item.link === pathName;
            return (
              <div
                onClick={() => router.push(item.link)}
                key={index}
                className={`flex relative ${
                  isActiveRoute
                    ? "bg-primary  py-3 hover:bg-primary/80 transition-colors transform duration-300 border-l-2 border-l-primary text-white z-30 font-bold"
                    : " font-normal"
                } items-center`}
              >
                <div
                  className={`h-7 w-[5px] ${
                    isActiveRoute ? "bg-white" : "bg-transparent"
                  } absolute -left-[2px] rounded-r `}
                />
                <div className="flex ml-3 items-center">
                  {item.icon}
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

export default CvDropDown;
