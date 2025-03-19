import { ChevronDown, ChevronUp, File } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
const CoverLetterDropDown = () => {
  const [showCoverLetterDropDown, setShowCoverLetterDropDown] =
    React.useState(false);
  const router = useRouter();
  const pathName = router.asPath;

  const [dropDownItems, setDropDownItems] = React.useState([
    {
      link: "/dashboard/cover-letter-tools/summarizer",
      title: "Summarizer",
      icon: "Pro",
    },
    {
      link: "/dashboard/cover-letter-tools/vetting",
      title: "Vetting",
      icon: "Pro",
    },
    {
      link: "/dashboard/cover-letter-tools/ranking",

      title: "Ranking",
      icon: "Pro",
    },
    {
      link: "/dashboard/cover-letter-tools/generator",
      title: "Generator",
      icon: "Pro",
    },
    {
      link: "/dashboard/cover-letter-tools/translator",
      title: "Translator",
      icon: "Pro",
    },
    {
      link: "/dashboard/cover-letter-tools/rewriter",
      title: "Rewriter",
      icon: "Pro",
    },
  ]);
  return (
    <>
      <div
        onClick={() => setShowCoverLetterDropDown(!showCoverLetterDropDown)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <File size={20} className="mr-2 text-primary" />
          <span className="">Cover Letter Tools</span>
        </div>
        {showCoverLetterDropDown ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
          showCoverLetterDropDown ||
          pathName.includes("/dashboard/cover-letter-tools")
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="mb-2 ml-3 cursor-pointer">
          {dropDownItems.map((item, index) => {
            const isActiveRoute = item.link === pathName;
            return (
              <div
                onClick={(e) => {
                  router.push(item.link), e.stopPropagation();
                }}
                key={index}
                className={`flex relative group ${
                  isActiveRoute
                    ? "bg-primary  py-3 hover:bg-primary/80 transition-colors transform duration-300 border-l-2 border-l-primary text-white z-30 font-bold"
                    : "text-black/40 font-normal"
                } items-center hover:bg-primary py-2 hover:bg-primary/80 hover:transition-colors hover:transform hover:duration-300 hover:text-white z-30`}
              >
                <div
                  className={`h-7 w-[5px] ${
                    isActiveRoute ? "bg-white" : "bg-transparent"
                  } absolute -left-[2px] rounded-r `}
                />
                <div className="flex ml-3 items-center">
                  <Image
                    src="/gem.png"
                    alt={item.title}
                    width={20}
                    height={20}
                  />
                  <span className="ml-2 text-sm">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CoverLetterDropDown;
