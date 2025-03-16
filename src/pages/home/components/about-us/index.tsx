import React from "react";
import AboutUsDash from "../../../../../public/images/about-us-dash.png";
import Image from "next/image";
import { poppins } from "@/constants/app";

const AboutUs = () => {
  return (
    <div
      className={`${poppins.className} bg-[#F5F5F5] py-6 flex flex-col items-center `}
    >
      <div className="flex flex-col items-center w-[90%] text-center md:w-[50%]">
        <h1 className="text-[25px] font-extrabold p-4">About Us</h1>
        <p className="text-sm text-[#2D2D2D]">
          We’re transforming the way professionals connect with opportunities by
          merging technology with human-centered design
        </p>
      </div>
      <Image
        src={AboutUsDash}
        className="mt-8 w-[80%] md:w-[1000px]"
        alt=""
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default AboutUs;
