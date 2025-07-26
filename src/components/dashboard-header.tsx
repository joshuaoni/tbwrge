import { PlusCircle, Search, UserCircle, Clock } from "lucide-react";
import Link from "next/link";
import LanguageSelectorDropDown from "./language-selector-dropdown";
import { Input } from "./ui/input";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUserStore } from "@/hooks/use-user-store";
import { useTranslation } from "react-i18next";
import { outfit } from "@/constants/app";
import { useQuery } from "@tanstack/react-query";
import { getUnreadMessagesCount } from "@/actions/messages";

interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const DashboardHeader = ({
  searchTerm,
  setSearchTerm,
}: DashboardHeaderProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userData } = useUserStore();

  // Fetch unread messages count
  const { data: unreadMessages } = useQuery({
    queryKey: ["unreadMessages"],
    queryFn: () => getUnreadMessagesCount(userData?.token || ""),
    enabled: !!userData?.token,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  console.log("unreadMessages: ", unreadMessages);
  // Trial badge logic
  let trialBadge = null;
  if (userData?.user?.on_freetrial && userData?.user?.plan_expires) {
    const today = new Date();
    const expires = new Date(userData.user.plan_expires);
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLeft = Math.max(
      0,
      Math.ceil((expires.getTime() - today.getTime()) / msPerDay)
    );
    let badgeColor = "bg-green-500 text-white";
    if (daysLeft <= 7 && daysLeft > 3)
      badgeColor = "bg-yellow-400 text-gray-900";
    if (daysLeft <= 3) badgeColor = "bg-red-500 text-white animate-pulse";
    trialBadge = (
      <span
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mr-4 ${badgeColor}`}
        title="Free Trial"
      >
        <Clock className="w-4 h-4 mr-1" />
        Trial: {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
      </span>
    );
  }

  return (
    <div
      className={`${outfit.className} w-full border-b h-20 z-20 bg-white flex items-center px-4`}
    >
      <div className="flex w-full items-center justify-between mt-2 pl-12">
        {/* Search */}
        <div className="flex items-center border px-2 bg-[#F0F0F0] rounded-full mr-4">
          <Search color="#898989" />
          <Input
            placeholder={t("common.searchForJobs")}
            className="bg-[#F0F0F0] text-sm border-none placeholder:text-[#898989] w-52 rounded-full outline-none focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          {/* Trial Badge */}
          {trialBadge}
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/talent-pool/chat")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              title={t("common.chat")}
            >
              <Image
                src="/Message-Icon.png"
                alt={t("common.chat")}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              {/* Unread messages badge */}
              {unreadMessages?.count !== undefined &&
                unreadMessages.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold border-2 border-white shadow-sm z-10">
                    {unreadMessages.count > 99 ? "99+" : unreadMessages.count}
                  </span>
                )}
            </button>
            <LanguageSelectorDropDown fullPageTranslation={true} />
            {userData?.user?.role !== "job_seeker" && (
              <Link
                href="/dashboard/create"
                className="bg-primary cursor-pointer hover:bg-primary/90 transition-colors transform duration-300 flex items-center py-3 space-x-2 rounded-lg w-fit px-2 font-medium text-white mt-auto"
              >
                <PlusCircle />
                <p className="text-sm font-bold">
                  {t("jobs.createNewJobPost")}
                </p>
              </Link>
            )}
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 border-l px-4 min-w-0 max-w-xs overflow-hidden">
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
            <div className="flex flex-col min-w-0">
              <p className="font-medium text-sm truncate overflow-ellipsis">
                {userData?.user?.name || t("common.notSet")}
              </p>
              {/* <p className="text-xs text-gray-500 truncate overflow-ellipsis"> */}
              <p className="text-sm text-gray-500 truncate overflow-ellipsis">
                {userData?.user?.role === "root"
                  ? "Admin"
                  : userData?.user?.role === "recruiter"
                  ? "Recruiter"
                  : userData?.user?.role === "job_seeker"
                  ? "Job Seeker"
                  : "Not Set"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
