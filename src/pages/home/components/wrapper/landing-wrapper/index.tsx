import React, { useRef } from "react";
import LandingHeader from "../landing-header";
import LandingFooter from "../landing-footer";
const LandingWrapper = ({ children }: { children: React.ReactNode }) => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const toolsSectionRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const CommunitySectionRef = useRef<HTMLDivElement>(null);
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-screen ">
      <LandingHeader
        aboutUsSectionRef={aboutSectionRef}
        toolsSectionRef={toolsSectionRef}
        pricingSectionRef={pricingSectionRef}
        blogSectionRef={blogSectionRef}
        CommunitySectionRef={CommunitySectionRef}
        scrollToSection={scrollToSection}
      />
      <main className="md:pt-[74px]">{children}</main>
      <LandingFooter />
    </div>
  );
};

export default LandingWrapper;
