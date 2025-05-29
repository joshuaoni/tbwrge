import React from "react";
import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import Community from "@/components/home/community";
import Image from "next/image";
import BlogsHeaderImage from "../../../../public/images/blogs_header_image.jpeg";
import { BlogPostsWithPagination } from "@/components/home/blog-posts";
import Expertise from "@/components/home/expertise";

const index = () => {
  return (
    <LandingWrapper>
      <section>
        <BlogPostsWithPagination />
      </section>
      <Expertise />
    </LandingWrapper>
  );
};

export default index;
