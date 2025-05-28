import Image from "next/image";
import React from "react";
import candivetlogo from "../../../../../../public/images/candivet-logo.png";
import { outfit } from "@/constants/app";
import { Twitter, Linkedin, ShieldCheck } from "lucide-react";
import {
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const LandingFooter = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div
      className="relative h-fit pt-12 md:pt-24 flex items-center justify-center p-4 md:p-12 md:pb-24 md:px-16 bg-black"
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
              Candivet
            </h1>
          </div>
          <div className="text-white mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-[20px]">How it works</h2>
            <div className="font-light mt-3 space-y-2 text-sm md:text-base">
              <p>Recruiters</p>
              <p>Job Seekers</p>
              <p>All Candivet Tools</p>
            </div>
          </div>
          <div className="text-white mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-[20px]">Tools</h2>
            <div className="font-light mt-3 space-y-2 text-sm md:text-base">
              <p>Posted Jobs</p>
              <p>Job Board</p>
              <p>Candidate Talent Pool</p>
              <p>CV Tools</p>
              <p>Cover Letter Tools</p>
              <p>Job Tools</p>
            </div>
          </div>
          <div className="text-white mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-[20px]">Resources</h2>
            <div className="font-light mt-3 space-y-2 text-sm md:text-base">
              <p>About</p>
              <p>Pricing</p>
              <p>Blog</p>
              <p>Community</p>
              <p>Submit A Blog</p>
              <p>Login</p>
              <p>Sign Up</p>
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
              <p>Disclaimer</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Cookie Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
