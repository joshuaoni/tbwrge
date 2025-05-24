import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import ManSuit from "../../../../../public/images/man-suit.png";
import RocketIcon from "../../../../../public/images/rocket.png";
import { outfit, poppins } from "@/constants/app";
import Partners from "../partners";
import { useRouter } from "next/router";
import { useUserStore } from "@/hooks/use-user-store";

const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(1);
  const [showPlus, setShowPlus] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      // Show plus sign when we reach the end
      if (currentCount >= end) {
        setShowPlus(true);
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return { count, showPlus };
};

export { useCountAnimation };

const LandingHeroSection = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Candidate";
  const delay = 150; // Adjust speed here for faster/slower typing
  const isMobile = useIsMobile();
  const router = useRouter();
  const { userData } = useUserStore();
  const { count: recruiterCount, showPlus: showRecruiterPlus } =
    useCountAnimation(15000);
  const [animateMillion, setAnimateMillion] = useState(false);

  const handlePostJob = () => {
    const path = "/dashboard/create";
    if (!userData?.token || userData?.user?.role === "job_seeker") {
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleJoinTalentPool = () => {
    const path = "/dashboard/talent-pool/join-talent-pool";
    if (!userData?.token) {
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleApplyJob = () => {
    const path = "/dashboard/job-board";
    if (!userData?.token) {
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

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

  useEffect(() => {
    if (showRecruiterPlus) {
      setAnimateMillion(true);
      const timeout = setTimeout(() => setAnimateMillion(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [showRecruiterPlus]);

  return (
    <>
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
            <div className="flex flex-1 flex-col items-start md:items-center justify-center w-full">
              <div className="text-3xl md:text-6xl text-white font-extrabold flex flex-col items-center md:items-start">
                <p
                  className={`${poppins.className} text-3xl md:text-[60px] text-start md:text-center leading-[1.3] capitalize px-4 md:px-0`}
                >
                  Hire <span className="text-[#FDB833]">Smarter</span>.
                  <br />
                  Get Hired <span className="text-[#FDB833]">Faster</span>.
                </p>
              </div>

              <p
                className={`${outfit.className} text-white text-left max-w-[700px] md:text-center !text-[16px] md:!text-[20px] !leading-[24px] md:!leading-[31px] px-4 md:px-0 md:mt-8 mt-4`}
              >
                Candivet is the #1 global AI-powered platform designed to
                simplify hiring for recruiters and job seekers alike. Whether
                you're looking to find top talent or land your dream job, we
                optimize every step of the process.
              </p>

              <div
                className={`${poppins.className} flex flex-col md:flex-row gap-4 w-full items-center md:justify-center mt-6 md:mt-12 px-4 md:px-0`}
              >
                <Button
                  onClick={handlePostJob}
                  className="w-full md:w-[220px] bg-[#009379] text-white text-[12px] py-4 md:py-6 font-semibold px-4 md:max-w-40 rounded-[10px]"
                >
                  Post a Job
                </Button>
                <Button
                  onClick={handleJoinTalentPool}
                  className="w-full md:w-[220px] bg-[#00000000] border text-white text-[12px] py-4 md:py-6 font-semibold px-4 md:max-w-40 rounded-[10px]"
                >
                  Join Talent Pool
                </Button>
                <Button
                  onClick={handleApplyJob}
                  className="w-full md:w-[220px] bg-white text-[12px] py-4 md:py-6 font-semibold px-4 md:max-w-40 text-primary rounded-[10px]"
                >
                  Apply for a Job
                </Button>
              </div>

              <p
                className={`${outfit.className} text-white text-left max-w-[700px] md:text-center text-sm md:text-base mt-6 md:mt-12 px-4 md:px-0`}
              >
                Used by{" "}
                <span className="font-bold text-[18px] md:text-[20px]">
                  <span className="text-[#FDB833]">
                    {recruiterCount.toLocaleString()}
                    <span
                      className={`inline-block transition-opacity duration-500${
                        showRecruiterPlus ? " opacity-100" : " opacity-0"
                      }`}
                    >
                      {showRecruiterPlus ? "+ " : ""}
                    </span>
                  </span>{" "}
                  Recruiters{" "}
                </span>
                & over{" "}
                <span className="font-bold text-[18px] md:text-[20px]">
                  <br className="block md:hidden" />
                  <span
                    className={`text-[#FDB833] inline-block${
                      animateMillion ? " pop-animate" : ""
                    }`}
                  >
                    1 Million
                  </span>{" "}
                  Candidates{" "}
                </span>
                in our Talent Pool
              </p>
            </div>

            <div className="mt-8 md:mt-0">
              <Partners />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pop {
          0% {
            transform: scale(1);
            color: #fdb833;
          }
          30% {
            transform: scale(1.25);
            color: #fff700;
          }
          60% {
            transform: scale(0.95);
            color: #fdb833;
          }
          100% {
            transform: scale(1);
            color: #fdb833;
          }
        }
        .pop-animate {
          animation: pop 1.2s cubic-bezier(0.36, 1.7, 0.3, 0.9);
        }
      `}</style>
    </>
  );
};

export default LandingHeroSection;
