import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getActivities, ActivityItem } from "@/actions/activities";
import { useUserStore } from "@/hooks/use-user-store";
import { UserCircle } from "lucide-react";

const ActivityFeed = () => {
  const { userData } = useUserStore();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!userData?.token) return;
      setLoading(true);
      try {
        const data = await getActivities(userData.token);
        setActivities(data);
      } catch (error) {
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [userData?.token]);

  // Helper to get time ago (simple version)
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading...</div>;
  }

  if (!activities.length) {
    return (
      <div className="text-center py-8 text-gray-400">No recent activity.</div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-[38px] h-[38px] rounded-full bg-[#F3F4F6] border border-gray-200 flex items-center justify-center overflow-hidden">
                {userData?.user?.profile_picture ? (
                  <Image
                    src={userData?.user?.profile_picture}
                    alt={`${userData?.user?.name}`}
                    width={30}
                    height={30}
                    className="rounded-full md:w-[30px] md:h-[30px] object-cover"
                  />
                ) : (
                  <UserCircle size={32} className="text-gray-600" />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-[#111827] leading-5">
                {activity.text}
              </p>
              <span className="text-sm text-[#6B7280] mt-0.5">
                {getTimeAgo(activity.created_at)}
              </span>
            </div>
          </div>
          <span className="mr-2 px-2 py-1 text-sm font-medium text-[#2563EB] bg-[rgba(55,125,255,0.2)] rounded-[6px] capitalize">
            {activity.type}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
