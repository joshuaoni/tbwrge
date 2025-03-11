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
      x: ["10%", "-100%"], // Slide from start to end
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 70, // Adjust duration for scroll speed
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden pt-16 pb-10 border-b bg-white">
      <motion.div
        className="flex space-x-12" // Add space between images
        variants={marqueeVariants}
        animate="animate"
      >
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
        {/* Duplicate logos for seamless looping */}
        {partners.map((partner, index) => (
          <div
            className="flex flex-col items-center justify-center"
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
      </motion.div>
    </div>
  );
};
export default Partners;
