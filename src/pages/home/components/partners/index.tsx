import React from "react";
import AirBnB from "../../../../../public/images/airbnb.png";
import Microsoft from "../../../../../public/images/microsoft.png";
import Google from "../../../../../public/images/google.png";
import Amazon from "../../../../../public/images/amazon.png";
import FedEx from "../../../../../public/images/fedex.png";
import hubspot from "../../../../../public/images/hubspot.png";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

const Partners = () => {
  const isMobile = useIsMobile();
  const partners = [
    { image: AirBnB, alt: "airbnb" },
    { image: Google, alt: "google" },
    { image: Amazon, alt: "amazon" },
    { image: Microsoft, alt: "microsoft" },
    { image: FedEx, alt: "fedex" },
    { image: hubspot, alt: "hubspot" },
  ];

  if (isMobile) {
    return (
      <div className="overflow-hidden pt-16 pb-16 border-b bg-white">
        <div className="px-4">
          <div className="grid grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                className="flex flex-col items-center justify-center"
                key={index}
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={70}
                  height={70}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden pt-16 pb-10 border-b bg-white">
      <div className="relative w-full">
        <div className="w-[200%] inline-flex items-center">
          <div className="w-1/2 flex justify-around items-center animate-scroll">
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center"
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={70}
                  height={70}
                  className="min-w-[70px]"
                />
              </div>
            ))}
          </div>
          <div className="w-1/2 flex justify-around items-center animate-scroll">
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center"
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={70}
                  height={70}
                  className="min-w-[70px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
