import Image from "next/image";
import React from "react";
import candivetlogo from "../../../../../../public/images/candivet-logo.png";
import { outfit } from "@/constants/app";

const LandingFooter = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div className=" bg-black text-white h-fit flex flex-col items-center justify-center w-full p-4 md:p-16">
      <div className="flex flex-col  md:flex-row items-start border-b border-b-white/30 md:w-[100%] pb-12">
        <div className="w-full md:w-[70%]">
          <div className=" md:flex md:items-start md:space-x-8">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="flex justify-between w-full md:space-x-[50px]">
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
                    <span className="text-[#C0C1C6] text-sm">
                      Send an email
                    </span>
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
                    <span className="text-[#C0C1C6] text-sm">
                      Privacy Policy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-3 md:mt-0 md:w-[30%]">
          <div className="flex flex-col">
            <h1 className="font-bold">Connect with us</h1>
            <div className="flex flex-col space-y-2 mt-3">
              <span className="text-[#C0C1C6] text-sm">
                Your modern vetting superpowers
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  items-center w-[100%] mt-12 justify-between">
        <div className="flex items-center">
          <Image
            src="/whitw-logo.png"
            alt=""
            width={50}
            height={50}
            style={{
              color: "white",
            }}
          />
          <h1 className={`${outfit.className} ml-2 text-3xl font-bold`}>
            Candivet
          </h1>
        </div>
        <h1 className="font-bold text-[16px]">
          © {currentYear} Candivet - Powered by MIXT Technologies. All rights
          reserved.
        </h1>
      </div>
    </div>
  );
};

export default LandingFooter;
