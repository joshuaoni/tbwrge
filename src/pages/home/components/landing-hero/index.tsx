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
    <div
      className="relative h-fit pt-24 md:pt-[74px] flex items-center justify-center p-4 py-12 md:py-0 md:p-12 md:px-16"
      style={{
        backgroundImage: "url(/hero-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-start md:items-center justify-center w-full md:w-2/3 md:h-[600px] py-[40px] md:py-0 md:px-4">
          <div className="text-3xl md:text-6xl mb-3 text-white font-extrabold flex flex-col items-center md:items-start">
            <p
              className={`${poppins.className} text-4xl md:text-[50px] text-start md:text-center leading-[1.3] capitalize`}
            >
              hire <span className="text-[#FDB833]">smarter</span>
              <br />
              get hired <span className="text-[#FDB833]">faster</span>
            </p>
          </div>

          <p
            className={`${outfit.className} text-white text-left max-w-[700px] md:text-center !text-[20px] !leading-[31px] md:text-base`}
          >
            Candivet is the #1 global AI-powered platform designed to simplify
            hiring for recruiters and job seekers alike. Whether you're looking
            to find top talent or land your dream job, we optimize every step of
            the process.
          </p>
          <div
            className={`${poppins.className} flex flex-col w-full items-start md:justify-center md:flex-row md:items-center space-y-4 md:space-y-0 mt-6 md:mt-16 md:space-x-4`}
          >
            <Button className="w-[220px] bg-white text-[12px] md:py-6 font-semibold md:px-4 md:max-w-40 text-primary rounded-[20px]">
              <Image
                src="/RocketLaunch.png"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              Get Started
            </Button>
          </div>
          <p
            className={`${outfit.className} text-white text-left max-w-[700px] md:text-center text-sm md:text-base mt-16`}
          >
            Used by 15,000+ Recruiters & over 1 Million Candidates in our Talent
            Pool
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
