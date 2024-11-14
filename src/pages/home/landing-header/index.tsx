import React, { RefObject } from "react";
import candivetlogo from "../../../../public/images/candivet-logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

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
  return (
    <div className="w-full z-20 fixed flex items-center bg-white   top-0 border py-4">
      <div className="flex items-center ml-6 cursor-pointer">
        <Image src={candivetlogo} alt="" width={50} height={50} />
        <h1 className="text-3xl font-bold">Candivet</h1>
      </div>
      <NavigationHeader
        CommunitySectionRef={CommunitySectionRef}
        scrollToSection={scrollToSection}
        aboutUsSectionRef={aboutUsSectionRef}
        toolsSectionRef={toolsSectionRef}
        pricingSectionRef={pricingSectionRef}
        blogSectionRef={blogSectionRef}
      />
      <div className="ml-auto mr-8">
        <Button className="border-none outline-none tet-black">Log In</Button>
        <Button className="bg-primary text-white">Sign Up</Button>
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
