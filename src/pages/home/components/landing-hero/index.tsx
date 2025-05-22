import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import ManSuit from "../../../../../public/images/man-suit.png";
import RocketIcon from "../../../../../public/images/rocket.png";
import { outfit, poppins } from "@/constants/app";
import Partners from "../partners";

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
    <div className="relative min-h-[700px] h-screen pt-24 bg-black md:pt-[74px] flex items-center justify-center p-4 py-12 md:py-0 md:p-0 ">
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
      {/* Main Content */}
      <div className="flex items-center justify-center w-full relative z-10">
        <div className="w-full flex flex-col justify-between md:h-[650px] py-[40px] md:py-0 md:px-0">
          <div className="flex flex-1 flex-col items-start md:items-center justify-center w-full ">
            <div className="text-3xl md:text-6xl text-white font-extrabold flex flex-col items-center md:items-start">
              <p
                className={`${poppins.className} text-4xl md:text-[60px] text-start md:text-center leading-[1.3] capitalize`}
              >
                Hire <span className="text-[#FDB833]">Smarter</span>.
                <br />
                Get Hired <span className="text-[#FDB833]">Faster</span>.
              </p>
            </div>

            <p
              className={`${outfit.className} text-white text-left max-w-[700px] md:text-center !text-[20px] !leading-[31px] md:text-base md:mt-8`}
            >
              Candivet is the #1 global AI-powered platform designed to simplify
              hiring for recruiters and job seekers alike. Whether you're
              looking to find top talent or land your dream job, we optimize
              every step of the process.
            </p>

            <div
              className={`${poppins.className} flex gap-4 w-full items-start md:justify-center md:flex-row md:items-center space-y-4 md:space-y-0 mt-6 md:mt-12 md:space-x-4`}
            >
              <Button className="w-[220px] bg-[#009379] text-white text-[12px] md:py-6 font-semibold md:px-4 md:max-w-40 rounded-[10px]">
                Post a Job
              </Button>
              <Button className="w-[220px] bg-[#00000000] border text-white text-[12px] md:py-6 font-semibold md:px-4 md:max-w-40 rounded-[10px]">
                Join Talent Pool
              </Button>
              <Button className="w-[220px] bg-white text-[12px] md:py-6 font-semibold md:px-4 md:max-w-40 text-primary rounded-[10px]">
                {/* <Image
                  src="/RocketLaunch.png"
                  alt=""
                  width={16}
                  height={16}
                  className="mr-2"
                /> */}
                Apply for a Job
              </Button>
            </div>

            <p
              className={`${outfit.className} text-white text-left max-w-[700px] md:text-center text-sm md:text-base mt-6 md:mt-12`}
            >
              Used by{" "}
              <span className="font-bold text-[20px]">
                <span className="text-[#FDB833]">15,000+</span> Recruiters{" "}
              </span>
              & over{" "}
              <span className="font-bold text-[20px]">
                <span className="text-[#FDB833]">1 Million</span> Candidates{" "}
              </span>
              in our Talent Pool
            </p>
          </div>

          <div className="">
            <Partners />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
