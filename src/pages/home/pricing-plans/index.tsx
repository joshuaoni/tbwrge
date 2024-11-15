import React from "react";
import JobTools from "../../../../public/images/icons/job-tools.png";
import CVTools from "../../../../public/images/icons/cv-tools.png";
import CoverLetterTools from "../../../../public/images/icons/cover-letter-tools.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPlans = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
  const plans = [
    {
      plan: "Basic",
      price: 19,
      title: "Job Tools",
      features: ["Basic access", "Basic", "1 per month"],
    },
    {
      plan: "Pro",
      price: 19,
      title: "CV Tools",
      features: [
        "Write feature details here",
        "Write feature details here",
        "Write feature details here",
      ],
    },
    {
      plan: "Premium",
      price: 19,
      title: "Cover Letter Tools",
      features: [
        "Write feature details here",
        "Write feature details here",
        "Write feature details here",
      ],
    },
    {
      plan: "Enterprise",
      price: 49,
      title: "Cover Letter Tools",
      features: [
        "Write feature details here",
        "Write feature details here",
        "Write feature details here",
      ],
    },
  ];
  return (
    <div className=" bg-white  flex flex-col  spaec-y-4 items-center ">
      <div className="bg-[#F8F9FF]  flex flex-col w-full md:w-[80%] my-12 pb-8  space-y-4 mb-12 items-center">
        <h1 className="text-[25px] font-extrabold p-4">Our Pricing Plans</h1>
        <p className="text-sm text-[#2D2D2D] text-center px-24">
          Choose the Perfect Pricing for your hiring and career goals
        </p>
        <div className="flex items-center  mt-6 space-x-8 space-4-6 overflow-x-scroll w-[400px] md:w-full">
          {plans.map((plan, index: number) => (
            <div
              className={`flex text-start flex-col ${
                plan.plan === "Enterprise"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }  space-y-6  min-h-[400px] min-w-[320px] max-w-[320px] rounded-2xl  justify-center px-4 `}
            >
              <span>{plan.plan}</span>
              <span className="text-[50px] font-extrabold">
                ${plan.price}
                <span className="text-sm font-light">/month</span>{" "}
              </span>
              <span className="font-light">Ideal for Growing Companies</span>
              <div className="flex flex-col ">
                {plan.features.map((pn) => {
                  return (
                    <span className="flex space-x-6 text-sm">
                      <Check color="#009379" /> {pn}
                    </span>
                  );
                })}
              </div>
              <Button className="bg-[#E5F4F2] text-primary rounded-2xl  font-bold text-base">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
