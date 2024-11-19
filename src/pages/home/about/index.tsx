import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import Community from "../components/community";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import AboutUs from "../../../../public/images/about-us.png";
import Image from "next/image";

const index = () => {
  return (
    <LandingWrapper>
      <main className="h-screen pt-[100px] p-12 flex flex-col">
        <div className="flex items-center  px-24 ">
          <div className="flex w-[50%] flex-col items-start space-y-2">
            <h1 className="text-[60px] text-primary font-extrabold">
              About Us
            </h1>
            <p className="text-sm font-light max-w-[400px]">
              At Candivet, we’re transforming the way professionals connect with
              opportunities by merging technology with human-centered design to
              support every stage of the hiring journey. Built with AI-driven
              tools, Candivet provides a comprehensive platform for recruiters
              and job seekers to simplify the job search, application, and
              candidate vetting processes.
            </p>
            <Button className="flex bg-primary text-white items-center">
              <p>Join Us</p> <ArrowRight /> 
            </Button>
          </div>
          <div className="w-[50%]">
            <Image src={AboutUs} alt="" width={500} height={500} />
          </div>
        </div>
      </main>
      <Community />
    </LandingWrapper>
  );
};

export default index;
