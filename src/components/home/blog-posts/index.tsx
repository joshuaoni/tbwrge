import BlogsPagination from "@/components/blogs-pagination";
import { Button } from "@/components/ui/button";
import { poppins } from "@/constants/app";
import { ChevronLeft, ChevronRight, User2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import { BlogItem } from "@/actions/blog";
import { FaUserCircle } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

// BlogCardSkeleton for loading state
const BlogCardSkeleton = () => (
  <div className="bg-white rounded-2xl w-72 flex flex-col items-start shadow-md h-[420px] overflow-hidden animate-pulse">
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

const BlogPosts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { userData } = useUserStore();

  const { data: blogs, isLoading } = useQuery<BlogItem[]>({
    queryKey: ["blogs", { approved: true }],
    queryFn: async () => {
      return await getBlogs({ approved: true });
    },
    enabled: !!userData?.token,
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 8);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 8) % 8);
  };

  return (
    <div
      className={`${poppins.className}  bg-[#F8F9FF] h-fit p-6 md:p-16 md:pt-0 md:pb-[150px] pb-[100px] w-full flex items-center flex-col`}
    >
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <p className="text-sm text-[#2D2D2D] mt-4">
          Read Up to Date Tips from Professionals
        </p>
      </div>

      {/* Mobile View with Slider */}
      <div className="relative w-full md:hidden mt-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {isLoading || !blogs || blogs.length === 0
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-full flex-shrink-0 flex justify-center"
                  >
                    <BlogCardSkeleton />
                  </div>
                ))
              : blogs?.map((blog) => (
                  <div key={blog.id} className="w-full h-full flex-shrink-0">
                    <BlogCard blog={blog} />
                  </div>
                ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop/Tablet Grid View */}
      <div className="hidden sm:flex w-full justify-center mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] w-full">
          {isLoading || !blogs || blogs.length === 0
            ? [...Array(4)].map((_, i) => <BlogCardSkeleton key={i} />)
            : blogs
                ?.slice(0, 4)
                .map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      </div>
      <div className="hidden sm:flex w-full justify-center mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] w-full">
          {isLoading || !blogs || blogs.length === 0
            ? [...Array(4)].map((_, i) => <BlogCardSkeleton key={i} />)
            : blogs
                ?.slice(4, 8)
                .map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      </div>

      <Button className="text-[12px] self-center mt-8 bg-[#009379] py-4 text-white">
        View All Blog Posts
      </Button>
    </div>
  );
};

export const BlogPostsWithPagination = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { userData } = useUserStore();
  const postsPerPage = 8;
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

  const { data: blogs, isLoading } = useQuery<BlogItem[]>({
    queryKey: ["blogs", { approved: true, page: currentPage }],
    queryFn: async () => {
      return await getBlogs({
        approved: true,
        page: currentPage,
      });
    },
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 8);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 8) % 8);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentSlide(0); // Reset slide when changing pages
  };

  // Check if there are more items to load
  const hasMore = blogs ? blogs.length === postsPerPage : false;
  console.log({ blogs });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`${poppins.className} pt-[90px] md:pt-[100px] bg-[#F8F9FF] h-fit p-6 md:p-16 pb-[100px] w-full flex items-center flex-col`}
    >
      <motion.div
        variants={itemVariants}
        custom={0}
        className="flex flex-col text-center"
      >
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <p className="text-sm text-[#2D2D2D] mt-4">
          Read Up to Date Tips from Professionals
        </p>
      </motion.div>

      {/* Mobile View with Slider */}
      <motion.div
        variants={itemVariants}
        custom={1}
        className="relative w-full md:hidden mt-8"
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
                    className="w-full h-full flex-shrink-0 flex justify-center"
                  >
                    <BlogCardSkeleton />
                  </div>
                ))
              : blogs?.map((blog) => (
                  <div key={blog.id} className="w-full h-full flex-shrink-0">
                    <BlogCard blog={blog} />
                  </div>
                ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Desktop/Tablet Grid View */}
      <motion.div
        variants={itemVariants}
        custom={2}
        className="hidden sm:flex w-full justify-center mt-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] w-full">
          {isLoading || !blogs || blogs.length === 0
            ? [...Array(4)].map((_, i) => <BlogCardSkeleton key={i} />)
            : blogs?.map((blog, idx) => (
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

      {/* Pagination */}
      <motion.div
        variants={itemVariants}
        custom={blogs ? blogs.length + 3 : 3}
        className="mt-8"
      >
        <BlogsPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasMore={hasMore}
        />
      </motion.div>
    </motion.div>
  );
};

export const BlogCard = ({ blog }: { blog: BlogItem }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${blog.id}`)}
      className="cursor-pointer bg-white rounded-2xl w-full max-w-80 flex flex-col shadow-md h-[444px]"
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
      <div className="flex-1 flex flex-col px-6 min-h-0">
        {/* Article Pill */}
        <div className="mb-2">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
            Article
          </span>
        </div>
        <div className="text-primary font-semibold text-xl leading-normal mb-2 line-clamp-2">
          {blog.title}
        </div>
        <div
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 h-[70px] overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: blog.content || "No content available",
          }}
        />
      </div>
      {/* Author Section */}
      <div className="flex items-center justify-start w-full gap-2 px-6 pt-3 pb-4 border-t border-gray-100">
        {blog.user?.profile_picture ? (
          <Image
            src={blog.user.profile_picture}
            alt={blog.user.name || "User"}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-400" />
        )}
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
      </div>
    </div>
  );
};

export default BlogPosts;
