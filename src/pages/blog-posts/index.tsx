import { Button } from "@/components/ui/button";
import { User2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const BlogPosts = () => {
  return (
    <div className="h-fit p-12 w-full flex flex-col ">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <p className="text-sm text-[#2D2D2D] mt-2">
        Read Up to Date Tips from Professionals
      </p>
      <div className="w-full flex flex-wrap gap-x-6 gap-y-6 mt-8  items-center justify-center">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>

      <Button className="  self-center mt-8 bg-primary text-white">
        View All Blog Posts
      </Button>
    </div>
  );
};
const BlogCard = () => {
  return (
    <div className="flex flex-col border  rounded-2xl w-[270px]">
      <Image
        src={""}
        alt=""
        width={300}
        height={200}
        className="rounded-t-2xl"
      />
      <div className="p-4">
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
        <UserCircle2 size={30} />
        <div className="flex flex-col">
          <span className="text-sm">Admin</span>
          <span className="text-xs text-[#464646]">12th March 2021</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
