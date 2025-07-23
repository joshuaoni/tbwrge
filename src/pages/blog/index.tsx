import React from "react";
import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import Community from "@/components/home/community";
import Image from "next/image";
import BlogsHeaderImage from "../../../../public/images/blogs_header_image.jpeg";
import { BlogPostsWithPagination } from "@/components/home/blog-posts";
import Expertise from "@/components/home/expertise";
import SEO from "@/components/seo";

const index = () => {
  return (
    <>
      <SEO
        title="Blog - Candivet"
        description="Discover insights, tips, and industry trends in our blog. Stay updated with the latest in hiring, recruitment, and career development."
        canonical="https://candivet.com/blog"
        ogType="website"
      />
      <LandingWrapper>
        <section>
          <BlogPostsWithPagination />
        </section>
        <Expertise />
      </LandingWrapper>
    </>
  );
};

export default index;
