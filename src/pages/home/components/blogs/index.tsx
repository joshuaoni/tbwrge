import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, BlogItem } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import { useState } from "react";
import { outfit } from "@/constants/app";
import { useRouter } from "next/router";

const BLOGS_PER_PAGE = 8;

const BlogCard = ({ blog }: { blog: BlogItem }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${blog.id}`)}
      className="cursor-pointer bg-white rounded-2xl w-72 flex flex-col items-start shadow-md h-[350px] overflow-hidden"
    >
      <div className="flex flex-col flex-grow w-full">
        <div className="mb-6 w-full h-40 overflow-hidden rounded-t-2xl">
          <Image
            src={blog.image || "/unsplash_Tyg0rVhOTrE.png"}
            alt={blog.title}
            width={825}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-primary px-6 font-semibold text-xl leading-snug mb-4 line-clamp-3">
          {blog.title}
        </div>
      </div>
      {/* Author Section */}
      <div className="flex items-center justify-end w-full gap-2 px-2 py-3 border-t border-gray-100 bg-white mt-auto">
        <div>
          <p className="pb-[2px] font-semibold text-gray-900 text-[15px] leading-tight">
            {blog.user?.name || "Anonymous"}
          </p>
          <p className="text-xs pt-[2px] border-t border-primary text-gray-500">
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {blog.user?.photo ? (
          <Image
            src={blog.user.photo}
            alt={blog.user.name || "User"}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
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

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", { approved: true, page: currentPage }],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getBlogs(userData.token, {
        approved: true,
        page: currentPage,
      });
    },
    enabled: !!userData?.token,
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
    <div
      className={`${outfit.className} relative h-fit pt-24 md:pt-[74px] flex items-center justify-center p-4 py-12 md:py-0 md:p-12 md:px-16 bg-black`}
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
      <div className="w-full relative z-10">
        {/* Navigation Arrows and Frame Number (Desktop/Tablet) */}
        <div className="absolute top-8 right-12 items-center space-x-4 z-10 hidden md:flex">
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
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="w-full text-2xl md:text-3xl capitalize font-bold text-white mb-8">
            Blogs
          </h2>
          {/* Mobile Carousel */}
          <div className="relative w-full md:hidden mt-8">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {isLoading ? (
                  <div className="w-full text-center text-white">
                    Loading...
                  </div>
                ) : (
                  blogs?.map((blog: BlogItem) => (
                    <div
                      key={blog.id}
                      className="w-full h-full flex-shrink-0 flex justify-center"
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 border border-gray-300"
              style={{ display: blogs && blogs.length > 1 ? "block" : "none" }}
              aria-label="Previous Blog"
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
              style={{ display: blogs && blogs.length > 1 ? "block" : "none" }}
              aria-label="Next Blog"
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
          {/* Desktop/Tablet Grid with Pagination */}
          <div className="w-full overflow-hidden hidden md:block">
            <div
              className={`flex flex-row flex-wrap gap-6 mt-16 justify-center md:justify-between transition-all duration-500 ${getSlideClass()}`}
            >
              {isLoading ? (
                <div className="text-white text-lg">Loading...</div>
              ) : (
                blogs?.map((blog: BlogItem) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              )}
            </div>
          </div>

          {/* View All Blogs Button */}
          <div className="my-12">
            <button
              onClick={() => router.push("/home/blog")}
              className="text-sm px-[30px] py-[16px] rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition"
            >
              View All Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tailwind CSS animations (add to your global CSS or tailwind.config.js)
// .animate-slide-left { transform: translateX(-100%); opacity: 0; }
// .animate-slide-right { transform: translateX(100%); opacity: 0; }

export default Blogs;
