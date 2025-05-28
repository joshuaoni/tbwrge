import { outfit } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useInView } from "framer-motion";
import { useCountAnimation } from "../landing-hero";
import { useRef } from "react";

const HomePageStats = () => {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const { count: countriesCount, showPlus: showCountriesPlus } =
    useCountAnimation(isInView ? 30 : 0);
  const { count: partnersCount, showPlus: showPartnersPlus } =
    useCountAnimation(isInView ? 15000 : 0);
  const { count: accuracyCount, showPlus: showAccuracyPlus } =
    useCountAnimation(isInView ? 98 : 0);

  const stats = [
    {
      value: `${countriesCount}${showCountriesPlus ? "+" : ""}`,
      label: "Countries",
      sub: "#7 2025 Global Ranking",
    },
    {
      value: `${partnersCount.toLocaleString()}${showPartnersPlus ? "+" : ""}`,
      label: "Business Partners",
      sub: "From Small Businesses to Large Enterprises",
    },
    {
      value: `${accuracyCount}${showAccuracyPlus ? "%" : ""}`,
      label: "Matching Accuracy",
      sub: "Candidate and Job Matching",
    },
  ];

  return (
    <div
      ref={ref}
      className={`${outfit.className} relative h-fit pt-24 md:pt-[74px] flex flex-col gap-10 items-center justify-center p-4 py-12 md:py-24 md:p-12 md:px-16 bg-black`}
      style={{
        position: "relative",
      }}
    >
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
      <h1 className="text-2xl md:text-[44px] leading-tight md:leading-[60px] text-center font-bold relative w-full md:w-[65%] z-10 px-4">
        <span className="bg-gradient-to-r from-white/60 via-white to-white/40 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          Build confidence in your Hiring and Job Seeking
        </span>
        <span className="bg-gradient-to-r from-white/60 via-white to-white/40 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          {" "}
          journey with the #1 Global platform
        </span>
      </h1>
      <p className="text-white text-center text-sm md:text-base w-full md:w-[80%] mt-4 z-10 px-4">
        Candivet simplifies hiring and job seeking with AI-driven automation and
        intelligent matching. Recruiters can post jobs, vet candidates, and
        schedule interviews effortlessly, while job seekers benefit from
        tailored CVs, optimized cover letters, and real-time job matching. We
        makes the process faster, smarter, and more efficient—so you can focus
        on finding the perfect fit.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-0 z-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="flex-1 flex flex-col items-center text-center"
          >
            <div className="text-yellow-400 text-2xl md:text-4xl font-bold mb-2">
              {stat.value}
            </div>
            <div className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
              {stat.label}
            </div>
            <div className="text-gray-300 text-xs md:text-sm">{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePageStats;
