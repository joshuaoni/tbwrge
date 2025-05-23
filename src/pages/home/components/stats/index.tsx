import { outfit } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const HomePageStats = () => {
  const isMobile = useIsMobile();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const stats = [
    {
      value: "30+",
      label: "Countries",
      sub: "#7 2025 Global Ranking",
    },
    {
      value: "15k+",
      label: "Business Partners",
      sub: "From Small Businesses to Large Enterprises",
    },
    {
      value: "98%",
      label: "Matching Accuracy",
      sub: "Candidate and Job Matching",
    },
  ];

  return (
    <div
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
      <h1 className="text-[44px] leading-[60px] text-center font-bold relative w-[65%] z-10">
        <span className="bg-gradient-to-r from-white/60 via-white to-white/40 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          Build confidence in your Hiring and Job Seeking
        </span>
        <span className="bg-gradient-to-r from-white/60 via-white to-white/40 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          {" "}
          journey with the #1 Global platform
        </span>
      </h1>
      <p className="text-white text-center md:text-base text-[14px] w-[80%] mt-4 z-10">
        Candivet simplifies hiring and job seeking with AI-driven automation and
        intelligent matching. Recruiters can post jobs, vet candidates, and
        schedule interviews effortlessly, while job seekers benefit from
        tailored CVs, optimized cover letters, and real-time job matching. We
        makes the process faster, smarter, and more efficient—so you can focus
        on finding the perfect fit.
      </p>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 mt-10 z-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="flex-1 flex flex-col items-center"
          >
            <div className="text-yellow-400 text-3xl md:text-4xl font-bold mb-2">
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
