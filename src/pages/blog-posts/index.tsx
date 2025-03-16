import BlogsPagination from "@/components/blogs-pagination";
import { Button } from "@/components/ui/button";
import { poppins } from "@/constants/app";
import { ChevronLeft, ChevronRight, User2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

const BlogPosts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <BlogCard />
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
      <div className="hidden sm:grid w-full grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <div className="hidden sm:grid w-full grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>

      <Button className="text-[12px] self-center mt-8 bg-[#009379] py-4 text-white">
        View All Blog Posts
      </Button>
    </div>
  );
};

export const BlogPostsWithPagination = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 8);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 8) % 8);
  };

  return (
    <div
      className={`${poppins.className} pt-[90px] md:pt-[20px] bg-[#F8F9FF] h-fit p-6 md:p-16 pb-[100px] w-full flex items-center flex-col`}
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
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <BlogCard />
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
      <div className="tatata hidden sm:grid w-full grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4].map((_, index) => (
          <BlogCard key={index} />
        ))}
      </div>
      <div className="hidden sm:grid w-full grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4].map((_, index) => (
          <BlogCard key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <BlogsPagination />
      </div>
    </div>
  );
};

export const BlogCard = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/blog/1")}
      className="flex cursor-pointer flex-col border rounded-[20px] shadow-[0px_20px_50px_0px_rgba(18,17,39,0.08)] w-full"
    >
      <div
        className="w-full h-[200px] bg-cover bg-center rounded-t-[20px]"
        style={{ backgroundImage: "url('/unsplash_Tyg0rVhOTrE.png')" }}
      >
        {/* Content goes here */}
      </div>

      <div className="p-4">
        <div className="my-2 w-[72px] text-center h-[25px] bg-[#E2D8FD] rounded-[20px]">
          <span>Article</span>
        </div>

        <h1 className="text-xl font-bold">
          Lobortis egestas odio pharetra enim ut
        </h1>
        <p className="text-sm text-[#2D2D2D] mt-2">
          Fermentum aliquam turpis ultricies semper maecenas habitant gravida
          dictumst. Tellus congue est morbi nulla integer. Elementum, lorem quis
          in consequat amet, venenatis.
        </p>
      </div>
      <div className="flex items-center space-x-2 p-4">
        <div
          className="w-[45px] h-[45px] bg-cover bg-center rounded-full"
          style={{ backgroundImage: "url('/unsplash_c_GmwfHBDzk.png')" }}
        />
        <div className="flex flex-col">
          <span className="text-sm underline decoration-[#b9b9b9] underline-offset-[5px]">
            Admin
          </span>
          <span className="text-[8px] mt-[2px] text-[#b9b9b9]">
            March 15th, 2021
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
