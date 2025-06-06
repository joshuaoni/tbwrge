import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const CvDropDown = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathName = router.asPath;

  const [showCvDropDown, setShowCvDropDown] = React.useState(() =>
    pathName.includes("/dashboard/cv-tools")
  );

  const [dropDownItems, setDropDownItems] = React.useState(() => [
    {
      link: "/dashboard/cv-tools/summarizer",
      title: t("tools.summarizer"),
      icon: "Pro",
    },
    {
      link: "/dashboard/cv-tools/vetting",
      title: t("tools.vetting"),
      icon: "Pro",
    },
    {
      link: "/dashboard/cv-tools/ranking",
      title: t("tools.matchingRanking"),
      icon: "Pro",
    },
    {
      link: "/dashboard/cv-tools/head-to-head",
      title: t("tools.headToHead"),
      icon: "Pro",
    },
    {
      link: "/dashboard/cv-tools/generator",
      title: t("tools.generator"),
      icon: "Pro",
    },
    {
      link: "/dashboard/cv-tools/translator",
      title: t("tools.translator"),
      icon: "Pro",
    },
    {
      link: "/dashboard/cv-tools/rewriter",
      title: t("tools.rewriter"),
      icon: "Pro",
    },
  ]);

  // Update dropdown items when language changes
  React.useEffect(() => {
    setDropDownItems([
      {
        link: "/dashboard/cv-tools/summarizer",
        title: t("tools.summarizer"),
        icon: "Pro",
      },
      {
        link: "/dashboard/cv-tools/vetting",
        title: t("tools.vetting"),
        icon: "Pro",
      },
      {
        link: "/dashboard/cv-tools/ranking",
        title: t("tools.matchingRanking"),
        icon: "Pro",
      },
      {
        link: "/dashboard/cv-tools/head-to-head",
        title: t("tools.headToHead"),
        icon: "Pro",
      },
      {
        link: "/dashboard/cv-tools/generator",
        title: t("tools.generator"),
        icon: "Pro",
      },
      {
        link: "/dashboard/cv-tools/translator",
        title: t("tools.translator"),
        icon: "Pro",
      },
      {
        link: "/dashboard/cv-tools/rewriter",
        title: t("tools.rewriter"),
        icon: "Pro",
      },
    ]);
  }, [t]);

  return (
    <>
      <div
        onClick={() => setShowCvDropDown(!showCvDropDown)}
        className="flex justify-between cursor-pointer py-2"
      >
        <div className="flex items-center">
          <GraduationCap size={20} className="mr-2 text-primary" />
          <span className="text-sm">{t("tools.cvTools")}</span>
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
        <div className="mb-2 ml-3 cursor-pointer">
          {dropDownItems.map((item, index) => {
            const isActiveRoute = item.link === pathName;
            return (
              <div
                onClick={() => router.push(item.link)}
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

                  <span className="ml-2 text-sm ">{item.title}</span>
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
