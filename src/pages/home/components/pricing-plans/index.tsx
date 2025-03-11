import React from "react";
import JobTools from "../../../../public/images/icons/job-tools.png";
import CVTools from "../../../../public/images/icons/cv-tools.png";
import CoverLetterTools from "../../../../public/images/icons/cover-letter-tools.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { poppins } from "@/constants/app";

const PricingPlans = () => {
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
    <div
      className={`${poppins.className} bg-gradient-to-b from-white to-[#F8F9FF] md:px-16 flex flex-col space-y-4 items-center`}
    >
      <div className="px-6 md:px-0 flex flex-col w-full my-12 pb-8 space-y-4 mb-12 items-center">
        <h1 className="text-[25px] font-extrabold p-4">Our Pricing Plans</h1>
        <p className="text-sm text-[#2D2D2D] text-center px-24">
          Choose the Perfect Pricing for your hiring and career goals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 md:px-0">
          {plans.map((plan, index: number) => (
            <div
              key={index}
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
                        <div className="leading-tight  text-[12px] font-semibold">
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
          ))}
        </div>
        <div className="!mt-[40px]">
          <Button className="bg-[#009379] text-white rounded-[16px] px-8 py-6 text-base font-semibold">
            See full pricing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
