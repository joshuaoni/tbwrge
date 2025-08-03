import Image from "next/image";
import React from "react";
import candivetlogo from "../../../../../../public/images/candivet-logo.png";
import { outfit } from "@/constants/app";
import { Twitter, Linkedin, ShieldCheck, Link } from "lucide-react";
import {
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { useUserStore } from "@/hooks/use-user-store";

const LandingFooter = () => {
  const { userData } = useUserStore();
  const router = useRouter();
  let currentYear = new Date().getFullYear();

  const handlePostedJobsClick = () => {
    const path = "/dashboard/job-postings";
    if (!userData?.token || userData?.user?.role !== "recruiter") {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleJobBoardClick = () => {
    const path = "/dashboard/job-board";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleTalentPoolClick = () => {
    const path = "/dashboard/talent-pool";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleCVToolsClick = () => {
    const path = "/dashboard/cv-tools/summarizer";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleCoverLetterToolsClick = () => {
    const path = "/dashboard/cover-letter-tools/summarizer";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleJobToolsClick = () => {
    const path = "/dashboard/job-tools/generator";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleSubmitABlogClick = () => {
    const path = "/dashboard/submit-article";
    if (!userData?.token) {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleRecruitersClick = () => {
    const path = "/dashboard";
    if (!userData?.token || userData?.user?.role !== "recruiter") {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const handleJobSeekersClick = () => {
    const path = "/dashboard";
    if (!userData?.token || userData?.user?.role !== "job_seeker") {
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  return (
    <div
      className="relative h-fit pt-12 md:pt-24 flex items-center justify-center p-4 md:p-12 md:pb-24 md:px-16 bg-black max-w-[1920px] mx-auto w-full"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div className="w-full relative z-10 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4">
          <div className="flex items-center gap-2 md:items-start cursor-pointer mb-6 md:mb-0">
            <div className="flex items-center justify-center rounded-[6.96px] bg-[#00000000] w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative">
              <Image
                src="/footer-logo.png"
                alt=""
                width={32}
                height={29.2}
                className="w-[32px] h-[29.2px] md:w-[32px] md:h-[29.2px]"
              />
            </div>
            <h1
              className={`${outfit.className} text-white text-3xl font-bold text-center md:text-left`}
            >
              <a href="/" className="cursor-pointer">
                Candivet
              </a>
            </h1>
          </div>
          <div className="text-white mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-[20px]">How it works</h2>
            <div className="font-light mt-3 space-y-2 text-sm md:text-base">
              <p
                onClick={handleRecruitersClick}
                className="cursor-pointer hover:underline"
              >
                Recruiters
              </p>
              <p
                onClick={handleJobSeekersClick}
                className="cursor-pointer hover:underline"
              >
                Job Seekers
              </p>
              <p>
                <a href="/dashboard" className="cursor-pointer hover:underline">
                  All Candivet Tools
                </a>
              </p>
            </div>
          </div>
          <div className="text-white mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-[20px]">Tools</h2>
            <div className="font-light mt-3 space-y-2 text-sm md:text-base">
              <p
                className="cursor-pointer hover:underline"
                onClick={handlePostedJobsClick}
              >
                Posted Jobs
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={handleJobBoardClick}
              >
                Job Board
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={handleTalentPoolClick}
              >
                Candidate Talent Pool
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={handleCVToolsClick}
              >
                CV Tools
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={handleCoverLetterToolsClick}
              >
                Cover Letter Tools
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={handleJobToolsClick}
              >
                Job Tools
              </p>
            </div>
          </div>
          <div className="text-white mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-[20px]">Resources</h2>
            <div className="font-light mt-3 space-y-2 text-sm md:text-base">
              <p>
                <a href="/about" className="cursor-pointer hover:underline">
                  About
                </a>
              </p>
              <p>
                <a href="/pricing" className="cursor-pointer hover:underline">
                  Pricing
                </a>
              </p>
              <p>
                <a href="/blog" className="cursor-pointer hover:underline">
                  Blog
                </a>
              </p>
              <p>
                <a
                  href="/dashboard/community"
                  className="cursor-pointer hover:underline"
                >
                  Community
                </a>
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={handleSubmitABlogClick}
              >
                Submit A Blog
              </p>
              <p>
                <a href="/sign-in" className="cursor-pointer hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
          <div className="hidden lg:block"></div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4 gap-4 md:gap-0">
            <h1 className="text-xs md:text-sm text-white/80 text-center md:text-left mb-2 md:mb-0">
              English
            </h1>
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-4 gap-y-2">
              {/* Social Icons */}
              <a
                href="mailto:info@candivet.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope className="w-6 h-6 text-white hover:text-[#065844] transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 text-white hover:text-[#065844] transition-colors" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-6 h-6 text-white hover:text-[#065844] transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-6 h-6 text-white hover:text-[#065844] transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-6 h-6 text-white hover:text-[#065844] transition-colors" />
              </a>
            </div>
          </div>
          <div className="border-t pt-4 border-white flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
            <h1 className="text-xs md:text-sm text-white/80 text-center md:text-left">
              © {currentYear} Candivet - Powered by MIXT Technologies. All
              rights reserved.
            </h1>
            <div className="text-xs md:text-sm text-white/80 flex flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-2 mt-2 md:mt-0">
              <p>
                <a
                  href="/disclaimer"
                  className="cursor-pointer hover:underline"
                >
                  Disclaimer
                </a>
              </p>
              <p>
                <a
                  href="/privacy-policy"
                  className="cursor-pointer hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
              <p>
                <a
                  href="/terms-of-service"
                  className="cursor-pointer hover:underline"
                >
                  Terms of Service
                </a>
              </p>
              <p>
                <a
                  href="/cookie-policy"
                  className="cursor-pointer hover:underline"
                >
                  Cookie Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
