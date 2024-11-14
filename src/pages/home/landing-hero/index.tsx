import { Button } from "@/components/ui/button";
import React from "react";
import ManSuit from "../../../../public/images/man-suit.png";
import RocketIcon from "../../../..//public/images/rocket.png";
import Image from "next/image";

const LandingHeroSection = () => {
  return (
    <div className="h-[500px] bg-primary flex items-center  justify-center p-12  ">
      <div className="flex items-center justify-between w-fit ">
        <div className="w-[70%]">
          <div className="text-[40px] text-white font-extrabold flex flex-col items-start">
            <h1 className=" block   ">Find The Right</h1>
            <p className="text-[#DEA042]">
              Candidate <span className="text-white"> For The Job</span>{" "}
            </p>
          </div>
          <p className="text-white max-w-[700px] ">
            Accelerate your hiring with tools like CV vetting, job post
            creation, cover letter translation, and more designed to simplify
            your workflow.
          </p>
          <div className="flex items-center mt-8 space-x-4">
            <Button className="bg-[#009379] text-white  rounded-xl">
              <Image src={RocketIcon} alt="" width={20} height={20} />
              Get Started
            </Button>
            <Button className="bg-white text-primary rounded-xl">
              How it works
            </Button>
          </div>
        </div>
        <div className="w-[30%] ml-[100px] mt-20">
          <Image src={ManSuit} alt="" width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
