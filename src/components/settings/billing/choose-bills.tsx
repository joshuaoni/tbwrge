import CheckIcon from "@/components/icons/check";
import { Button } from "@/components/ui/button";
import { mullish, poppins } from "@/constants/app";
import { BillingPlanCardProps } from "@/interfaces/billing.interface";
import { BillingContext } from "@/providers/billing.context";
import classNames from "classnames";
import { ArrowLeft, Check } from "lucide-react";
import { useContext } from "react";

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

function BillingPlanCard(props: BillingPlanCardProps) {
  return (
    <div
      className={classNames(
        mullish.className,
        "py-8 px-6 space-y-2 w-full h-fit max-w-64 rounded-2xl border-[#F8F9FF]",
        "plan-card-drop-shadow",
        props.invert ? "bg-[#16372C] text-white" : "bg-white"
      )}
    >
      <span
        className={classNames(props.invert ? "text-white" : "text-[#2D2D2D]")}
      >
        {props.name}
      </span>
      <div>
        <span className={classNames(poppins.className, "font-bold text-4xl")}>
          ${props.pricePerMonth}
        </span>
        &nbsp;
        <span
          className={classNames(
            "text-xs font-bold",
            props.invert ? "text-white" : "text-[#3B3B3B]"
          )}
        >
          / month
        </span>
      </div>
      <p
        className={classNames(
          "text-sm",
          props.invert ? "text-white" : "text-[#2D2D2D]"
        )}
      >
        {props.description}
      </p>
      <div className="text-sm py-2 space-y-3">
        {props.features.map((item, i) => (
          <p key={i} className="flex items-center gap-2">
            <CheckIcon color={props.invert ? "white" : "#009379"} />
            <span className="font-bold">{item}</span>
          </p>
        ))}
      </div>

      <button
        className={classNames(
          poppins.className,
          "w-full rounded-2xl px-10 py-4 text-lightgreen",
          props.invert ? "bg-white" : "bg-[#E5F4F2]",
          "text-sm font-semibold text-center cursor-pointer"
        )}
        disabled={props.isActive}
      >
        {props.isActive ? "Current Plan" : "Upgrade"}
      </button>
    </div>
  );
}

function BillingChooseView() {
  const ctx = useContext(BillingContext);

  return (
    <div className="space-y-6">
      <button
        onClick={() => ctx.goTo("manage")}
        className="flex items-center gap-2 text-xl font-bold"
      >
        <ArrowLeft />
        <span>Manage Subscription</span>
      </button>
      {/* Desktop/Tablet Grid View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 md:px-0">
        {plans.map((plan, index) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillingChooseView;
