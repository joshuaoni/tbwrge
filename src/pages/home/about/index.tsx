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
import Tools from "../components/tools";

const index = () => {
  const isMobile = useIsMobile();

  return (
    <LandingWrapper>
      <main className={`${poppins.className} flex flex-col`}>
        <div className="relative min-h-[700px] h-screen w-full md:px-16 px-4 pt-[100px] bg-black">
          {/* Background image and overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.6,
              zIndex: 0,
            }}
          />
          <div className="relative z-10 flex items-center h-full ">
            <div className="flex md:w-[50%] w-full flex-col items-start">
              <h1 className="mb-4 md:text-[60px] text-[16px] text-white font-extrabold">
                About <span className="text-[#DEA042]">Us</span>
              </h1>
              <p
                className={`${outfit.className} leading-[26px] text-white text-sm font-light`}
              >
                At Candivet, we're transforming the way professionals connect
                with opportunities by merging technology with human-centered
                design to support every stage of the hiring journey. Built with
                AI-driven tools, Candivet provides a comprehensive platform for
                recruiters and job seekers to simplify the job search,
                application, and candidate vetting processes.
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
        </div>
      </main>
      <Tools />
    </LandingWrapper>
  );
};

export default index;
