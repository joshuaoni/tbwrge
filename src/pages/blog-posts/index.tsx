import BlogsPagination from "@/components/blogs-pagination";
import { Button } from "@/components/ui/button";
import { poppins } from "@/constants/app";
import { ChevronLeft, ChevronRight, User2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import { BlogItem } from "@/actions/blog";
import { FaUserCircle } from "react-icons/fa";

const BlogPosts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { userData } = useUserStore();

  const { data: blogs, isLoading } = useQuery<BlogItem[]>({
    queryKey: ["blogs", { approved: true }],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getBlogs(userData.token, { approved: true });
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
            {isLoading ? (
              <div className="w-full text-center">Loading...</div>
            ) : (
              blogs?.map((blog) => (
                <div key={blog.id} className="w-full h-full flex-shrink-0">
                  <BlogCard blog={blog} />
                </div>
              ))
            )}
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
        {isLoading ? (
          <div className="col-span-4 text-center">Loading...</div>
        ) : (
          blogs
            ?.slice(0, 4)
            .map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
      <div className="hidden sm:grid w-full grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {isLoading ? (
          <div className="col-span-4 text-center">Loading...</div>
        ) : (
          blogs
            ?.slice(4, 8)
            .map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
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

  const { data: blogs, isLoading } = useQuery<BlogItem[]>({
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

  return (
    <div
      className={`${poppins.className} pt-[90px] md:pt-[100px] bg-[#F8F9FF] h-fit p-6 md:p-16 pb-[100px] w-full flex items-center flex-col`}
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
            {isLoading ? (
              <div className="w-full text-center">Loading...</div>
            ) : (
              blogs?.map((blog) => (
                <div key={blog.id} className="w-full h-full flex-shrink-0">
                  <BlogCard blog={blog} />
                </div>
              ))
            )}
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
        {isLoading ? (
          <div className="col-span-4 text-center">Loading...</div>
        ) : (
          blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <BlogsPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

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

export default BlogPosts;
