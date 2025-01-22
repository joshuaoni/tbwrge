import CheckIcon from "@/components/icons/check";
import { mullish, poppins } from "@/constants/app";
import classNames from "classnames";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { BillingContext } from "./billing.context";
import { BillingPlanCardProps } from "./billing.interface";

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
      <div className="flex flex-wrap gap-6">
        {[
          {
            name: "Basic",
            pricePerMonth: 19,
            description: "Ideal for growing companies",
            features: ["Basic Access", "Basic", "1 per month"],
            isActive: true,
          },
          {
            name: "Premium",
            pricePerMonth: 29,
            description: "Ideal for growing companies",
            features: [
              "Basic Access",
              "Basic",
              "2 per month",
              "Support access",
            ],
            isActive: false,
          },
          {
            name: "Pro",
            pricePerMonth: 49,
            description: "Ideal for growing companies",
            features: ["Basic Access", "Other Features", "1 per month"],
            isActive: false,
          },
          {
            name: "Enterprise",
            pricePerMonth: 99,
            description: "Ideal for growing companies",
            features: [
              "Other Features Access",
              "Basic Features",
              "24/7 Support",
            ],
            isActive: false,
            invert: true,
          },
        ].map((item, i) => (
          <BillingPlanCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default BillingChooseView;
