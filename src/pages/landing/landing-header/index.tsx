import React from "react";
import candivetlogo from "../../../../public/images/candivet-logo.png";
import Image from "next/image";

const LandingHeader = () => {
  return (
    <div className="w-full fixed top-0 border py-4">
      <div className="flex items-center ml-6 cursor-pointer">
        <Image src={candivetlogo} alt="" width={50} height={50} />
        <h1 className="text-3xl font-bold">Candivet</h1>
      </div>
    </div>
  );
};

export default LandingHeader;
