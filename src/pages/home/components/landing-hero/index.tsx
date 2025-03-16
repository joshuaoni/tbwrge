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
      {!isMobile && (
        <div className="absolute top-[10px] right-[0px] w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-[#FDB833] border-[15px] md:border-[25px] border-[#009379] rounded-full"></div>
      )}

      {/* Bottom-left circle */}
      {!isMobile && (
        <div className="absolute bottom-[0px] left-[0px] w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-[#FDB833] border-[15px] md:border-[25px] border-[#FF6250] rounded-full"></div>
      )}

      {/* Main Content */}
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-start md:items-center justify-center w-full md:w-2/3 md:h-[600px] py-[40px] md:py-0 md:px-4">
          <div className="text-3xl md:text-6xl mb-3 text-white font-extrabold flex flex-col items-center md:items-start">
            <p
              className={`${poppins.className} text-4xl md:text-[50px] text-start md:text-center leading-[1.3] capitalize`}
            >
              a simple <span className="text-[#FDB833]">candidate</span>
              <br />
              management platform
            </p>
          </div>

          <p
            className={`${outfit.className} text-white text-left max-w-[700px] md:text-center text-sm md:text-base`}
          >
            A comprehensive suite of tools to simplify the recruitment journey
            for both recruiters and job seekers. Our AI-powered platform makes
            every step of the process faster, smarter, and more effective.
          </p>
          <div
            className={`${poppins.className} flex flex-col w-full items-start md:justify-center md:flex-row md:items-center space-y-4 md:space-y-0 mt-6 md:mt-8 md:space-x-4`}
          >
            <Button className="bg-[#009379] text-[12px] px-[40px] py-[25px] md:max-w-40 text-white rounded-[20px]">
              <Image
                src={RocketIcon}
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              Get Started
            </Button>
            <Button className="bg-white text-[12px] px-[40px] py-[25px] rounded-[20px] md:max-w-40 text-primary">
              How it works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
