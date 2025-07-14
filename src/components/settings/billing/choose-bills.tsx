import CheckIcon from "@/components/icons/check";
import { Button } from "@/components/ui/button";
import { montserrat, mullish, outfit, poppins } from "@/constants/app";
import { BillingPlanCardProps } from "@/interfaces/billing.interface";
import { BillingContext } from "@/providers/billing.context";
import classNames from "classnames";
import { ArrowLeft, Check, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

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

let pricingPlans = [
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

function BillingChooseView() {
  const ctx = useContext(BillingContext);
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatureSlide, setCurrentFeatureSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % translatedPlans.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + translatedPlans.length) % translatedPlans.length
    );
  };

  const nextFeatureSlide = () => {
    setCurrentFeatureSlide(
      (prev) => (prev + 1) % translatedPricingPlans.length
    );
  };

  const prevFeatureSlide = () => {
    setCurrentFeatureSlide(
      (prev) =>
        (prev - 1 + translatedPricingPlans.length) %
        translatedPricingPlans.length
    );
  };

  // Get translated plans data
  const getTranslatedPlans = () => [
    {
      plan: t("settings.billing.plans.free.name"),
      price: "0",
      title: t("settings.billing.plans.free.title"),
      description: t("settings.billing.plans.free.description"),
      features: t("settings.billing.plans.free.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      plan: t("settings.billing.plans.basic.name"),
      price: "119.99",
      title: t("settings.billing.plans.basic.title"),
      description: t("settings.billing.plans.basic.description"),
      features: t("settings.billing.plans.basic.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      plan: t("settings.billing.plans.pro.name"),
      price: "1199",
      title: t("settings.billing.plans.pro.title"),
      description: t("settings.billing.plans.pro.description"),
      features: t("settings.billing.plans.pro.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      plan: t("settings.billing.plans.enterprise.name"),
      price: "5000+",
      title: t("settings.billing.plans.enterprise.title"),
      description: t("settings.billing.plans.enterprise.description"),
      features: t("settings.billing.plans.enterprise.features", {
        returnObjects: true,
      }) as string[],
    },
  ];

  const translatedPlans = getTranslatedPlans();

  // Get translated pricing plans data
  const getTranslatedPricingPlans = () => [
    {
      name: t("settings.billing.planDetails.basicFree.name"),
      price: t("settings.billing.planDetails.basicFree.price"),
      access: t("settings.billing.planDetails.basicFree.access"),
      userType: t("settings.billing.planDetails.basicFree.userType"),
      jobPosting: false,
      applicantsLimit: false,
      applicationTracking: false,
      jobBoardAccess: t(
        "settings.billing.planDetails.basicFree.jobBoardAccess"
      ),
      candidateReportGenerator: false,
      jobTools: t("settings.billing.planDetails.basicFree.jobTools", {
        returnObjects: true,
      }),
      cvTools: t("settings.billing.planDetails.basicFree.cvTools", {
        returnObjects: true,
      }),
      coverLetterTools: t(
        "settings.billing.planDetails.basicFree.coverLetterTools",
        { returnObjects: true }
      ),
      communityAccess: t(
        "settings.billing.planDetails.basicFree.communityAccess"
      ),
      submitArticle: false,
      feedbackSupport: false,
    },
    {
      name: t("settings.billing.planDetails.basicJobSeekers.name"),
      price: t("settings.billing.planDetails.basicJobSeekers.price"),
      access: t("settings.billing.planDetails.basicJobSeekers.access"),
      userType: t("settings.billing.planDetails.basicJobSeekers.userType"),
      jobPosting: false,
      applicantsLimit: false,
      applicationTracking: false,
      jobBoardAccess: t(
        "settings.billing.planDetails.basicJobSeekers.jobBoardAccess"
      ),
      candidateReportGenerator: false,
      jobTools: t("settings.billing.planDetails.basicJobSeekers.jobTools", {
        returnObjects: true,
      }),
      cvTools: t("settings.billing.planDetails.basicJobSeekers.cvTools", {
        returnObjects: true,
      }),
      coverLetterTools: t(
        "settings.billing.planDetails.basicJobSeekers.coverLetterTools",
        { returnObjects: true }
      ),
      communityAccess: t(
        "settings.billing.planDetails.basicJobSeekers.communityAccess"
      ),
      submitArticle: false,
      feedbackSupport: t(
        "settings.billing.planDetails.basicJobSeekers.feedbackSupport"
      ),
    },
    {
      name: t("settings.billing.planDetails.premiumRecruiters.name"),
      price: t("settings.billing.planDetails.premiumRecruiters.price"),
      access: t("settings.billing.planDetails.premiumRecruiters.access"),
      userType: t("settings.billing.planDetails.premiumRecruiters.userType"),
      jobPosting: t(
        "settings.billing.planDetails.premiumRecruiters.jobPosting"
      ),
      applicantsLimit: t(
        "settings.billing.planDetails.premiumRecruiters.applicantsLimit"
      ),
      applicationTracking: t(
        "settings.billing.planDetails.premiumRecruiters.applicationTracking"
      ),
      jobBoardAccess: t(
        "settings.billing.planDetails.premiumRecruiters.jobBoardAccess"
      ),
      candidateReportGenerator: t(
        "settings.billing.planDetails.premiumRecruiters.candidateReportGenerator"
      ),
      jobTools: t("settings.billing.planDetails.premiumRecruiters.jobTools", {
        returnObjects: true,
      }),
      cvTools: t("settings.billing.planDetails.premiumRecruiters.cvTools", {
        returnObjects: true,
      }),
      coverLetterTools: t(
        "settings.billing.planDetails.premiumRecruiters.coverLetterTools",
        { returnObjects: true }
      ),
      communityAccess: t(
        "settings.billing.planDetails.premiumRecruiters.communityAccess"
      ),
      submitArticle: t(
        "settings.billing.planDetails.premiumRecruiters.submitArticle"
      ),
      feedbackSupport: t(
        "settings.billing.planDetails.premiumRecruiters.feedbackSupport"
      ),
    },
    {
      name: t("settings.billing.planDetails.enterprise.name"),
      price: t("settings.billing.planDetails.enterprise.price"),
      access: t("settings.billing.planDetails.enterprise.access"),
      userType: t("settings.billing.planDetails.enterprise.userType"),
      jobPosting: t("settings.billing.planDetails.enterprise.jobPosting"),
      applicantsLimit: t(
        "settings.billing.planDetails.enterprise.applicantsLimit"
      ),
      applicationTracking: t(
        "settings.billing.planDetails.enterprise.applicationTracking"
      ),
      jobBoardAccess: t(
        "settings.billing.planDetails.enterprise.jobBoardAccess"
      ),
      candidateReportGenerator: t(
        "settings.billing.planDetails.enterprise.candidateReportGenerator"
      ),
      jobTools: t("settings.billing.planDetails.enterprise.jobTools", {
        returnObjects: true,
      }),
      cvTools: t("settings.billing.planDetails.enterprise.cvTools", {
        returnObjects: true,
      }),
      coverLetterTools: t(
        "settings.billing.planDetails.enterprise.coverLetterTools",
        { returnObjects: true }
      ),
      communityAccess: t(
        "settings.billing.planDetails.enterprise.communityAccess"
      ),
      submitArticle: t("settings.billing.planDetails.enterprise.submitArticle"),
      feedbackSupport: t(
        "settings.billing.planDetails.enterprise.feedbackSupport"
      ),
    },
  ];

  const translatedPricingPlans = getTranslatedPricingPlans();

  // Override static pricingPlans with translated version
  pricingPlans = translatedPricingPlans as any;

  return (
    <div className={`${outfit.className} space-y-6`}>
      <button
        onClick={() => ctx.goTo("manage")}
        className="hover:bg-gray-100 p-1 rounded-full transition-colors flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4 text-gray-600" />

        <span className="text-sm font-semibold">
          {t("settings.billing.manageSubscription")}
        </span>
      </button>
      {/* Mobile View with Slider */}
      <div className="relative block md:hidden w-full mt-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {translatedPlans.map((plan, index) => (
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
                        {plan.plan ===
                        t("settings.billing.plans.enterprise.name") ? null : (
                          <span className="text-sm font-semibold">
                            {t("settings.billing.planDetails.month")}
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
                    <Button
                      onClick={() => {
                        if (plan.plan === "Enterprise") {
                          ctx.goTo("enterprise");
                        }
                      }}
                      className="bg-[#E5F4F2] text-[12px] py-6 w-full text-[#009379] rounded-2xl font-bold"
                    >
                      {t("settings.billing.getStarted")}
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
      </div>

      {/* Desktop/Tablet Grid View */}
      <div className="!mt-0 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 md:px-0">
        {translatedPlans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              plan.plan === t("settings.billing.plans.enterprise.name")
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
                  {plan.plan ===
                  t("settings.billing.plans.enterprise.name") ? null : (
                    <span className="text-sm font-semibold">
                      {t("settings.billing.planDetails.month")}
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
              <Button
                onClick={() => {
                  if (
                    plan.plan === t("settings.billing.plans.enterprise.name")
                  ) {
                    ctx.goTo("enterprise");
                  }
                }}
                className="bg-[#E5F4F2] text-[12px] py-6 w-full text-[#009379] rounded-2xl font-bold"
              >
                {t("settings.billing.getStarted")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Features Table */}
      <div className="w-full text-[12px] mx-auto px-4 md:px-0 md:pb-16 mb-16">
        {/* Mobile Features Carousel */}
        <div className="relative block md:hidden w-full mt-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentFeatureSlide * 100}%)`,
              }}
            >
              {translatedPricingPlans.map((plan, index) => (
                <div key={index} className="w-full h-fit flex-shrink-0 px-4">
                  <div
                    className={`${outfit.className} flex flex-col ${
                      plan.name ===
                      t("settings.billing.planDetails.enterprise.name")
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
                              {"?"}
                            </span>
                            <span className="text-[16px] text-gray-500 ml-1">
                              {t("settings.billing.planDetails.month")}
                            </span>
                          </>
                        ) : (
                          plan.price
                        )}
                      </div>
                    </div>

                    <div className="">
                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.dashboard")}
                        </span>
                        <span className="ml-2">{plan.access}</span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.userType")}
                        </span>
                        <span className="ml-2">{plan.userType}</span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.jobPosting")}
                        </span>
                        <span className="ml-2">
                          {renderCheckOrValue(plan.jobPosting)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.applicantsLimits")}
                        </span>
                        <span className="ml-2">
                          {renderCheckOrValue(plan.applicantsLimit)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.applicationTracking")}
                        </span>
                        <span className="ml-2">
                          {renderCheckOrValue(plan.applicationTracking)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.jobBoardAccess")}
                        </span>
                        <span className="ml-2">{plan.jobBoardAccess}</span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t(
                            "settings.billing.features.candidateReportGenerator"
                          )}
                        </span>
                        <span className="ml-2">
                          {renderCheckOrValue(plan.candidateReportGenerator)}
                        </span>
                      </div>

                      {/* Job Tools Section */}
                      <div className="py-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[13px]">
                            {t("settings.billing.features.jobTools")}
                          </span>
                          <span className="text-xs bg-black text-white px-2 py-1 rounded-[4px]">
                            {t("settings.billing.features.mostPopular")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.generator")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.jobTools as any).generator
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.translator")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.jobTools as any).translator
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.vetting")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.jobTools as any).vetting
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.interviewPrep")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.jobTools as any).interviewPrep
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t(
                                "settings.billing.features.aiScreeningAssistant"
                              )}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.jobTools as any).aiScreeningAssistant
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t(
                                "settings.billing.features.screeningQGenerator"
                              )}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.jobTools as any).screeningQGenerator
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CV Tools Section */}
                      <div className="py-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[13px]">
                            {t("settings.billing.features.cvTools")}
                          </span>
                          <span className="text-xs bg-black text-white px-2 py-1 rounded-[4px]">
                            {t("settings.billing.features.mostPopular")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.summarizer")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).summarizer
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.vetting")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).vetting
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.matchingRanking")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).matchingRanking
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.headToHead")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).headToHead
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.generator")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).generator
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.translator")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).translator
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.rewriter")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.cvTools as any).rewriter
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cover Letter Tools Section */}
                      <div className="py-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[13px]">
                            {t("settings.billing.features.coverLetterTools")}
                          </span>
                          <span className="text-xs bg-black text-white px-2 py-1 rounded-[4px]">
                            {t("settings.billing.features.mostPopular")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.summarizer")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).summarizer
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.vetting")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).vetting
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.matchingRanking")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).matchingRanking
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.headToHead")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).headToHead
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.generator")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).generator
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.translator")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).translator
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[13px]">
                            <span>
                              {t("settings.billing.features.rewriter")}
                            </span>
                            <span>
                              {renderCheckOrValue(
                                (plan.coverLetterTools as any).rewriter
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.communityAccess")}
                        </span>
                        <span className="ml-2">{plan.communityAccess}</span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.submitArticle")}
                        </span>
                        <span className="ml-2">
                          {renderCheckOrValue(plan.submitArticle)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[13px] py-2">
                        <span className="font-bold">
                          {t("settings.billing.features.feedbackSupport")}
                        </span>
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
            {translatedPricingPlans.map((_, index) => (
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
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <div className="bg-transparent">
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-4">
              {/* Features Column */}
              <div
                className={`${montserrat.className} rounded-[16px] border-t-[8px] border-t-[#065844] shadow-md`}
              >
                <div className="h-[64px] mb-6">
                  <h2 className="text-[14px] h-full flex items-center justify-center m-[8px] border-b-[2px] border-black pb-2 font-bold text-center">
                    {t("settings.billing.features.features")}
                  </h2>
                </div>
                {renderFeatureLabel(t("settings.billing.features.dashboard"))}
                {renderFeatureLabel(
                  t("settings.billing.features.userType"),
                  t("settings.billing.features.mostPopular")
                )}
                {renderFeatureLabel(t("settings.billing.features.jobPosting"))}
                {renderFeatureLabel(
                  t("settings.billing.features.applicantsLimits")
                )}
                {renderFeatureLabel(
                  t("settings.billing.features.applicationTracking")
                )}
                {renderFeatureLabel(
                  t("settings.billing.features.jobBoardAccess")
                )}
                {renderFeatureLabel(
                  t("settings.billing.features.candidateReportGenerator")
                )}
                {renderFeatureLabel(
                  t("settings.billing.features.jobTools"),
                  t("settings.billing.features.mostPopular")
                )}
                <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:items-center">
                  <div>{t("settings.billing.features.generator")}</div>
                  <div>{t("settings.billing.features.translator")}</div>
                  <div>{t("settings.billing.features.vetting")}</div>
                  <div>{t("settings.billing.features.interviewPrep")}</div>
                  <div>
                    {t("settings.billing.features.aiScreeningAssistant")}
                  </div>
                  <div>
                    {t("settings.billing.features.screeningQGenerator")}
                  </div>
                </div>
                {renderFeatureLabel(
                  t("settings.billing.features.cvTools"),
                  t("settings.billing.features.mostPopular")
                )}
                <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:items-center">
                  <div>{t("settings.billing.features.summarizer")}</div>
                  <div>{t("settings.billing.features.vetting")}</div>
                  <div>{t("settings.billing.features.matchingRanking")}</div>
                  <div>{t("settings.billing.features.headToHead")}</div>
                  <div>{t("settings.billing.features.generator")}</div>
                  <div>{t("settings.billing.features.translator")}</div>
                  <div>{t("settings.billing.features.rewriter")}</div>
                </div>
                {renderFeatureLabel(
                  t("settings.billing.features.coverLetterTools"),
                  t("settings.billing.features.mostPopular")
                )}
                <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:items-center">
                  <div>{t("settings.billing.features.summarizer")}</div>
                  <div>{t("settings.billing.features.vetting")}</div>
                  <div>{t("settings.billing.features.matchingRanking")}</div>
                  <div>{t("settings.billing.features.headToHead")}</div>
                  <div>{t("settings.billing.features.generator")}</div>
                  <div>{t("settings.billing.features.translator")}</div>
                  <div>{t("settings.billing.features.rewriter")}</div>
                </div>
                {renderFeatureLabel(
                  t("settings.billing.features.communityAccess")
                )}
                {renderFeatureLabel(
                  t("settings.billing.features.submitArticle")
                )}
                {renderFeatureLabel(
                  t("settings.billing.features.feedbackSupport")
                )}
              </div>

              {/* Basic Plan Column */}
              <div
                className={`${outfit.className} rounded-[30px] border-t-[8px] bg-gray-50 border-t-gray-50 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]`}
              >
                <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                  <div className="font-bold text-[14px]">
                    {t("settings.billing.planDetails.basicFree.name")}
                  </div>
                  <div className="text-[20px] font-extrabold  border-b-[2px] border-black pb-2">
                    {t("settings.billing.planDetails.basicFree.price")}
                  </div>
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {translatedPricingPlans[0].access}
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {translatedPricingPlans[0].userType}
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {renderCheckOrValue(translatedPricingPlans[0].jobPosting)}
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {renderCheckOrValue(
                    translatedPricingPlans[0].applicantsLimit
                  )}
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {renderCheckOrValue(
                    translatedPricingPlans[0].applicationTracking
                  )}
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {translatedPricingPlans[0].jobBoardAccess}
                </div>
                <div className="h-[40px] flex items-center justify-center">
                  {renderCheckOrValue(
                    translatedPricingPlans[0].candidateReportGenerator
                  )}
                </div>
                <div className="!h-fit mt-[40px]">
                  <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].jobTools as any).generator
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].jobTools as any).translator
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].jobTools as any).vetting
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].jobTools as any)
                          .interviewPrep
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].jobTools as any)
                          .aiScreeningAssistant
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].jobTools as any)
                          .screeningQGenerator
                      )}
                    </div>
                  </div>
                </div>
                <div className="!h-fit mt-[40px]">
                  <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any).summarizer
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any).vetting
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any)
                          .matchingRanking
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any).headToHead
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any).generator
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any).translator
                      )}
                    </div>
                    <div>
                      {renderCheckOrValue(
                        (translatedPricingPlans[0].cvTools as any).rewriter
                      )}
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
              </div>

              {/* Basic - Job Seekers Column */}
              <div
                className={`${outfit.className} rounded-[30px] border-t-[8px] border-t-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]`}
              >
                <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                  <div className="text-[14px]">
                    {t("settings.billing.planDetails.basicJobSeekers.name")}
                  </div>
                  <div className="text-[20px] font-extrabold border-b-[2px] border-black pb-2">
                    {t("settings.billing.planDetails.basicJobSeekers.price")}
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
                  {renderCheckOrValue(pricingPlans[1].candidateReportGenerator)}
                </div>
                <div className="!h-fit mt-[40px]">
                  <div className="[&>*]:h-[40px] [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                    <div>
                      {renderCheckOrValue(pricingPlans[1].jobTools.generator)}
                    </div>
                    <div>
                      {renderCheckOrValue(pricingPlans[1].jobTools.translator)}
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
              </div>

              {/* Premium - Recruiters Column */}
              <div
                className={`${outfit.className} rounded-[30px] border-t-[8px] border-t-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]`}
              >
                <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                  <div className="font-bold text-[14px]">
                    {t("settings.billing.planDetails.premiumRecruiters.name")}
                  </div>
                  <div className="text-[20px] font-extrabold  border-b-[2px] border-black  pb-2">
                    {t("settings.billing.planDetails.premiumRecruiters.price")}
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
                  {renderCheckOrValue(pricingPlans[2].candidateReportGenerator)}
                </div>
                <div className="!h-fit mt-[40px] text-center">
                  <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                    <div>
                      {renderCheckOrValue(pricingPlans[2].jobTools.generator)}
                    </div>
                    <div>
                      {renderCheckOrValue(pricingPlans[2].jobTools.translator)}
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
              </div>

              {/* Enterprise Column */}
              <div
                className={`${outfit.className} bg-primary border-t-[8px] border-t-[#065844] text-white rounded-[30px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px] pb-8`}
              >
                <div className="p-2 text-center h-[62px] border-b-0 mb-8">
                  <div className="font-bold text-[14px]">
                    {t("settings.billing.planDetails.enterprise.name")}
                  </div>
                  <div className="text-[20px] font-extrabold border-b-[2px] border-white pb-2">
                    {t("settings.billing.planDetails.enterprise.price")}
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
                  {renderCheckOrValue(pricingPlans[3].candidateReportGenerator)}
                </div>
                <div className="!h-fit  mt-[40px] text-center">
                  <div className="[&>*]:p-4 [&>*]:h-[40px] [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                    <div>
                      {renderCheckOrValue(pricingPlans[3].jobTools.generator)}
                    </div>
                    <div>
                      {renderCheckOrValue(pricingPlans[3].jobTools.translator)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingChooseView;
