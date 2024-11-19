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
      <main className=" pt-[100px] flex flex-col">
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
        <section className="flex bg-[#F5F5F5]  p-12 mt-12 flex-col items-center py-8 justify-center">
          <h1 className="text-[30px] font-bold">
            Streamline your hiring with Candivet
          </h1>
          <p className="text-sm">
            For recruiters, Candivet is more than a toolkit; it's a strategic
            partner in finding top talent efficiently. 
          </p>

          <div className="self-center px-4 space-x-18 flex my-4  items-center ">
            <div className="w-[50%] h-[300px] bg-gray-300"></div>

            <div className="w-[50%] ">
              <div className="flex flex-col  space-y-6  min-h-[400px]  rounded-lg items-center justify-center px-4 ">
                <p className="text-start text-base">
                  Our features range from CV and cover letter generators to
                  advanced tools for candidate vetting, ranking, and job post
                  management, empowering recruiters to create meaningful
                  connections with ideal candidates. Whether it’s crafting
                  tailored job posts, generating detailed candidate reports, or
                  assessing CVs against specific job requirements, Candivet
                  helps reduce manual effort and enhance precision in talent
                  acquisition. <br /> For job seekers, Candivet offers
                  personalized tools to stand out in competitive markets. With
                  resources to match, summarize, and translate CVs and cover
                  letters to fit specific job ads, our platform supports
                  applicants in presenting their skills clearly and
                  professionally.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Community />
    </LandingWrapper>
  );
};

export default index;
