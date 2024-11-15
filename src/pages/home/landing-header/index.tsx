import React, { RefObject } from "react";
import candivetlogo from "../../../../public/images/candivet-logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-mobile";

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
    <div className="w-full px-4 md:px-0 z-20 fixed flex items-center bg-white   top-0 border py-4">
      <div className="flex items-center md:ml-[170px] cursor-pointer">
        <Image src={candivetlogo} alt="" width={50} height={50} />
        <h1 className="text-3xl font-bold">Candivet</h1>
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
      {!isMobile ? (
        <div className="ml-auto mr-8">
          <Button
            onClick={() => router.push("/home/sign-in")}
            className="border-none outline-none tet-black"
          >
            Log In
          </Button>
          <Button className="bg-primary text-white">Sign Up</Button>
        </div>
      ) : (
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center ml-auto"></div>
      )}
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
      link: "/about",
    },
    {
      ref: toolsSectionRef,
      title: "Tools",
      link: "/tools",
    },
    {
      ref: pricingSectionRef,
      title: "Pricing",
      link: "/pricing",
    },
    {
      ref: blogSectionRef,
      title: "Blog",
      link: "/blog",
    },
    {
      ref: CommunitySectionRef,
      title: "Community",
      link: "/community",
    },
  ];
  return (
    <div>
      <div className="flex items-center space-x-8 ml-12">
        {Navs.map((nav, index) => (
          <NavItem scrollToSection={scrollToSection} {...nav} key={index} />
        ))}
      </div>
    </div>
  );
};
const NavItem = ({
  scrollToSection,
  title,
  ref,
  link,
}: {
  scrollToSection: (sectionRef: RefObject<HTMLDivElement>) => void;
  title: string;
  link: string;
  ref: RefObject<HTMLDivElement>;
}) => {
  const pathName = usePathname();
  const isActive = link.includes(pathName);
  const onClick = () => {
    scrollToSection(ref);
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
      } cursor-pointer`}
    >
      {title}
    </span>
  );
};

export default LandingHeader;
