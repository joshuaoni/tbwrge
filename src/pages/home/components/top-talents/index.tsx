import { Button } from "@/components/ui/button";
import { outfit } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getTalents } from "@/actions/talent";
import { useUserStore } from "@/hooks/use-user-store";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import butterfly from "../../../../../public/butterfly2.png";

interface Talent {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
}

const dummyTalents: Talent[] = [
  {
    id: 1,
    name: "John Smith",
    title: "CEO and Founder",
    image: "/unsplash_man.png",
    description:
      "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Senior Developer",
    image: "/unsplash_man.png",
    description:
      "Full-stack developer with expertise in React, Node.js, and cloud architecture",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "UX Designer",
    image: "/unsplash_man.png",
    description:
      "Award-winning designer specializing in user experience and interface design",
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "Product Manager",
    image: "/unsplash_man.png",
    description:
      "Product strategy expert with a track record of successful launches",
  },
  {
    id: 5,
    name: "David Wilson",
    title: "Data Scientist",
    image: "/unsplash_man.png",
    description:
      "Machine learning specialist with focus on predictive analytics",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    title: "Marketing Director",
    image: "/unsplash_man.png",
    description:
      "Digital marketing strategist with expertise in growth hacking",
  },
];

const TalentCard = ({ talent }: { talent: Talent }) => {
  const router = useRouter();
  const { userData } = useUserStore();

  const handleClick = () => {
    const path = `/dashboard/talent-pool/${talent.id}/details`;
    if (!userData?.token || userData?.user?.role === "job_seeker") {
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="hover:scale-[1.01] transition-all duration-200 cursor-pointer rounded-[28px] border border-black/60 shadow-[0_4px_0_0_rgba(0,0,0,0.7)] bg-white w-[340px] h-[280px] flex flex-col items-center p-7 relative"
      style={{ boxSizing: "border-box" }}
    >
      {/* Profile + Name/Title */}
      <div className="flex items-end justify-start w-full">
        <div className="relative w-[120px] h-[100px] mb-2 flex items-center justify-center">
          {/* Profile image with butterfly mask */}
          <div className="relative w-[120px] h-[120px]">
            {talent.image ? (
              <Image
                src={talent.image}
                alt={talent.name}
                width={120}
                height={120}
                className="absolute left-[-20px] top-[10px] w-full h-full object-cover"
                style={{
                  WebkitMaskImage: `url(${butterfly.src})`,
                  maskImage: `url(${butterfly.src})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            ) : (
              <div className="absolute left-0 top-0 w-full h-full rounded-full" />
            )}
            {/* Butterfly overlay */}
            <Image
              src={butterfly}
              alt="Butterfly overlay"
              width={120}
              height={120}
              className="opacity-60 absolute left-[-20px] top-[10px] w-full h-full pointer-events-none"
            />
          </div>
        </div>
        <div className="text-left mt-1 -ml-3">
          <div className="font-bold text-[20px] leading-tight text-black">
            {talent.name}
          </div>
          <div className="text-[17px] text-black/80 mt-0.5">{talent.title}</div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full border-t border-black/60 my-5" />
      {/* Description */}
      <div className="text-[17px] text-black text-left w-full leading-snug">
        {talent.description}
      </div>
    </div>
  );
};

// Skeleton card for loading
const TalentCardSkeleton = () => (
  <div className="rounded-[28px] border border-black/20 shadow bg-gray-100 w-[340px] h-[280px] flex flex-col items-center p-7 animate-pulse">
    <div className="flex gap-4 items-end justify-start w-full">
      <div className="relative w-[84px] h-[84px] mb-2">
        <div className="absolute left-0 top-0 w-full h-full bg-gray-300 rounded-full" />
      </div>
      <div className="text-left mt-1 flex-1">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="w-full border-t border-black/10 my-5" />
    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
  </div>
);

const TopTalents = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { userData } = useUserStore();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const handleViewTalentPool = () => {
    const path = "/dashboard/talent-pool";
    if (!userData?.token) {
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const { data: talents, isLoading } = useQuery({
    queryKey: ["get-talents", userData?.token],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getTalents(userData.token, {
        page: "0",
        text: "",
        search_type: "text",
      });
    },
    enabled: !!userData?.token,
  });

  const talentsList = talents || [];
  const talentsPerPage = 6;
  const totalPages = Math.ceil(talentsList.length / talentsPerPage);
  const pagedTalents = talentsList.slice(
    page * talentsPerPage,
    page * talentsPerPage + talentsPerPage
  );

  // Mobile Carousel Navigation
  const nextSlide = () => {
    if (currentSlide >= 5) return; // Disable after 6 items (0-5)
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) return;
    setCurrentSlide((prev) => prev - 1);
  };

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <motion.div
      ref={ref}
      animate="visible"
      variants={containerVariants}
      className={`${outfit.className} bg-white relative h-fit pt-12 md:pt-16 lg:pt-24 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12`}
    >
      {/* Navigation Arrows and Frame Number (Desktop) */}
      <motion.div
        variants={itemVariants}
        className="absolute top-4 md:top-8 right-4 md:right-8 lg:right-12 items-center space-x-4 z-10 hidden md:flex"
      >
        <button
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-black hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => {
            setDirection(-1);
            setPage((p) => Math.max(0, p - 1));
          }}
          disabled={page === 0 || isLoading}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 4l-4 4 4 4" />
          </svg>
        </button>
        <button
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-black hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => {
            setDirection(1);
            setPage((p) => Math.min(totalPages - 1, p + 1));
          }}
          disabled={isLoading || page >= totalPages - 1}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full flex justify-center md:justify-between items-center mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Top Talents
        </h2>
      </motion.div>

      {/* Mobile Carousel */}
      <motion.div
        variants={itemVariants}
        className="relative w-full md:hidden mt-4"
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {isLoading || !talents
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 flex justify-center px-2"
                  >
                    <TalentCardSkeleton />
                  </div>
                ))
              : pagedTalents.slice(0, 6).map((talent: any) => (
                  <div
                    key={talent.id}
                    className="w-full flex-shrink-0 flex justify-center px-2"
                  >
                    <TalentCard
                      talent={{
                        id: talent.id,
                        name: talent.name || "No Name",
                        title: talent.current_position || "No Title",
                        image: talent.profile_photo,
                        description:
                          talent.experience_summary ||
                          "No description available.",
                      }}
                    />
                  </div>
                ))}
          </div>
        </div>
        {/* Mobile Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentSlide === 0}
          aria-label="Previous Talent"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="md:w-6 md:h-6"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentSlide >= 5}
          aria-label="Next Talent"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="md:w-6 md:h-6"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      {/* Desktop Grid */}
      <motion.div
        variants={itemVariants}
        className="relative w-full max-w-6xl mx-auto min-h-[600px] hidden md:block"
      >
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              duration: 0.5,
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            style={{ position: "absolute", width: "100%" }}
          >
            {isLoading || !talents
              ? [...Array(6)].map((_, i) => <TalentCardSkeleton key={i} />)
              : pagedTalents.map((talent: any, idx: number) => (
                  <>
                    <TalentCard
                      key={talent.id}
                      talent={{
                        id: talent.id,
                        name: talent.name || "No Name",
                        title: talent.current_position || "No Title",
                        image: talent.profile_photo,
                        description:
                          talent.experience_summary ||
                          "No description available.",
                      }}
                    />
                  </>
                ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleViewTalentPool}
          className="mt-8 md:mt-12 text-white rounded-full px-6 py-4 md:py-6 w-full md:w-fit text-sm md:text-base font-semibold shadow-none hover:bg-[#184C2A]/90"
        >
          View Talent Pool
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TopTalents;
