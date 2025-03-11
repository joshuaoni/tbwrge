import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import ManSuit from "../../../../../public/images/man-suit.png";
import RocketIcon from "../../../../../public/images/rocket.png";
import { outfit, poppins } from "@/constants/app";

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
    <div className="relative h-fit bg-[#065844] pt-24 md:pt-0 flex items-center justify-center p-4 py-12 md:py-0 md:p-12 md:px-16">
      {/* Top-right circle */}
      <div className="absolute top-[5px] right-[0px] w-[120px] h-[120px] bg-[#FDB833] border-[25px] border-[#009379] rounded-full"></div>

      {/* Bottom-left circle */}
      <div className="absolute bottom-[0px] left-[0px] w-[80px] h-[80px] bg-[#FDB833] border-[25px] border-[#FF6250] rounded-full"></div>

      {/* Main Content */}
      <div className="flex items-center justify-center w-fit md:w-full">
        <div className="flex flex-col items-center justify-center w-full md:w-2/3 md:h-[600px]">
          <div className="text-6xl mb-3 text-white font-extrabold flex flex-col items-start">
            <p
              className={`${poppins.className} text-center leading-[1.3] capitalize`}
            >
              a simple <span className="text-[#FDB833]">candidate</span>
              <br />
              management platform
            </p>
          </div>

          <p
            className={`${outfit.className} text-white text-center max-w-[700px]`}
          >
            Accelerate your hiring with tools like CV vetting, job post
            creation, cover letter translation, and more designed to simplify
            your workflow.
          </p>
          <div
            className={`${poppins.className} flex flex-col text-[10px] md:flex-row md:items-center space-y-4 md:space-y-0 mt-8 md:space-x-4`}
          >
            <Button className="bg-[#009379] text-[12px] px-[40px] py-[20px] max-w-40 text-white rounded-xl">
              <Image src={RocketIcon} alt="" width={16} height={16} />
              Get Started
            </Button>
            <Button className="bg-white text-[12px] px-[40px] py-[20px] max-w-40 text-primary rounded-xl">
              How it works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
