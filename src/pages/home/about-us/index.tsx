import React from "react";
import AboutUsDash from "../../../../public/images/about-us-dash.png";
import Image from "next/image";
const AboutUs = () => {
  return (
    <div className=" bg-[#F5F5F5]  flex flex-col items-center ">
      <h1 className="text-[25px] font-extrabold p-4">About Us</h1>
      <p className="text-sm text-[#2D2D2D]">
        These are the few features you will get using candivet
      </p>
      <Image src={AboutUsDash} alt="" width={1000} height={1000} />
    </div>
  );
};

export default AboutUs;
