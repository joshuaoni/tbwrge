import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import Community from "../components/community";
import Image from "next/image";
import BlogsHeaderImage from "../../../../public/images/blogs_header_image.jpeg";
import BlogPosts from "@/pages/blog-posts";
const index = () => {
  return (
    <LandingWrapper>
      <section>
        <div className=" flex items-center relative justify-center  h-[400px] w-screen">
          <div className="bg-black opacity-70 w-full h-full absolute" />
          <Image
            src={BlogsHeaderImage}
            width={300}
            height={400}
            alt=""
            className="w-full h-full object-cover"
          />
          <h1 className="text-[60px] text-white font-extrabold absolute">
            Blog
          </h1>
        </div>
        <BlogPosts />
      </section>
      <Community />
    </LandingWrapper>
  );
};

export default index;
