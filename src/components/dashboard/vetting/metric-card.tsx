import classNames from "classnames";
import { IconBaseProps, IconType } from "react-icons/lib";
import { TbCircles, TbSquareCheck, TbUserCheck } from "react-icons/tb";

import { Skeleton } from "@/components/ui/skeleton";
import { inter } from "@/constants/app";
import { twMerge } from "tailwind-merge";
import { MetricCardProps } from "../../../interfaces/vetting.interface";

const metricStyles: Record<string, Record<string, string | IconType>> = {
  relevance: { className: "bg-[#065844]", icon: TbCircles },
  completeness: {
    className: "bg-[#0BAA12]",
    icon: TbSquareCheck,
  },
  grammar: { className: "bg-[#34A853]", icon: TbUserCheck },
  formatting: {
    className: "bg-[#307F4B]",
    icon: TbSquareCheck,
  },
  fallback: { className: "bg-[#065844]", icon: TbSquareCheck },
};

const MetricIcon = (props: { metric: string } & IconBaseProps) => {
  const Icon =
    (metricStyles[props.metric]?.icon as IconType) ??
    metricStyles.fallback.icon;
  return <Icon {...props} />;
};

const MetricCard = (props: MetricCardProps) => {
  return (
    <div className="flex items-center gap-6">
      <MetricScore {...props} />
      <div className="text-[#747474] space-y-4">
        <h6 className="text-xl font-semibold capitalize">{props.Metric}</h6>
        <p>{props.Recommendation}</p>
      </div>
    </div>
  );
};

export const MetricScore = (
  props: Omit<MetricCardProps, "Recommendation"> & {
    size?: {
      className?: string;
      iconClass?: string;
      iconSize?: number;
      metricClass?: string;
      scoreClass?: string;
    };
  }
) => {
  return (
    <div
      className={twMerge(
        classNames(
          "w-full text-white flex flex-col gap-2 py-4 px-2 items-center justify-center text-center rounded-lg",
          inter.className,
          metricStyles[props.Metric]?.className ??
            metricStyles.fallback.className
        ),
        props.size?.className
      )}
    >
      <span
        className={twMerge(
          "w-fit p-3 rounded-full border border-white",
          props.size?.iconClass
        )}
      >
        <MetricIcon
          metric={props.Metric}
          size={props.size?.iconSize ?? 32}
          color="white"
          className={classNames({
            "rotate-12": props.Metric == "Relevance",
          })}
        />
      </span>
      <h6
        className={twMerge("text-xl capitalize w-40", props.size?.metricClass)}
      >
        {props.Metric}
      </h6>
      <p className={twMerge("font-bold text-4xl", props.size?.scoreClass)}>
        {props.Score}%
      </p>
    </div>
  );
};

export const MetricCardsLoading = () => {
  const metrics = ["Relevance", "Grammar", "Formatting", "Completeness"];

  return (
    <div className="space-y-6 mt-4">
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 animate-pulse"
        >
          <div className="flex items-start gap-4">
            {/* Left side - Metric score card */}
            <div
              className={`w-40 h-40 rounded-lg flex flex-col items-center justify-center ${
                metricStyles[metric.toLowerCase()]?.className ??
                metricStyles.fallback.className
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white/30 mb-2"></div>
              <div className="h-5 w-24 rounded-md bg-white/30 mb-3"></div>
              <div className="h-8 w-16 rounded-md bg-white/30"></div>
            </div>

            {/* Right side - Analysis content */}
            <div className="flex-1 pt-1">
              <div className="h-6 w-32 bg-gray-200 rounded-md mb-5"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                <div className="h-3 w-[90%] bg-gray-200 rounded-full"></div>
                <div className="h-3 w-[85%] bg-gray-200 rounded-full"></div>
                <div className="h-3 w-[80%] bg-gray-200 rounded-full"></div>
                <div className="h-3 w-[75%] bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCard;
