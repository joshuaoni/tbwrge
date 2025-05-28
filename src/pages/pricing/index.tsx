import React, { useState, useRef } from "react";
import { inter, montserrat, outfit, poppins } from "@/constants/app";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useInView } from "framer-motion";
import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import Expertise from "@/components/home/expertise";

const PricingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatureSlide, setCurrentFeatureSlide] = useState(0);
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

  const nextFeatureSlide = () => {
    setCurrentFeatureSlide((prev) => (prev + 1) % pricingPlans.length);
  };

  const prevFeatureSlide = () => {
    setCurrentFeatureSlide(
      (prev) => (prev - 1 + pricingPlans.length) % pricingPlans.length
    );
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

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      access: "Limited Access",
      userType: "Free User",
      jobPosting: false,
      applicantsLimit: false,
      applicationTracking: false,
      jobBoardAccess: "Basic Access",
      candidateReportGenerator: false,
      jobTools: {
        generator: false,
        translator: false,
        vetting: false,
        interviewPrep: "1 Trial Use",
        aiScreeningAssistant: "1 Trial Use",
        screeningQGenerator: false,
      },
      cvTools: {
        summarizer: false,
        vetting: false,
        matchingRanking: false,
        headToHead: "1 Trial Use",
        generator: false,
        translator: false,
        rewriter: false,
      },
      coverLetterTools: {
        summarizer: "1 Trial Use",
        vetting: false,
        matchingRanking: false,
        headToHead: false,
        generator: false,
        translator: "1 Trial Use",
        rewriter: false,
      },
      communityAccess: "Participation Only",
      submitArticle: false,
      feedbackSupport: false,
    },
    {
      name: "Basic - Job Seekers",
      price: "€9.99/Month",
      access: "Limited Access",
      userType: "Free User",
      jobPosting: false,
      applicantsLimit: false,
      applicationTracking: false,
      jobBoardAccess: "Full Access",
      candidateReportGenerator: false,
      jobTools: {
        generator: false,
        translator: false,
        vetting: false,
        interviewPrep: "5 uses/month",
        aiScreeningAssistant: "5 uses/month",
        screeningQGenerator: false,
      },
      cvTools: {
        summarizer: "5 uses/month",
        vetting: "5 uses/month",
        matchingRanking: "5 uses/month",
        headToHead: false,
        generator: "5 uses/month",
        translator: "5 uses/month",
        rewriter: "5 uses/month",
      },
      coverLetterTools: {
        summarizer: "5 uses/month",
        vetting: "5 uses/month",
        matchingRanking: "5 uses/month",
        headToHead: false,
        generator: "5 uses/month",
        translator: "5 uses/month",
        rewriter: "5 uses/month",
      },
      communityAccess: "Full Access",
      submitArticle: false,
      feedbackSupport: "Basic Support",
    },
    {
      name: "Premium - Recruiters",
      price: "€99/Month",
      access: "Full Access",
      userType: "Teams/Multiple Users",
      jobPosting: "Unlimited Job Postings",
      applicantsLimit: "1,000 candidates/month",
      applicationTracking: "Yes",
      jobBoardAccess: "Premium Access with Filters",
      candidateReportGenerator: "100 uses/month",
      jobTools: {
        generator: "100 uses/month",
        translator: "100 uses/month",
        vetting: "100 uses/month",
        interviewPrep: "100 uses/month",
        aiScreeningAssistant: "100 uses/month",
        screeningQGenerator: "100 uses/month",
      },
      cvTools: {
        summarizer: "100 uses/month",
        vetting: "100 uses/month",
        matchingRanking: "100 uses/month",
        headToHead: "100 uses/month",
        generator: "100 uses/month",
        translator: "100 uses/month",
        rewriter: "100 uses/month",
      },
      coverLetterTools: {
        summarizer: "100 uses/month",
        vetting: "100 uses/month",
        matchingRanking: "100 uses/month",
        headToHead: "100 uses/month",
        generator: "100 uses/month",
        translator: "100 uses/month",
        rewriter: "100 uses/month",
      },
      communityAccess: "Full Access with priority Features",
      submitArticle: "1 per month",
      feedbackSupport: "Premium Support",
    },
    {
      name: "Enterprise",
      price: "+€500/Month",
      access: "Custom Setups and Insights",
      userType: "Custom team structure",
      jobPosting: "Custom Posting Workflow",
      applicantsLimit: "Unlimited",
      applicationTracking: "Advanced",
      jobBoardAccess: "Advanced Analytics/Tracking",
      candidateReportGenerator: "Unlimited",
      jobTools: {
        generator: "Unlimited",
        translator: "Unlimited",
        vetting: "Unlimited",
        interviewPrep: "Unlimited",
        aiScreeningAssistant: "Unlimited",
        screeningQGenerator: "Unlimited",
      },
      cvTools: {
        summarizer: "Unlimited",
        vetting: "Unlimited",
        matchingRanking: "Unlimited",
        headToHead: "Unlimited",
        generator: "Unlimited",
        translator: "Unlimited",
        rewriter: "Unlimited",
      },
      coverLetterTools: {
        summarizer: "Unlimited",
        vetting: "Unlimited",
        matchingRanking: "Unlimited",
        headToHead: "Unlimited",
        generator: "Unlimited",
        translator: "Unlimited",
        rewriter: "Unlimited",
      },
      communityAccess: "Enterprise Priority",
      submitArticle: "Unlimited",
      feedbackSupport: "Enterprise Level Support",
    },
  ];

  const renderCheckOrValue = (value: any) => {
    if (value === false)
      return (
        <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center">
          <X className="w-3 h-3 text-black" />
        </div>
      );
    if (value === true) return <Check className="w-4 h-4 text-[#009379]" />;
    return <span className="">{value}</span>;
  };

  const renderFeatureLabel = (label: string, subLabel?: string) => {
    const boldLabels = [
      "Dashboard",
      "User Type",
      "Job Posting",
      "Applicants Limits",
      "Application Tracking System",
      "Job board Access",
      "Candidate Report Generator",
      "Job Tools",
      "CV Tools",
      "Cover Letter Tools",
      "Community Access",
      "Submit an Article",
      "Feedback & Support",
    ];

    return (
      <div
        className={`${outfit.className} h-[40px] flex items-center justify-between p-4`}
      >
        <span className={boldLabels.includes(label) ? "font-extrabold" : ""}>
          {label}
        </span>
        {subLabel && (
          <span
            className={`text-xs ${
              subLabel === "Most Popular"
                ? "bg-black text-white px-3 py-2 rounded-[6px]"
                : "text-gray-500"
            }`}
          >
            {subLabel}
          </span>
        )}
      </div>
    );
  };

  return (
    <LandingWrapper>
      <motion.main
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={`${outfit.className} flex flex-col`}
      >
        <motion.div
          variants={containerVariants}
          className={`${outfit.className} bg-gradient-to-b from-gray-50 via-gray-50/50 to-white md:px-16 flex flex-col space-y-4 items-center`}
        >
          <motion.div
            variants={itemVariants}
            className="px-6 md:px-0 flex flex-col w-full my-12 pb-8 mb-0 md:mb-12 items-center"
          >
            <h1 className="text-[25px] font-extrabold p-4">Pricing</h1>
            <p className="text-sm text-[#2D2D2D] md:pb-12 text-center md:px-24">
              Choose the Perfect Pricing for Your Hiring and Career Goals
            </p>
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
                            <span className="text-[40px] font-extrabold">
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
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
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
                      <span className="text-[40px] font-extrabold">
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
          </motion.div>
        </motion.div>

        {/* Detailed Features Table */}
        <motion.div
          variants={containerVariants}
          className="w-full text-[12px] max-w-[1400px] mx-auto px-4 md:px-16 md:pb-16 mb-16"
        >
          {/* Mobile Features Carousel */}
          <motion.div
            variants={itemVariants}
            className="relative block md:hidden w-full mt-8"
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentFeatureSlide * 100}%)`,
                }}
              >
                {pricingPlans.map((plan, index) => (
                  <div key={index} className="w-full h-fit flex-shrink-0 px-4">
                    <div
                      className={`${outfit.className} flex flex-col ${
                        plan.name === "Enterprise"
                          ? "bg-primary text-white"
                          : "bg-white"
                      } rounded-[20px] shadow-lg p-4`}
                    >
                      <div className="text-center mb-4">
                        <h3 className="text-[16px] font-bold mb-1">
                          {plan.name}
                        </h3>
                        <div className="text-[32px] font-extrabold mb-2 flex items-center justify-center">
                          {plan.price && plan.price.includes("€") ? (
                            <>
                              <span className="text-[20px] mr-1">€</span>
                              <span>
                                {plan.price.split("€")[1].split("/")[0]}
                              </span>
                              <span className="text-[16px] text-gray-500 ml-1">
                                /month
                              </span>
                            </>
                          ) : (
                            plan.price
                          )}
                        </div>
                      </div>

                      <div className="">
                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Dashboard</span>
                          <span className="ml-2">{plan.access}</span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">User Type</span>
                          <span className="ml-2">{plan.userType}</span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Job Posting</span>
                          <span className="ml-2">
                            {renderCheckOrValue(plan.jobPosting)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Applicants Limits</span>
                          <span className="ml-2">
                            {renderCheckOrValue(plan.applicantsLimit)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">
                            Application Tracking System
                          </span>
                          <span className="ml-2">
                            {renderCheckOrValue(plan.applicationTracking)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Job board Access</span>
                          <span className="ml-2">{plan.jobBoardAccess}</span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">
                            Candidate Report Generator
                          </span>
                          <span className="ml-2">
                            {renderCheckOrValue(plan.candidateReportGenerator)}
                          </span>
                        </div>

                        {/* Job Tools Section */}
                        <div className="py-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[13px]">
                              Job Tools
                            </span>
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-[4px]">
                              Most Popular
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Generator</span>
                              <span>
                                {renderCheckOrValue(plan.jobTools.generator)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Translator</span>
                              <span>
                                {renderCheckOrValue(plan.jobTools.translator)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Vetting</span>
                              <span>
                                {renderCheckOrValue(plan.jobTools.vetting)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Interview Prep</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.jobTools.interviewPrep
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>AI Screening Assistant</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.jobTools.aiScreeningAssistant
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Q Generator</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.jobTools.screeningQGenerator
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CV Tools Section */}
                        <div className="py-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[13px]">
                              CV Tools
                            </span>
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-[4px]">
                              Most Popular
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Summarizer</span>
                              <span>
                                {renderCheckOrValue(plan.cvTools.summarizer)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Vetting</span>
                              <span>
                                {renderCheckOrValue(plan.cvTools.vetting)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Matching & Ranking</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.cvTools.matchingRanking
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Head to Head</span>
                              <span>
                                {renderCheckOrValue(plan.cvTools.headToHead)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Generator</span>
                              <span>
                                {renderCheckOrValue(plan.cvTools.generator)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Translator</span>
                              <span>
                                {renderCheckOrValue(plan.cvTools.translator)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Rewriter</span>
                              <span>
                                {renderCheckOrValue(plan.cvTools.rewriter)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Cover Letter Tools Section */}
                        <div className="py-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[13px]">
                              Cover Letter Tools
                            </span>
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-[4px]">
                              Most Popular
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Summarizer</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.summarizer
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Vetting</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.vetting
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Matching & Ranking</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.matchingRanking
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Head to Head</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.headToHead
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Generator</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.generator
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Translator</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.translator
                                )}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span>Rewriter</span>
                              <span>
                                {renderCheckOrValue(
                                  plan.coverLetterTools.rewriter
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Community Access</span>
                          <span className="ml-2">{plan.communityAccess}</span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Submit an Article</span>
                          <span className="ml-2">
                            {renderCheckOrValue(plan.submitArticle)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[13px] py-2">
                          <span className="font-bold">Feedback & Support</span>
                          <span className="ml-2">
                            {renderCheckOrValue(plan.feedbackSupport)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevFeatureSlide}
              className="absolute left-[-10px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextFeatureSlide}
              className="absolute right-[-10px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Slide indicators */}
            <div className="flex justify-center gap-2">
              {pricingPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeatureSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentFeatureSlide === index
                      ? "bg-primary w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Desktop Grid View */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <motion.div variants={containerVariants} className="bg-transparent">
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-4"
              >
                {/* Features Column */}
                <motion.div
                  variants={itemVariants}
                  className={`${montserrat.className} rounded-[16px] border-t-[8px] border-t-[#065844] shadow-md`}
                >
                  <div className="h-[64px] mb-6">
                    <h2 className="text-[14px] h-full flex items-center justify-center m-[8px] border-b-[2px] border-black pb-2 font-bold text-center">
                      Features
                    </h2>
                  </div>
                  {renderFeatureLabel("Dashboard")}
                  {renderFeatureLabel("User Type", "Most Popular")}
                  {renderFeatureLabel("Job Posting")}
                  {renderFeatureLabel("Applicants Limits")}
                  {renderFeatureLabel("Application Tracking System")}
                  {renderFeatureLabel("Job board Access")}
                  {renderFeatureLabel("Candidate Report Generator")}
                  {renderFeatureLabel("Job Tools", "Most Popular")}
                  <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:items-center">
                    <div>Generator</div>
                    <div>Translator</div>
                    <div>Vetting</div>
                    <div>AI Interview Prep</div>
                    <div>AI Screening Questions Assistant</div>
                    <div>Screening/Interview Q Generator</div>
                  </div>
                  {renderFeatureLabel("CV Tools", "Most Popular")}
                  <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:items-center">
                    <div>Summarizer</div>
                    <div>Vetting</div>
                    <div>Matching & Ranking</div>
                    <div>Head to Head</div>
                    <div>Generator</div>
                    <div>Translator</div>
                    <div>Rewriter</div>
                  </div>
                  {renderFeatureLabel("Cover Letter Tools", "Most Popular")}
                  <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:items-center">
                    <div>Summarizer</div>
                    <div>Vetting</div>
                    <div>Matching & Ranking</div>
                    <div>Head to Head</div>
                    <div>Generator</div>
                    <div>Translator</div>
                    <div>Rewriter</div>
                  </div>
                  {renderFeatureLabel("Community Access")}
                  {renderFeatureLabel("Submit an Article")}
                  {renderFeatureLabel("Feedback & Support")}
                </motion.div>

                {/* Basic Plan Column */}
                <motion.div
                  variants={itemVariants}
                  className={`${outfit.className} rounded-[30px] border-t-[8px] bg-gray-50 border-t-gray-50 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]`}
                >
                  <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                    <div className="font-bold text-[14px]">Basic</div>
                    <div className="text-[20px] font-extrabold  border-b-[2px] border-black pb-2">
                      Free
                    </div>
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {pricingPlans[0].access}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {pricingPlans[0].userType}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(pricingPlans[0].jobPosting)}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(pricingPlans[0].applicantsLimit)}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(pricingPlans[0].applicationTracking)}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {pricingPlans[0].jobBoardAccess}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(
                      pricingPlans[0].candidateReportGenerator
                    )}
                  </div>
                  <div className="!h-fit mt-[40px]">
                    <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[0].jobTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].jobTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[0].jobTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].jobTools.interviewPrep
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].jobTools.aiScreeningAssistant
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].jobTools.screeningQGenerator
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px]">
                    <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[0].cvTools.summarizer)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[0].cvTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].cvTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[0].cvTools.headToHead)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[0].cvTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[0].cvTools.translator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[0].cvTools.rewriter)}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px]">
                    <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.summarizer
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.vetting
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.headToHead
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.generator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[0].coverLetterTools.rewriter
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 h-[40px] flex justify-center items-center text-center">
                    {pricingPlans[0].communityAccess}
                  </div>
                  <div className="p-4 h-[40px] flex justify-center text-center">
                    {renderCheckOrValue(pricingPlans[0].submitArticle)}
                  </div>
                  <div className="p-4 h-[40px] flex justify-center text-center">
                    {renderCheckOrValue(pricingPlans[0].feedbackSupport)}
                  </div>
                </motion.div>

                {/* Basic - Job Seekers Column */}
                <motion.div
                  variants={itemVariants}
                  className={`${outfit.className} rounded-[30px] border-t-[8px] border-t-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]`}
                >
                  <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                    <div className="text-[14px]">
                      <span className="font-semibold">Basic</span>
                      <span className="font-light"> - Job Seekers</span>
                    </div>
                    <div className="text-[20px] font-extrabold border-b-[2px] border-black pb-2">
                      €9.99/Month
                    </div>
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {pricingPlans[1].access}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {pricingPlans[1].userType}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(pricingPlans[1].jobPosting)}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(pricingPlans[1].applicantsLimit)}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(pricingPlans[1].applicationTracking)}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {pricingPlans[1].jobBoardAccess}
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    {renderCheckOrValue(
                      pricingPlans[1].candidateReportGenerator
                    )}
                  </div>
                  <div className="!h-fit mt-[40px]">
                    <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[1].jobTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].jobTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[1].jobTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].jobTools.interviewPrep
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].jobTools.aiScreeningAssistant
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].jobTools.screeningQGenerator
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px]">
                    <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[1].cvTools.summarizer)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[1].cvTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].cvTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[1].cvTools.headToHead)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[1].cvTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[1].cvTools.translator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[1].cvTools.rewriter)}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px]">
                    <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.summarizer
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.vetting
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.headToHead
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.generator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[1].coverLetterTools.rewriter
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 h-[40px] flex justify-center items-center text-center">
                    {pricingPlans[1].communityAccess}
                  </div>
                  <div className="p-4 h-[40px] s-l flex justify-center text-center">
                    {renderCheckOrValue(pricingPlans[1].submitArticle)}
                  </div>
                  <div className="p-4 h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[1].feedbackSupport)}
                  </div>
                </motion.div>

                {/* Premium - Recruiters Column */}
                <motion.div
                  variants={itemVariants}
                  className={`${outfit.className} rounded-[30px] border-t-[8px] border-t-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]`}
                >
                  <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                    <div className="font-bold text-[14px]">
                      <span className="font-semibold">Premium</span>
                      <span className="font-light"> - Recruiters</span>
                    </div>
                    <div className="text-[20px] font-extrabold  border-b-[2px] border-black  pb-2">
                      €99/Month
                    </div>
                  </div>
                  <div className="p-4  flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[2].access}
                  </div>
                  <div className="p-4  flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[2].userType}
                  </div>
                  <div className="p-4  flex  justify-center items-center  h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[2].jobPosting)}
                  </div>
                  <div className="p-4 flex  justify-center items-center  h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[2].applicantsLimit)}
                  </div>
                  <div className="p-4 h-[40px] flex justify-center  text-center">
                    {renderCheckOrValue(pricingPlans[2].applicationTracking)}
                  </div>
                  <div className="p-4 flex justify-center items-center h-[40px] text-center">
                    {pricingPlans[2].jobBoardAccess}
                  </div>
                  <div className="p-4 h-[40px] flex justify-center text-center">
                    {renderCheckOrValue(
                      pricingPlans[2].candidateReportGenerator
                    )}
                  </div>
                  <div className="!h-fit mt-[40px] text-center">
                    <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[2].jobTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].jobTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[2].jobTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].jobTools.interviewPrep
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].jobTools.aiScreeningAssistant
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].jobTools.screeningQGenerator
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px] text-center">
                    <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[2].cvTools.summarizer)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[2].cvTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].cvTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[2].cvTools.headToHead)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[2].cvTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[2].cvTools.translator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[2].cvTools.rewriter)}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px] text-center">
                    <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.summarizer
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.vetting
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.headToHead
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.generator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[2].coverLetterTools.rewriter
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[2].communityAccess}
                  </div>
                  <div className="p-4  flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[2].submitArticle)}
                  </div>
                  <div className="p-4  flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[2].feedbackSupport)}
                  </div>
                </motion.div>

                {/* Enterprise Column */}
                <motion.div
                  variants={itemVariants}
                  className={`${outfit.className} bg-primary border-t-[8px] border-t-[#065844] text-white rounded-[30px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px] pb-8`}
                >
                  <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                    <div className="font-bold text-[14px]">Enterprise</div>
                    <div className="text-[20px] font-extrabold border-b-[2px] border-white pb-2">
                      +€500/Month
                    </div>
                  </div>
                  <div className="p-4  flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[3].access}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[3].userType}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[3].jobPosting)}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[3].applicantsLimit)}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[3].applicationTracking)}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[3].jobBoardAccess}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(
                      pricingPlans[3].candidateReportGenerator
                    )}
                  </div>
                  <div className="!h-fit  mt-[40px] text-center">
                    <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[3].jobTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].jobTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[3].jobTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].jobTools.interviewPrep
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].jobTools.aiScreeningAssistant
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].jobTools.screeningQGenerator
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px] text-center">
                    <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                      <div>
                        {renderCheckOrValue(pricingPlans[3].cvTools.summarizer)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[3].cvTools.vetting)}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].cvTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[3].cvTools.headToHead)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[3].cvTools.generator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[3].cvTools.translator)}
                      </div>
                      <div>
                        {renderCheckOrValue(pricingPlans[3].cvTools.rewriter)}
                      </div>
                    </div>
                  </div>
                  <div className="!h-fit mt-[40px] text-center">
                    <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.summarizer
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.vetting
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.matchingRanking
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.headToHead
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.generator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.translator
                        )}
                      </div>
                      <div>
                        {renderCheckOrValue(
                          pricingPlans[3].coverLetterTools.rewriter
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {pricingPlans[3].communityAccess}
                  </div>
                  <div className="p-4  flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[3].submitArticle)}
                  </div>
                  <div className="p-4 flex  justify-center items-center h-[40px] text-center">
                    {renderCheckOrValue(pricingPlans[3].feedbackSupport)}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>

      <hr className="w-full border-t-[1px] border-gray-200" />
      <Expertise />
    </LandingWrapper>
  );
};

export default PricingPage;
