import React, { useRef } from "react";
import LandingHeader from "../landing-header";
import LandingFooter from "../landing-footer";
import AboutUs from "../../about-us";
import Tools from "../../tools";
import RightCandidate from "../../right-candidate";
import PricingPlans from "../../pricing-plans";
import BlogPosts from "@/pages/blog-posts";
import Expertise from "../../expertise";
import Community from "../../community";
import LandingHeroSection from "../../landing-hero";

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
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
};

export default LandingWrapper;
