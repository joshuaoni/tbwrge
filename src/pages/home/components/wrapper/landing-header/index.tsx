import React, { RefObject } from "react";
import candivetlogo from "../../../../../../public/images/candivet-logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-mobile";
import { poppins } from "@/constants/app";
import { outfit } from "@/constants/app";

const LandingHeader = ({
  scrollToSection,
  aboutUsSectionRef,
  toolsSectionRef,
  pricingSectionRef,
  blogSectionRef,
  CommunitySectionRef,
}: {
  scrollToSection: (sectionRef: RefObject<HTMLDivElement>) => void;
  aboutUsSectionRef: RefObject<HTMLDivElement>;
  toolsSectionRef: RefObject<HTMLDivElement>;
  pricingSectionRef: RefObject<HTMLDivElement>;
  blogSectionRef: RefObject<HTMLDivElement>;
  CommunitySectionRef: RefObject<HTMLDivElement>;
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <div className="w-full px-4 md:px-16 z-20 fixed flex items-center justify-between bg-white top-0 border py-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <div
            onClick={() => router.push("/home")}
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/header-logo.png"
              alt=""
              width={25}
              height={25}
              className="w-[25px] h-[25px] md:w-[50px] md:h-[50px]"
            />
            <h1
              className={`${outfit.className} ml-2 text-xl md:text-3xl font-bold`}
            >
              Candivet
            </h1>
          </div>
          {!isMobile && (
            <NavigationHeader
              CommunitySectionRef={CommunitySectionRef}
              scrollToSection={scrollToSection}
              aboutUsSectionRef={aboutUsSectionRef}
              toolsSectionRef={toolsSectionRef}
              pricingSectionRef={pricingSectionRef}
              blogSectionRef={blogSectionRef}
            />
          )}
        </div>
        {!isMobile ? (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/home/sign-in")}
              className="border-none outline-none tet-black"
            >
              Log In
            </Button>
            <Button
              onClick={() => router.push("/home/sign-up")}
              className="bg-[#009379] text-white"
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
};

const NavigationHeader = ({
  scrollToSection,
  aboutUsSectionRef,
  toolsSectionRef,
  pricingSectionRef,
  blogSectionRef,
  CommunitySectionRef,
}: {
  scrollToSection: (sectionRef: RefObject<HTMLDivElement>) => void;
  aboutUsSectionRef: RefObject<HTMLDivElement>;
  toolsSectionRef: RefObject<HTMLDivElement>;
  pricingSectionRef: RefObject<HTMLDivElement>;
  blogSectionRef: RefObject<HTMLDivElement>;
  CommunitySectionRef: RefObject<HTMLDivElement>;
}) => {
  const Navs = [
    {
      title: "Home",
      link: "/home",
    },
    {
      ref: aboutUsSectionRef,
      title: "About",
      link: "/home/about",
    },
    {
      ref: toolsSectionRef,
      title: "Tools",
      link: "/home/tools",
    },
    {
      ref: pricingSectionRef,
      title: "Pricing",
      link: "/home/pricing",
    },
    {
      ref: blogSectionRef,
      title: "Blog",
      link: "/home/blog",
    },
    {
      ref: CommunitySectionRef,
      title: "Community",
      link: "/community",
    },
  ];
  return (
    <div>
      <div className="flex items-center text-[14px] space-x-12 ml-12">
        {Navs.map((nav, index) => (
          <NavItem scrollToSection={scrollToSection} {...nav} key={index} />
        ))}
      </div>
    </div>
  );
};
const NavItem = ({ title, link }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split("/")[pathName.split("/").length - 1];
  console.log("path", path, link);
  const isActive = path === link.split("/")[link.split("/").length - 1];
  const onClick = () => {
    router.push(link);
  };
  return (
    <span
      onClick={() => {
        onClick();
      }}
      className={`${
        isActive
          ? "text-primary font-bold underline underline-offset-2 transform transition-all"
          : "text-black"
      } ${poppins.className} cursor-pointer`}
    >
      {title}
    </span>
  );
};

export default LandingHeader;
