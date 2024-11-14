import React from "react";
import CommunityImage from "../../../../public/images/community-image.jpeg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Community = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center min-h-[400px]"
    >
      {/* Image Layer */}
      <Image
        src={CommunityImage}
        alt=""
        width={400}
        height={800}
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text Content Layer */}
      <div className="relative text-white text-center flex flex-col items-center z-10 space-y-4 px-4">
        <h1 className="font-bold text-3xl">Join Our Community</h1>
        <p className="max-w-xl">
          A space where job seekers and recruiters come together to share
          insights, support each other, and grow professionally.
        </p>
        <Button className="text-white bg-primary w-40">Join Now</Button>
      </div>
    </div>
  );
};

export default Community;
