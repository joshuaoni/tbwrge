import { Button } from "@/components/ui/button";
import Image from "next/image";
import RocketIcon from "../../../../../public/images/rocket.png";
import ExpertiseMan from "../../../../../public/images/expertise-man.png";
import ManSuit from "../../../../public/images/man-suit.png";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { outfit, poppins } from "@/constants/app";
import { useUserStore } from "@/hooks/use-user-store";
import { useRouter } from "next/router";

const Expertise = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { userData } = useUserStore();

  const handleShareArticle = () => {
    const path = "/dashboard/submit-article";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  return (
    <div
      className={`${outfit.className} h-fit flex flex-col gap-4 py-[50px] md:py-0 md:h-[500px] relative bg-white items-center justify-center p-4 md:p-16 md:pb-[16px]`}
    >
      <h2 className="text-primary text-2xl md:text-[40px] font-bold text-center px-4">
        Share Your Expertise with the Community
      </h2>
      <p className="w-full md:w-[55%] text-center text-primary text-base md:text-[18px] px-4">
        Submit your blog post with your title, name, job title, company, and
        profile image. After a quick review, your post will be published with
        full recognition as an expert in the Webintel community.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-4">
        <Button
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleShareArticle}
          className="text-white text-sm px-6 py-4 md:px-[30px] md:py-[25px] rounded-full w-full md:w-auto"
        >
          Share Article
        </Button>
        <div className="text-primary text-sm flex items-center gap-2">
          Join the community
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="#014718"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
