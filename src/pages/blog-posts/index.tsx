import BlogsPagination from "@/components/blogs-pagination";
import { Button } from "@/components/ui/button";
import { poppins } from "@/constants/app";
import { User2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const BlogPosts = () => {
  return (
    <div
      className={`${poppins.className} bg-[#F8F9FF] h-fit p-12 md:p-16 md:pb-[100px] w-full flex flex-col`}
    >
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <p className="text-sm text-[#2D2D2D] mt-4">
          Read Up to Date Tips from Professionals
        </p>
      </div>
      <div className="w-full flex flex-wrap gap-x-6 gap-y-6 mt-8  items-center justify-between">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      {/* <BlogsPagination /> */}

      <Button className="text-[12px]  self-center mt-8 bg-[#009379] py-4 text-white">
        View All Blog Posts
      </Button>
    </div>
  );
};
const BlogCard = () => {
  return (
    <div className="flex flex-col border rounded-[20px] shadow-[0px_20px_50px_0px_rgba(18,17,39,0.08)] w-[330px]">
      <div
        className="w-[330px] h-[200px] bg-cover bg-center rounded-t-[20px]"
        style={{ backgroundImage: "url('/unsplash_Tyg0rVhOTrE.png')" }}
      >
        {/* Content goes here */}
      </div>

      <div className="p-4">
        <div className="my-4 w-[72px] text-center h-[25px] bg-[#E2D8FD] rounded-[20px]">
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
