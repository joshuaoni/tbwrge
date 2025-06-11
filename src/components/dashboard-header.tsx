import { PlusCircle, Search, UserCircle } from "lucide-react";
import Link from "next/link";
import LanguageSelectorDropDown from "./language-selector-dropdown";
import { Input } from "./ui/input";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUserStore } from "@/hooks/use-user-store";
import { useTranslation } from "react-i18next";
import { outfit } from "@/constants/app";

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
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/talent-pool/chat")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={t("common.chat")}
            >
              <Image
                src="/Message-Icon.png"
                alt={t("common.chat")}
                width={24}
                height={24}
                className="w-6 h-6"
              />
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
