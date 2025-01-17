import classNames from "classnames";
import { IconBaseProps, IconType } from "react-icons/lib";
import { TbCircles, TbSquareCheck, TbUserCheck } from "react-icons/tb";

import { Skeleton } from "@/components/ui/skeleton";
import { inter } from "@/constants/app";
import { twMerge } from "tailwind-merge";
import { MetricCardProps } from "./vetting.interface";

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

function MetricCard(props: MetricCardProps) {
  return (
    <div className="flex items-center gap-6">
      <MetricScore {...props} />
      <div className="text-[#747474] space-y-4">
        <h6 className="text-xl font-semibold capitalize">{props.Metric}</h6>
        <p>{props.Recommendation}</p>
      </div>
    </div>
  );
}

function MetricScore(
  props: Omit<MetricCardProps, "Recommendation"> & {
    size?: {
      className?: string;
      iconClass?: string;
      iconSize?: number;
      metricClass?: string;
      scoreClass?: string;
    };
  }
) {
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
}

function MetricCardsLoading() {
  return ["relevance", "grammar", "formatting", "completeness"].map(
    (item, i) => (
      <div key={i} className="flex items-center gap-6">
        <div
          className={classNames(
            "w-full text-white flex flex-col gap-2 py-4 px-2 items-center justify-center text-center rounded-lg",
            inter.className,
            metricStyles[item]?.className ?? metricStyles.fallback.className
          )}
        >
          <span className="w-fit p-3 rounded-full border border-white">
            <MetricIcon
              metric={item}
              size={32}
              color="white"
              className={classNames({
                "rotate-12": item == "Relevance",
              })}
            />
          </span>
          <h6 className="text-xl capitalize w-40">{item}</h6>
          <p className="font-bold text-4xl">
            <Skeleton className="inline-block bg-white/60 h-7 w-8 rounded-full" />
            %
          </p>
        </div>
        <div className="text-[#747474] space-y-4">
          <h6 className="text-xl font-semibold capitalize">{item}</h6>
          <p className="space-y-1.5">
            {[...new Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-2.5 w-80 rounded-full"
                style={{
                  width: `${20 - i}rem`,
                }}
              />
            ))}
          </p>
        </div>
      </div>
    )
  );
}

export { MetricCard, MetricCardsLoading, MetricScore };
