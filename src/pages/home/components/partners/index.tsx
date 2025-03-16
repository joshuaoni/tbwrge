import React from "react";
import { motion } from "framer-motion";
import AirBnB from "../../../../../public/images/airbnb.png";
import Microsoft from "../../../../../public/images/microsoft.png";
import Google from "../../../../../public/images/google.png";
import Amazon from "../../../../../public/images/amazon.png";
import FedEx from "../../../../../public/images/fedex.png";
import hubspot from "../../../../../public/images/hubspot.png";
import Image from "next/image";

const Partners = () => {
  const partners = [
    { image: AirBnB, alt: "airbnb" },
    { image: Google, alt: "google" },
    { image: Amazon, alt: "amazon" },
    { image: Microsoft, alt: "microsoft" },
    { image: FedEx, alt: "fedex" },
    { image: hubspot, alt: "hubspot" },
  ];

  // Framer Motion Variants for scrolling animation
  const marqueeVariants = {
    animate: {
      x: [0, -1020], // Adjusted width based on new spacing
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden pt-16 pb-10 border-b bg-white">
      <div className="max-w-[1020px] mx-auto">
        {" "}
        {/* Adjusted container width */}
        <motion.div
          className="flex items-center"
          variants={marqueeVariants}
          animate="animate"
        >
          <div className="flex shrink-0">
            {partners.map((partner, index) => (
              <div
                className="flex flex-col items-center justify-center w-[170px]" // Fixed width including spacing
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
          <div className="flex shrink-0">
            {partners.map((partner, index) => (
              <div
                className="flex flex-col items-center justify-center w-[170px]" // Fixed width including spacing
                key={`duplicate-${index}`}
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
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
