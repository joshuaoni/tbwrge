import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ManSuit from "../../../../../public/images/man-suit.png";
import RocketIcon from "../../../../../public/images/rocket.png";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { span } from "framer-motion/client";

const LandingHeroSection = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Candidate";
  const delay = 150; // Adjust speed here for faster/slower typing
  const isMobile = useIsMobile();
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // Reset the typing animation after a short pause
      const resetTimeout = setTimeout(() => {
        setCurrentText("");
        setCurrentIndex(0);
      }, delay * 3); // delay before resetting

      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, delay, fullText]);
  return (
    <div className="h-fit bg-primary pt-24 md:pt-0 flex items-center  justify-center p-4 py-12 md:py-0 md:p-12  ">
      <div className="flex items-center justify-between w-fit ">
        <div className="w-full md:w-[70%]">
          {!isMobile ? (
            <div className="text-[40px] text-white font-extrabold flex flex-col items-start">
              <h1 className="block">Find The Right</h1>
              <p className="text-[#DEA042]">
                {!isMobile ? (
                  <span>
                    {currentText}{" "}
                    <span className="animate-blink  font-light text-white">
                      |
                    </span>
                  </span>
                ) : (
                  <span>Candidate</span>
                )}{" "}
                <span className="text-white"> For The Job</span>
              </p>
            </div>
          ) : (
            <div className="text-[40px] leading-[45px] mb-3 text-white font-extrabold flex flex-col items-start">
              <h1 className="block">A Simple</h1>
              <p className="text-[#DEA042]">
                {<span>Candidate</span>}{" "}
                <span className="text-white"> Management Platform</span>
              </p>
            </div>
          )}

          <p className="text-white max-w-[700px] ">
            Accelerate your hiring with tools like CV vetting, job post
            creation, cover letter translation, and more designed to simplify
            your workflow.
          </p>
          <div className="flex flex-col md:flex-row md:items-center  space-y-4 md:space-y-0 mt-8 md:space-x-4">
            <Button className="bg-[#009379] max-w-40 text-white  rounded-xl">
              <Image src={RocketIcon} alt="" width={20} height={20} />
              Get Started
            </Button>
            <Button className="bg-white max-w-40 text-primary rounded-xl">
              How it works
            </Button>
          </div>
        </div>
        {!isMobile && (
          <div className="w-[30%] ml-[100px] mt-20">
            <Image src={ManSuit} alt="" width={300} height={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingHeroSection;
