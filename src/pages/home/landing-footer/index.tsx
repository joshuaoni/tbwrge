import Image from "next/image";
import React from "react";
import candivetlogo from "../../../../public/images/candivet-logo.png";

const LandingFooter = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div className=" bg-black text-white h-fit flex flex-col items-center justify-center w-screen p-4 md:p-20">
      <div className="flex flex-col  md:flex-row items-start border-b border-b-white md:w-[80%] pb-12">
        <div className="w-full md:w-[70%]">
          <div className=" md:flex md:items-start md:space-x-8">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <h1 className="font-bold ">Product</h1>
                  <div className="flex flex-col space-y-2 mt-3">
                    <span className="text-[#C0C1C6] text-sm">Job Tools</span>
                    <span className="text-[#C0C1C6] text-sm">CV Tools</span>
                    <span className="text-[#C0C1C6] text-sm">Cover Tools</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold ">Support</h1>
                  <span className="text-[#C0C1C6] text-sm">Send an email</span>
                </div>
              </div>
              <div className=" flex justify-between w-full space-x-4 mt-4 md:mt-0">
                <div className="flex flex-col">
                  <h1 className="font-bold ">Company</h1>
                  <span className="text-[#C0C1C6] text-sm">About Us</span>
                  <span className="text-[#C0C1C6] text-sm">Contact</span>
                  <span className="text-[#C0C1C6] text-sm">Community</span>
                  <span className="text-[#C0C1C6] text-sm">FAQs</span>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold ">Terms of service</h1>
                  <span className="text-[#C0C1C6] text-sm">Privacy Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-3 md:mt-0 md:w-[30%]">
          <div className="flex flex-col">
            <h1 className="font-bold">connect with us</h1>
            <h1 className="font-bold text-[#C0C1C6]">
              Your modern vetting superpowers
            </h1>
          </div>
        </div>
      </div>

      <div className="flex  items-center w-[80%] mt-6 justify-between">
        <Image
          src={candivetlogo}
          alt=""
          width={50}
          height={50}
          style={{
            color: "white",
          }}
        />
        <h1 className="font-bold">
          © {currentYear} Candivet, Inc. All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default LandingFooter;
