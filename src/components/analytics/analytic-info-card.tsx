import { ReactNode } from "react";

interface AnalyticInfoCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export function AnalyticInfoCard({
  title,
  value,
  icon,
}: AnalyticInfoCardProps) {
  return (
    <div className="border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl justify-center p-4 bg-white h-28 flex flex-col w-full">
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded">{icon}</div>
        <span className="text-sm font-light text-gray-600">{title}</span>
      </div>
      <h1 className="text-2xl font-bold mt-4">{value}</h1>
    </div>
  );
}
