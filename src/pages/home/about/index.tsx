import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import Community from "../components/community";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import AboutUs from "../../../../public/images/about-us.png";
import Image from "next/image";
import { outfit, poppins } from "@/constants/app";
import Expertise from "../components/expertise";
import { useIsMobile } from "@/hooks/use-mobile";

const index = () => {
  const isMobile = useIsMobile();

  return (
    <LandingWrapper>
      <main
        className={`${poppins.className} pt-[150px] md:pt-[100px] px-4 md:px-16 flex flex-col`}
      >
        <div className="flex items-center pb-32 ">
          <div className="flex md:w-[50%] w-full flex-col items-start">
            <h1 className="mb-4 md:text-[60px] text-[16px] text-primary font-extrabold">
              About Us
            </h1>
            <p
              className={`${outfit.className} leading-[26px] text-[#898989] text-sm font-light`}
            >
              At Candivet, we’re transforming the way professionals connect with
              opportunities by merging technology with human-centered design to
              support every stage of the hiring journey. Built with AI-driven
              tools, Candivet provides a comprehensive platform for recruiters
              and job seekers to simplify the job search, application, and
              candidate vetting processes.
            </p>
            <Button className="flex md:mt-8 mt-4 text-[12px] px-[40px] py-[25px] rounded-[20px] bg-[#009379] text-white items-center">
              <p>Join Us</p> <ArrowRight />
            </Button>
          </div>
          {!isMobile && (
            <div className="w-[50%] flex justify-end">
              <Image src={AboutUs} alt="" width={500} height={500} />
            </div>
          )}
        </div>

        {/* <section className="flex bg-[#F5F5F5]  p-12 mt-12 flex-col items-center py-8 justify-center">
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
        </section> */}
      </main>
      <Expertise />
      <Community />
    </LandingWrapper>
  );
};

export default index;
