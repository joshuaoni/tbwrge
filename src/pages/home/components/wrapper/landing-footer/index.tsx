import Image from "next/image";
import React from "react";
import candivetlogo from "../../../../../../public/images/candivet-logo.png";
import { outfit } from "@/constants/app";
import { Twitter, Linkedin, ShieldCheck } from "lucide-react";

const LandingFooter = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div className=" bg-black text-white h-fit flex flex-col items-center justify-center w-full p-4 md:p-16">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="w-full md:w-[70%]">
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-16 lg:gap-20">
              <div className="flex flex-col">
                <h1 className="font-bold">Product</h1>
                <div className="flex flex-col space-y-2 mt-3">
                  <span className="text-[#C0C1C6] text-sm">Job Tools</span>
                  <span className="text-[#C0C1C6] text-sm">CV Tools</span>
                  <span className="text-[#C0C1C6] text-sm">Cover Tools</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="font-bold">Support</h1>
                <div className="flex flex-col space-y-2 mt-3">
                  <span className="text-[#C0C1C6] text-sm">Send an email</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="font-bold">Company</h1>
                <div className="flex flex-col space-y-2 mt-3">
                  <span className="text-[#C0C1C6] text-sm">About Us</span>
                  <span className="text-[#C0C1C6] text-sm">Contact</span>
                  <span className="text-[#C0C1C6] text-sm">Community</span>
                  <span className="text-[#C0C1C6] text-sm">FAQs</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="font-bold">Resources</h1>
                <div className="flex flex-col space-y-2 mt-3">
                  <span className="text-[#C0C1C6] text-sm">Privacy Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 md:mt-0 md:w-[30%]">
          <div className="flex flex-col">
            <h1 className="font-bold">Connect with us</h1>
            <div className="flex flex-col space-y-2 mt-3">
              <span className="text-[#C0C1C6] text-sm">
                Your modern vetting superpowers
              </span>
              <div className="flex items-center space-x-4 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-white cursor-pointer transition-colors"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <Twitter className="w-5 h-5 text-white cursor-pointer transition-colors fill-current" />
                <Linkedin className="w-5 h-5 text-white cursor-pointer transition-colors fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center w-[100%] mt-12 justify-between">
        <div className="flex items-center cursor-pointer">
          {/* <div className="rounded-[6.96px] flex items-center justify-center bg-white w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative"> */}
          {/* <div
              className="rounded-[0.12px] w-[22.26px] h-[18.96px] md:w-[27.83px] md:h-[23.7px] absolute"
              style={{
                top: "5px",
                left: "6.91px",
              }}
            > */}
          <Image
            src="/footer-logo.png"
            alt=""
            width={30}
            height={26}
            className="w-[30px] h-[26px] md:w-[34px] md:h-[29.2px]"
          />
          {/* </div> */}
          {/* </div> */}
          <h1
            className={`${outfit.className} ml-2 text-xl md:text-3xl font-bold`}
          >
            Candivet
          </h1>
        </div>
        <h1 className="text-center md:text-left mb-4 md:mb-0 text-[16px]">
          © {currentYear} Candivet - Powered by MIXT Technologies. All rights
          reserved.
        </h1>
      </div>
    </div>
  );
};

export default LandingFooter;
