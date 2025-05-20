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
    // <div className=" bg-black text-white h-fit flex flex-col items-center justify-center w-full p-4 md:p-16">
    //   <div className="flex flex-col md:flex-row w-full justify-between">
    //     <div className="w-full md:w-[70%]">
    //       <div className="flex flex-col space-y-8">
    //         <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-16 lg:gap-20">
    //           <div className="flex flex-col">
    //             <h1 className="font-bold">Product</h1>
    //             <div className="flex flex-col space-y-2 mt-3">
    //               <span className="text-[#C0C1C6] text-sm">Job Tools</span>
    //               <span className="text-[#C0C1C6] text-sm">CV Tools</span>
    //               <span className="text-[#C0C1C6] text-sm">Cover Tools</span>
    //             </div>
    //           </div>

    //           <div className="flex flex-col">
    //             <h1 className="font-bold">Support</h1>
    //             <div className="flex flex-col space-y-2 mt-3">
    //               <span className="text-[#C0C1C6] text-sm">Send an email</span>
    //             </div>
    //           </div>

    //           <div className="flex flex-col">
    //             <h1 className="font-bold">Company</h1>
    //             <div className="flex flex-col space-y-2 mt-3">
    //               <span className="text-[#C0C1C6] text-sm">About Us</span>
    //               <span className="text-[#C0C1C6] text-sm">Contact</span>
    //               <span className="text-[#C0C1C6] text-sm">Community</span>
    //               <span className="text-[#C0C1C6] text-sm">FAQs</span>
    //             </div>
    //           </div>

    //           <div className="flex flex-col">
    //             <h1 className="font-bold">Resources</h1>
    //             <div className="flex flex-col space-y-2 mt-3">
    //               <span className="text-[#C0C1C6] text-sm">Privacy Policy</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-full mt-8 md:mt-0 md:w-[30%]">
    //       <div className="flex flex-col">
    //         <h1 className="font-bold">Connect with us</h1>
    //         <div className="flex flex-col space-y-2 mt-3">
    //           <span className="text-[#C0C1C6] text-sm">
    //             Your modern vetting superpowers
    //           </span>
    //           <div className="flex items-center space-x-4 mt-2">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //               className="w-5 h-5 text-white cursor-pointer transition-colors"
    //             >
    //               <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    //               <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    //             </svg>
    //             <Twitter className="w-5 h-5 text-white cursor-pointer transition-colors fill-current" />
    //             <Linkedin className="w-5 h-5 text-white cursor-pointer transition-colors fill-current" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex flex-col-reverse md:flex-row items-center w-[100%] mt-12 justify-between md:border-t md:border-gray-200 pt-8">
    //     <div className="flex items-center cursor-pointer">
    //       {/* <div className="rounded-[6.96px] flex items-center justify-center bg-white w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative"> */}
    //       {/* <div
    //           className="rounded-[0.12px] w-[22.26px] h-[18.96px] md:w-[27.83px] md:h-[23.7px] absolute"
    //           style={{
    //             top: "5px",
    //             left: "6.91px",
    //           }}
    //         > */}
    //       <Image
    //         src="/footer-logo.png"
    //         alt=""
    //         width={30}
    //         height={26}
    //         className="w-[30px] h-[26px] md:w-[34px] md:h-[29.2px]"
    //       />
    //       {/* </div> */}
    //       {/* </div> */}
    //       <h1
    //         className={`${outfit.className} ml-2 text-xl md:text-3xl font-bold`}
    //       >
    //         Candivet
    //       </h1>
    //     </div>
    //     <h1 className="text-center md:text-left mb-4 md:mb-0 text-[16px]">
    //       © {currentYear} Candivet - Powered by MIXT Technologies. All rights
    //       reserved.
    //     </h1>
    //   </div>
    // </div>

    <div
      className="relative h-fit pt-24 md:pt-[74px] flex items-center justify-center p-4 py-12 md:py-0 md:p-12 md:pb-24 md:px-16 bg-black"
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
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4">
          <div className="flex cursor-pointer">
            <div className="flex items-center justify-center rounded-[6.96px] bg-[#065844] w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative">
              <Image
                src="/header-final.png"
                alt=""
                width={32}
                height={29.2}
                className="w-[32px] h-[29.2px] md:w-[32px] md:h-[29.2px]"
              />
            </div>
            <h1
              className={`${outfit.className} text-white ml-2 text-xl md:text-3xl font-bold`}
            >
              Candivet
            </h1>
          </div>
          <div className="text-white">
            <h2 className="font-bold text-[20px]">How it works</h2>
            <div className="font-light mt-3 space-y-2">
              <p>Recruiters</p>
              <p>Job Seekers</p>
              <p>All Candivet Tools</p>
            </div>
          </div>
          <div className="text-white">
            <h2 className="font-bold text-[20px]">Tools</h2>
            <div className="font-light mt-3 space-y-2">
              <p>Posted Jobs</p>
              <p>Job Board</p>
              <p>Candidate Talent Pool</p>
              <p>CV Tools</p>
              <p>Cover Letter Tools</p>
              <p>Job Tools</p>
            </div>
          </div>
          <div className="text-white">
            <h2 className="font-bold text-[20px]">Resources</h2>
            <div className="font-light mt-3 space-y-2">
              <p>About</p>
              <p>Pricing</p>
              <p>Blog</p>
              <p>Community</p>
              <p>Submit A Blog</p>
              <p>Login</p>
              <p>Sign Up</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-24">
          <div className="flex justify-between pb-4">
            <h1 className="text-sm text-white/80 text-center md:text-left mb-4 md:mb-0 text-[16px]">
              English
            </h1>
            <div className="flex items-center space-x-4">
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
          <div className="border-t pt-4 border-white flex justify-between">
            <h1 className="text-sm text-white/80 text-center md:text-left mb-4 md:mb-0 text-[16px]">
              © {currentYear} Candivet - Powered by MIXT Technologies. All
              rights reserved.
            </h1>
            <div className="text-sm text-white/80 flex items-center space-x-4">
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
