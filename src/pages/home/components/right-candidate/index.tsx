import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import RocketIcon from "../../../../../public/images/rocket.png";
import RightCandidateWoman from "../../../../../public/images/right-candidate-woman.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { outfit, poppins } from "@/constants/app";

const RightCandidate = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`${outfit.className} h-fit bg-[#133026] md:flex items-center  justify-center py-[50px] md:mb-0  p-4  md:p-0 md:pl-16 `}
    >
      <div className="flex items-center justify-between w-full">
        <div className="w-full md:w-[50%]">
          <div
            className={` text-[40px] md:text-[60px] text-white font-extrabold flex flex-col items-start pr-12`}
          >
            <h1 className="leading-[1.3]">
              Ready to <br />
              <span className="text-[#DEA042]">Streamline</span> your Hiring
              Process?
            </h1>
          </div>
          <div className="flex items-center mt-8 space-x-4">
            <Button className="bg-white  text-[14px] px-[40px] py-[20px] md:py-[25px]  text-primary rounded-xl">
              <Image src="/RocketLaunch.png" alt="" width={20} height={20} />
              Get Started
            </Button>
          </div>
        </div>

        {!isMobile && (
          <div
            className="md:w-[50%] h-[500px] bg-cover bg-center"
            style={{ backgroundImage: "url('/right_candidate_bg.png')" }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default RightCandidate;
