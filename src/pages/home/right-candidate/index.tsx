import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import RocketIcon from "../../../../public/images/rocket.png";
import ManSuit from "../../../../public/images/man-suit.png";
import RightCandidateWoman from "../../../../public/images/right-candidate-woman.png";

const RightCandidate = () => {
  return (
    <div className="h-fit bg-[#133026] flex items-center  justify-center p-12  ">
      <div className="flex items-center justify-between w-fit ">
        <div className="w-[35%]">
          <div className="text-[40px] text-white font-extrabold flex flex-col items-start">
            <h1 className=" block">Ready to find the </h1>
            <div className="flex">
              <p>Right</p> <p className="text-[#DEA042] ml-2"> Candidate</p>
            </div>
            <span className="text-white"> For The Job</span>{" "}
          </div>
          <div className="flex items-center mt-8 space-x-4">
            <Button className="bg-[#009379] text-white  rounded-xl">
              <Image src={RocketIcon} alt="" width={20} height={20} />
              Get Started
            </Button>
          </div>
        </div>
        <div className="w-[65%] ml-[100px] mt-20">
          <Image src={RightCandidateWoman} alt="" width={600} height={600} />
        </div>
      </div>
    </div>
  );
};

export default RightCandidate;
