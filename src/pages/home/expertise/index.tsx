import { Button } from "@/components/ui/button";
import Image from "next/image";
import RocketIcon from "../../../../public/images/rocket.png";
import ExpertiseMan from "../../../../public/images/expertise-man.png";
import ManSuit from "../../../../public/images/man-suit.png";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Expertise = () => {
  const isMobile = useIsMobile();
  return (
    <div className="h-[500px] relative bg-[#FADAA9] flex items-center  justify-center p-4 md:p-12  mt-12 ">
      <div className="flex items-center justify-between w-fit md:px-32 ">
        <div className="w-full md:w-[40%]">
          <div className="text-[30px] md-text-[40px] text-black font-extrabold flex flex-col items-start">
            <h1 className=" flex items-center  ">
              <span>Share your</span>{" "}
              <p className="text-primary ml-2">Expertise</p>{" "}
            </h1>
            <p className="text-[#DEA042]">
              <span className="text-white"> With the community</span>{" "}
            </p>
          </div>
          <p className="text-black max-w-[700px] ">
            Submit your blog post with your title, name, job title, company, and
            profile image. After a quick review, your post will be published
            with full recognition as an expert in the Candivet community.
          </p>
          <div className="flex items-center mt-8 space-x-4">
            <Button className="bg-[#009379] text-white  rounded-xl">
              <Image src={RocketIcon} alt="" width={20} height={20} />
              Share Now
            </Button>
          </div>
        </div>
        {!isMobile && (
          <div className="w-[60%]  -mt-48 ml-[100px] ">
            <Image src={ExpertiseMan} alt="" width={800} height={800} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Expertise;
