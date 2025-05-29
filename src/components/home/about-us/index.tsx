import React from "react";
import AboutUsDash from "../../../../public/images/about-us-dash.png";
import Image from "next/image";
import { poppins } from "@/constants/app";

const AboutUs = () => {
  return (
    <div
      className={`${poppins.className} bg-[#F5F5F5] py-6 flex flex-col justify-center items-center `}
    >
      <Image
        src={AboutUsDash}
        className="md:mt-8 w-[90%] max-w-[1200px]"
        alt=""
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default AboutUs;
