import React, { useState, useRef } from "react";
import JobTools from "../../../../public/images/icons/job-tools.png";
import CVTools from "../../../../public/images/icons/cv-tools.png";
import CoverLetterTools from "../../../../public/images/icons/cover-letter-tools.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { outfit, poppins } from "@/constants/app";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";

const PricingPlans = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % plans.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const plans = [
    {
      plan: "Free",
      price: "0",
      title: "",
      description: "Individuals testing the platform",
      features: [
        "Try Before You Buy",
        "Basic Tools Access",
        "Basic Jobs Board Access",
      ],
    },
    {
      plan: "Basic",
      price: "9.99",
      title: "- For Job Seekers",
      description: "Individuals testing the platform",
      features: [
        "Craft Winning Applications",
        "Boost Your Job Search",
        "Prepare for Interviews",
      ],
    },
    {
      plan: "Pro",
      price: "99",
      title: "- For Recruiters",
      description: "Small & growing businesses",
      features: [
        "1,000 Candidates / month €0.10 per extra candidate ",
        "AI-Powered Automation",
        "Advanced Job Board",
      ],
    },
    {
      plan: "Enterprise",
      price: "500+",
      title: "",
      description: "High-volume hiring companies",
      features: [
        "Unlimited Hiring Power",
        "Custom AI & Integrations",
        "Dedicated Support",
      ],
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`${outfit.className} bg-gradient-to-b from-white to-[#F8F9FF] md:px-16 flex flex-col space-y-4 items-center`}
    >
      <div className="px-6 md:px-0 flex flex-col w-full my-12 pb-8 space-y-0 mb-0 md:mb-12 items-center">
        <motion.div variants={itemVariants}>
          <h1 className="text-[35px] text-primary text-center font-extrabold p-4">
            Our Pricing Plans
          </h1>
          <p className="text-[20px] font-bold text-primary capitalize text-center pb-12 md:px-24">
            Choose the Perfect Pricing for your hiring and career goals
          </p>
        </motion.div>

        {/* Mobile View with Slider */}
        <motion.div
          variants={itemVariants}
          className="relative block md:hidden w-full mt-8"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {plans.map((plan, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`flex flex-col ${
                      plan.plan === "Enterprise"
                        ? "bg-primary text-white"
                        : "bg-white text-black"
                    } h-[420px] w-full border border-[#F8F9FF] rounded-[20px] shadow-[34.85px_29.63px_48.34px_0px_#3366FF0D] p-[40px_30px]`}
                  >
                    <div className="space-y-2">
                      <span className="font-semibold">{plan.plan}</span>{" "}
                      <span className="font-light">{plan.title}</span>
                      <div>
                        <span className="text-[50px] font-extrabold">
                          €{plan.price}
                          {plan.plan === "Enterprise" ? null : (
                            <span className="text-sm font-semibold">
                              /month
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="text-[12px] font-light block">
                        {plan.description}
                      </span>
                    </div>

                    <div className="flex-grow mt-2">
                      <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-0">
                          {plan.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex gap-4 items-start min-h-[40px]"
                            >
                              <Check className="w-5 h-5 text-[#009379] flex-shrink-0" />
                              <div className="leading-tight text-[12px] font-semibold">
                                {feature}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button className="bg-[#E5F4F2] text-[12px] py-6 w-full text-[#009379] rounded-2xl font-bold">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Desktop/Tablet Grid View */}
        <motion.div
          variants={itemVariants}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 md:px-0"
        >
          {plans.map((plan, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${
                plan.plan === "Enterprise"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              } h-[400px] w-full border border-[#F8F9FF] rounded-[20px] shadow-[34.85px_29.63px_48.34px_0px_#3366FF0D] p-[40px_30px]`}
            >
              <div className="space-y-2">
                <span className="font-semibold">{plan.plan}</span>{" "}
                <span className="font-light">{plan.title}</span>
                <div>
                  <span className="text-[50px] font-extrabold">
                    €{plan.price}
                    {plan.plan === "Enterprise" ? null : (
                      <span className="text-sm font-semibold">/month</span>
                    )}
                  </span>
                </div>
                <span className="text-[12px] font-light block">
                  {plan.description}
                </span>
              </div>

              <div className="flex-grow mt-2">
                <div className="grid grid-cols-1">
                  <div className="flex flex-col gap-0">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex gap-4 items-start min-h-[40px]"
                      >
                        <Check className="w-5 h-5 text-[#009379] flex-shrink-0" />
                        <div className="leading-tight text-[12px] font-semibold">
                          {feature}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <Button className="bg-[#E5F4F2] text-[12px] py-6 w-full text-[#009379] rounded-2xl font-bold">
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="!mt-[40px]">
          <Button
            style={{
              backgroundImage: "url(/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => router.push("/home/pricing")}
            className="text-white rounded-[16px] px-8 py-6 text-base font-semibold"
          >
            See full pricing
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingPlans;
