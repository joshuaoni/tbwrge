import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import Community from "../components/community";
import Image from "next/image";
import BlogsHeaderImage from "../../../../public/images/blogs_header_image.jpeg";
import { BlogPostsWithPagination } from "@/pages/blog-posts";
import Expertise from "../components/expertise";

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
