import { Button } from "@/components/ui/button";
import { outfit } from "@/constants/app";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const featureCards = [
  {
    image: "/one.png",
    title: "Automated Job Posting & Candidate Vetting",
  },
  {
    image: "/two.png",
    title: "AI-Powered CV & Cover Letter Optimization",
  },
  {
    image: "/three.png",
    title: "Smart Interview & Screening Tools",
  },
  {
    image: "/four.png",
    title: "Real-Time Talent Matching & Ranking",
  },
];

const Tools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const leftContentVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightCardsVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const featureCardVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Mobile Carousel Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featureCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featureCards.length) % featureCards.length
    );
  };

  return (
    <section
      ref={ref}
      className={`${outfit.className} overflow-hidden w-full px-4 py-8 md:px-16 md:py-12 flex flex-col items-start`}
    >
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        {/* Left: Headline, Description, Button */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={leftContentVariants}
          className="w-full md:max-w-lg flex flex-col gap-4 md:gap-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-[#184C2A] leading-tight">
            Our Tools Simplify Your Journey
          </h2>
          <p className="text-sm md:text-base text-[#184C2A] font-medium">
            At Candivet, we're transforming the way professionals connect with
            opportunities by merging technology with human-centered design to
            support every stage of the hiring journey. Built with AI-driven
            tools, Candivet provides a comprehensive platform for recruiters and
            job seekers to simplify the job search, application, and candidate
            vetting processes.
          </p>
          <Button
            style={{
              backgroundImage: "url(/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="text-white rounded-full px-6 py-2 w-full md:w-fit text-sm md:text-base font-semibold shadow-none hover:bg-[#184C2A]/90"
          >
            Get Started
          </Button>
        </motion.div>
        {/* Right: Recruiters & Job Seekers Cards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 w-full md:w-auto">
          {["Recruiters", "Job Seekers"].map((role, idx) => (
            <motion.div
              key={role}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={rightCardsVariants}
              className="flex flex-col gap-2 w-full md:w-auto"
            >
              <span className="text-primary text-lg md:text-[20px] font-semibold tracking-wide">
                {role}
              </span>
              <div
                style={{
                  backgroundImage: "url(/hero-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="rounded-2xl p-4 md:p-6 pt-8 md:pt-12 w-full md:w-64 flex flex-col items-start shadow-md"
              >
                <div className="w-full flex justify-center items-center">
                  <div className="w-12 h-12 md:w-[74px] md:h-[74px] rounded-full border border-white flex items-center justify-center mb-4">
                    {/* User Icon */}
                    <svg
                      width="40"
                      height="40"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="md:w-14 md:h-14"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        stroke="#dfdfdf"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"
                        stroke="#dfdfdf"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-white font-semibold text-base md:text-lg leading-snug mb-4">
                  Job Posting, Talent Pool, Candidate Vetting Tools and many
                  more...
                </div>
                <a
                  href="#"
                  className="flex items-center text-white text-sm font-medium hover:underline"
                >
                  Learn More <span className="ml-1">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="w-full mt-8 md:mt-16">
        {/* Mobile Carousel */}
        <div className="relative w-full md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featureCards.map((card, idx) => (
                <div
                  key={card.title}
                  className="w-full flex-shrink-0 flex justify-center px-4"
                >
                  <motion.div
                    custom={idx}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={featureCardVariants}
                    className="rounded-2xl p-6 pb-8 w-full max-w-[300px] flex flex-col items-start shadow-md"
                    style={{
                      backgroundImage: "url(/hero-bg.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="mb-8 w-full">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={825}
                        height={460}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="text-white font-semibold text-lg leading-snug">
                      {card.title}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300"
            aria-label="Previous Feature"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300"
            aria-label="Next Feature"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featureCards.map((card, idx) => (
            <motion.div
              key={card.title}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={featureCardVariants}
              className="rounded-2xl p-6 md:p-8 pb-8 md:pb-12 w-full flex flex-col items-start shadow-md"
              style={{
                backgroundImage: "url(/hero-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="mb-8 md:mb-12 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={825}
                  height={460}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-white font-semibold text-lg md:text-xl leading-snug">
                {card.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
