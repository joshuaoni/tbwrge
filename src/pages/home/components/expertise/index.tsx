import { Button } from "@/components/ui/button";
import Image from "next/image";
import RocketIcon from "../../../../../public/images/rocket.png";
import ExpertiseMan from "../../../../../public/images/expertise-man.png";
import ManSuit from "../../../../public/images/man-suit.png";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { poppins } from "@/constants/app";

const Expertise = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`${poppins.className} h-[500px] relative bg-[#FADAA9] flex items-center  justify-center p-4 md:p-16 md:pb-[16px]`}
    >
      <div className="flex items-center justify-between w-fit relative">
        <div className="w-full md:w-[50%] relative z-10">
          <div className="text-[30px] md-text-[40px] text-black font-extrabold flex flex-col items-start">
            <div
              className={`${poppins.className} text-[50px] text-black font-extrabold flex flex-col items-start`}
            >
              <h1 className="leading-[1.3]">
                Share Your
                <span className="text-[#009379]"> Expertise </span>
                with the Community
              </h1>
            </div>
          </div>
          <p className="text-black max-w-[700px] ">
            Submit your blog post with your title, name, job title, company, and
            profile image. After a quick review, your post will be published
            with full recognition as an expert in the Candivet community.
          </p>
          <div className="flex items-center mt-8">
            <Button className="bg-[#009379] text-[12px] px-6 py-5 text-white  rounded-xl">
              <Image src={RocketIcon} alt="" width={16} height={16} />
              Share Now
            </Button>
          </div>
        </div>
        {!isMobile && (
          <div className="w-[50%] -mt-48 relative">
            <div className="absolute bottom-0 right-[20px] w-[350px] h-[270px] bg-[#C44900] " />
            <div className="relative z-10">
              <Image src={ExpertiseMan} alt="" width={800} height={800} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expertise;
