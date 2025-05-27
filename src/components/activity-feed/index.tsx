import React from "react";
import Image from "next/image";

interface ActivityItem {
  id: string;
  userName: string;
  jobTitle: string;
  timeAgo: string;
  profilePicture?: string;
  status: "Applying";
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-[38px] h-[38px] rounded-full bg-[#F3F4F6] border border-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={activity.profilePicture || "/Mask.png"}
                  alt={activity.userName}
                  width={38}
                  height={38}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] text-[#111827] leading-5">
                <span className="font-semibold">{activity.userName}</span>
                {" applied for the job "}
                <span className="font-semibold">{activity.jobTitle}</span>
              </p>
              <span className="text-[12px] text-[#6B7280] mt-0.5">
                {activity.timeAgo}
              </span>
            </div>
          </div>
          <span className="mr-2 px-2 py-1 text-[13px] font-medium text-[#2563EB] bg-[rgba(55,125,255,0.2)] rounded-[6px]">
            {activity.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
