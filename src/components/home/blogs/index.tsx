import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, BlogItem } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import { useState, useRef } from "react";
import { outfit } from "@/constants/app";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useInView } from "framer-motion";

const BLOGS_PER_PAGE = 8;

// BlogCardSkeleton for loading state
const BlogCardSkeleton = () => (
  <div className="bg-white rounded-2xl w-72 flex flex-col items-start shadow-md h-[350px] overflow-hidden animate-pulse">
    <div className="mb-6 w-full h-40 bg-gray-200" />
    <div className="px-6 w-full flex-1 flex flex-col justify-between">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 mt-2" />
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
    </div>
    <div className="flex items-center gap-2 px-2 py-3 border-t border-gray-100 bg-white mt-auto w-full">
      <div className="w-10 h-10 rounded-full bg-gray-200" />
      <div className="flex flex-col flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  </div>
);

const BlogCard = ({ blog }: { blog: BlogItem }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${blog.id}`)}
      className="cursor-pointer bg-white rounded-2xl w-72 flex flex-col items-start shadow-md h-[350px] overflow-hidden pb-4"
    >
      <div className="mb-6 w-full h-40 overflow-hidden rounded-t-2xl">
        <Image
          src={blog.image || "/unsplash_Tyg0rVhOTrE.png"}
          alt={blog.title}
          width={825}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-primary px-6 font-semibold text-xl leading-snug mb-4 line-clamp-3 h-[84px]">
        {blog.title}
      </div>
      <div className="flex-grow"></div>
      {/* Author Section */}
      <div className="flex items-center justify-end w-full gap-4 px-2 pt-3 border-t border-gray-100 bg-white">
        <div>
          <p className="toppy font-semibold text-gray-900 text-[15px] leading-none m-0">
            {blog.user?.name || "Anonymous"}
          </p>
          <p className="downy capitalize text-[8px] text-gray-500 mt-0 pb-[2px]">
            {blog.user?.job_title || "Employee"}
            {", "}
            <span className="uppercase">
              {blog.user?.company_name || "Anonymous"}
            </span>
          </p>
          <p className="text-xs pt-[2px] border-t border-primary text-gray-500">
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {blog.user?.profile_photo ? (
          <Image
            src={blog.user.profile_photo}
            alt={blog.user.name || "User"}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-400" />
        )}
      </div>
    </div>
  );
};

const Blogs = () => {
  const { userData } = useUserStore();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: custom * 0.1, // 0.1s delay between each card
      },
    }),
  };

  // Function to calculate the animation order for grid layout
  const getAnimationOrder = (index: number, totalItems: number) => {
    const itemsPerRow = 4; // Number of items per row in the grid
    const row = Math.floor(index / itemsPerRow);
    const col = index % itemsPerRow;

    // For even rows (0, 2, etc.), go left to right
    // For odd rows (1, 3, etc.), go right to left
    if (row % 2 === 0) {
      return row * itemsPerRow + col;
    } else {
      return row * itemsPerRow + (itemsPerRow - 1 - col);
    }
  };

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", { approved: true, page: currentPage }],
    queryFn: async () => {
      return await getBlogs({
        approved: true,
        page: currentPage,
      });
    },
  });

  // Animation classes
  const getSlideClass = () => {
    if (direction === "right") return "animate-slide-left";
    if (direction === "left") return "animate-slide-right";
    return "";
  };

  // Desktop/Tablet Pagination
  const handleNext = () => {
    setDirection("right");
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage === 0) return;
    setDirection("left");
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  // Mobile Carousel
  const nextSlide = () => {
    if (!blogs) return;
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
  };
  const prevSlide = () => {
    if (!blogs) return;
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <motion.div
      ref={ref}
      animate="visible"
      variants={containerVariants}
      className={`${outfit.className} relative h-fit pt-12 md:pt-16 lg:pt-24 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black`}
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
      <div className="w-full max-w-7xl relative z-10">
        {/* Navigation Arrows and Frame Number (Desktop/Tablet) */}
        <motion.div
          variants={itemVariants}
          className="absolute top-4 md:top-8 right-4 md:right-8 lg:right-12 items-center space-x-4 z-10 hidden md:flex"
        >
          <button
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            {/* Left Arrow SVG */}
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
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
            onClick={handleNext}
            disabled={blogs && blogs.length < BLOGS_PER_PAGE}
          >
            {/* Right Arrow SVG */}
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

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center">
          <motion.h2
            variants={itemVariants}
            custom={0}
            className="w-full text-2xl md:text-3xl md:text-left text-center capitalize font-bold text-white mb-6 md:mb-8"
          >
            Blogs
          </motion.h2>
          {/* Mobile Carousel */}
          <motion.div
            variants={itemVariants}
            custom={1}
            className="relative w-full md:hidden mt-4 md:mt-8"
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {isLoading || !blogs || blogs.length === 0
                  ? [...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-full flex-shrink-0 flex justify-center px-2 md:px-4"
                      >
                        <BlogCardSkeleton />
                      </div>
                    ))
                  : blogs.map((blog: BlogItem) => (
                      <div
                        key={blog.id}
                        className="w-full h-full flex-shrink-0 flex justify-center px-2 md:px-4"
                      >
                        <BlogCard blog={blog} />
                      </div>
                    ))}
              </div>
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300"
              style={{ display: blogs && blogs.length > 1 ? "block" : "none" }}
              aria-label="Previous Blog"
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
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300"
              style={{ display: blogs && blogs.length > 1 ? "block" : "none" }}
              aria-label="Next Blog"
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
          {/* Desktop/Tablet Grid with Pagination */}
          <motion.div
            variants={itemVariants}
            custom={2}
            className="w-full overflow-hidden hidden md:block md:mt-4"
          >
            <div className="w-full flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center items-center">
              {isLoading || !blogs || blogs.length === 0
                ? [...Array(4)].map((_, i) => <BlogCardSkeleton key={i} />)
                : blogs.map((blog: BlogItem, idx: number) => (
                    <motion.div
                      key={blog.id}
                      custom={getAnimationOrder(idx, blogs.length)}
                      variants={itemVariants}
                    >
                      <BlogCard blog={blog} />
                    </motion.div>
                  ))}
            </div>
          </motion.div>

          {/* View All Blogs Button */}
          <motion.div
            variants={itemVariants}
            custom={blogs ? blogs.length + 3 : 3}
            className="mt-8 md:mt-12 lg:mt-16"
          >
            <button
              onClick={() => router.push("/blog")}
              className="text-sm px-6 md:px-8 lg:px-[30px] py-3 md:py-4 lg:py-[16px] rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition"
            >
              View All Blogs
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Tailwind CSS animations (add to your global CSS or tailwind.config.js)
// .animate-slide-left { transform: translateX(-100%); opacity: 0; }
// .animate-slide-right { transform: translateX(100%); opacity: 0; }

export default Blogs;
