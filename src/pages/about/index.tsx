import React, { useRef } from "react";
import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import Community from "@/components/home/community";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import AboutUs from "../../../../public/images/about-us.png";
import Image from "next/image";
import { outfit, poppins } from "@/constants/app";
import Expertise from "@/components/home/expertise";
import { useIsMobile } from "@/hooks/use-mobile";
import Tools from "@/components/home/tools";
import { motion, useInView } from "framer-motion";

const index = () => {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <LandingWrapper>
      <main className={`${poppins.className} flex flex-col`}>
        <div className="relative min-h-[700px] h-screen w-full md:px-16 px-4 pt-[20px] bg-black">
          {/* Background image and overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.6,
              zIndex: 0,
            }}
          />
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative z-10 flex items-center h-full"
          >
            <motion.div
              variants={containerVariants}
              className="flex md:w-[50%] w-full flex-col items-start"
            >
              <motion.h1
                variants={itemVariants}
                className="mb-4 md:text-[60px] text-[30px] text-white font-extrabold"
              >
                About <span className="text-[#DEA042]">Us</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className={`${outfit.className} md:w-[90%] w-full leading-[26px] text-white text-sm font-light`}
              >
                At Candivet, we're transforming the way professionals connect
                with opportunities by merging technology with human-centered
                design to support every stage of the hiring journey. Built with
                AI-driven tools, Candivet provides a comprehensive platform for
                recruiters and job seekers to simplify the job search,
                application, and candidate vetting processes.
              </motion.p>
              <motion.div className="w-full md:w-fit" variants={itemVariants}>
                <Button className="md:w-fit w-full flex md:mt-8 mt-4 text-[12px] px-[40px] py-[25px] rounded-[20px] bg-[#009379] text-white items-center">
                  <p>Join Us</p> <ArrowRight />
                </Button>
              </motion.div>
            </motion.div>
            {!isMobile && (
              <motion.div
                variants={imageVariants}
                className="w-[50%] flex justify-end"
              >
                <Image src={AboutUs} alt="" width={500} height={500} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Tools />
    </LandingWrapper>
  );
};

export default index;
